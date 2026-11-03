import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, authorise } from '../middleware/auth';
import { param } from '../utils/params';

export const loadsRouter = Router();

const createLoadSchema = z.object({
  supplierId: z.string().uuid(),
  dispatchDate: z.string().datetime().optional(),
  expectedArrival: z.string().datetime().optional(),
  vehicleNumber: z.string().optional(),
  invoiceReference: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(z.object({
    productId: z.string().uuid(),
    expectedQty: z.number().positive(),
  })).min(1),
});

// ── GET /api/loads ──────────────────────────────────────────
loadsRouter.get('/', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const { status, page = '1', limit = '20' } = req.query as Record<string, string>;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const [loads, total] = await Promise.all([
      prisma.gasLoad.findMany({
        where, skip, take: parseInt(limit),
        include: { supplier: true, items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.gasLoad.count({ where }),
    ]);

    res.json({ data: loads, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) { next(err); }
});

// ── POST /api/loads ─────────────────────────────────────────
loadsRouter.post('/', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const data = createLoadSchema.parse(req.body);
    const loadCode = `LOAD-${Date.now().toString(36).toUpperCase()}`;

    const load = await prisma.gasLoad.create({
      data: {
        loadCode,
        supplierId: data.supplierId,
        dispatchDate: data.dispatchDate ? new Date(data.dispatchDate) : undefined,
        expectedArrival: data.expectedArrival ? new Date(data.expectedArrival) : undefined,
        vehicleNumber: data.vehicleNumber,
        invoiceReference: data.invoiceReference,
        notes: data.notes,
        items: { create: data.items.map(i => ({ productId: i.productId, expectedQty: i.expectedQty })) },
      },
      include: { supplier: true, items: { include: { product: true } } },
    });

    res.status(201).json(load);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: 'Validation failed', issues: err.errors }); return; }
    next(err);
  }
});

// ── PATCH /api/loads/:id/arrive ─────────────────────────────
loadsRouter.patch('/:id/arrive', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const id = param(req.params.id);
    const { actualArrival, items } = req.body;
    await prisma.gasLoad.update({
      where: { id },
      data: { status: 'ARRIVED', actualArrival: actualArrival ? new Date(actualArrival) : new Date() },
    });

    if (items && Array.isArray(items)) {
      for (const item of items) {
        await prisma.gasLoadItem.update({
          where: { id: item.id },
          data: {
            receivedQty: item.receivedQty,
            damagedQty: item.damagedQty || 0,
            missingQty: item.missingQty || 0,
            excessQty: item.excessQty || 0,
            notes: item.notes,
          },
        });
      }
    }

    const load = await prisma.gasLoad.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    });
    res.json(load);
  } catch (err) { next(err); }
});

// ── POST /api/loads/:id/approve ─────────────────────────────
// Only approved quantities update inventory
loadsRouter.post('/:id/approve', authenticate, authorise('ADMIN', 'MANAGER'), async (req, res, next) => {
  try {
    const id = param(req.params.id);
    const load = await prisma.gasLoad.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!load) { res.status(404).json({ error: 'Load not found' }); return; }
    if (load.status !== 'ARRIVED' && load.status !== 'UNDER_INSPECTION') {
      res.status(400).json({ error: 'Load must be in ARRIVED or UNDER_INSPECTION status to approve' });
      return;
    }

    await prisma.$transaction(async (tx) => {
      for (const item of load.items) {
        const approvedQty = Number(item.receivedQty) - Number(item.damagedQty);

        // Update inventory
        const inventory = await tx.inventory.findUnique({ where: { productId: item.productId } });
        if (inventory) {
          await tx.inventory.update({
            where: { productId: item.productId },
            data: {
              availableQty: { increment: approvedQty },
              damagedQty: { increment: Number(item.damagedQty) },
            },
          });
        } else {
          await tx.inventory.create({
            data: { productId: item.productId, availableQty: approvedQty, damagedQty: Number(item.damagedQty) },
          });
        }

        // Stock movement record
        const updated = await tx.inventory.findUnique({ where: { productId: item.productId } });
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            movementType: 'LOAD_IN',
            quantity: approvedQty,
            balanceAfter: Number(updated!.availableQty),
            referenceType: 'LOAD',
            referenceId: load.id,
            gasLoadId: load.id,
            performedById: req.user!.userId,
            notes: `Approved load ${load.loadCode}`,
          },
        });
      }

      await tx.gasLoad.update({
        where: { id: load.id },
        data: { status: 'APPROVED', approvedById: req.user!.userId, approvedAt: new Date() },
      });

      await tx.auditLog.create({
        data: {
          userId: req.user!.userId,
          action: 'LOAD_APPROVED',
          entityType: 'GasLoad',
          entityId: load.id,
        },
      });
    });

    res.json({ message: 'Load approved and inventory updated' });
  } catch (err) { next(err); }
});

// ── POST /api/loads/:id/reject ──────────────────────────────
loadsRouter.post('/:id/reject', authenticate, authorise('ADMIN', 'MANAGER'), async (req, res, next) => {
  try {
    const id = param(req.params.id);
    const { reason } = req.body;
    await prisma.gasLoad.update({
      where: { id },
      data: { status: 'REJECTED', rejectionReason: reason, approvedById: req.user!.userId, approvedAt: new Date() },
    });
    res.json({ message: 'Load rejected' });
  } catch (err) { next(err); }
});
