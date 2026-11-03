import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, authorise } from '../middleware/auth';
import { param } from '../utils/params';

export const deliveriesRouter = Router();

// ── GET /api/deliveries ─────────────────────────────────────
deliveriesRouter.get('/', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const { status, driverId, date, page = '1', limit = '20' } = req.query as Record<string, string>;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (driverId) where.driverId = driverId;
    if (date) {
      const d = new Date(date);
      where.scheduledDate = {
        gte: new Date(d.setHours(0, 0, 0, 0)),
        lte: new Date(d.setHours(23, 59, 59, 999)),
      };
    }

    const [deliveries, total] = await Promise.all([
      prisma.delivery.findMany({
        where, skip, take: parseInt(limit),
        include: {
          order: { include: { customer: true, items: { include: { product: true } } } },
          driver: true,
          address: true,
          proof: true,
        },
        orderBy: { scheduledDate: 'asc' },
      }),
      prisma.delivery.count({ where }),
    ]);

    res.json({ data: deliveries, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) { next(err); }
});

// ── GET /api/deliveries/my (driver) ─────────────────────────
deliveriesRouter.get('/my', authenticate, authorise('DRIVER'), async (req, res, next) => {
  try {
    const staff = await prisma.staff.findUnique({ where: { userId: req.user!.userId } });
    if (!staff) { res.status(404).json({ error: 'Driver not found' }); return; }

    const deliveries = await prisma.delivery.findMany({
      where: { driverId: staff.id, status: { in: ['ASSIGNED', 'OUT_FOR_DELIVERY'] } },
      include: {
        order: { include: { customer: true, items: { include: { product: true } } } },
        address: true,
        proof: true,
      },
      orderBy: { scheduledDate: 'asc' },
    });
    res.json(deliveries);
  } catch (err) { next(err); }
});

const assignSchema = z.object({
  orderId: z.string().uuid(),
  driverId: z.string().uuid().optional(),
  addressId: z.string().uuid().optional(),
  scheduledDate: z.string().datetime().optional(),
  scheduledTimeSlot: z.string().optional(),
  vehicleNumber: z.string().optional(),
  deliveryNotes: z.string().optional(),
});

// ── POST /api/deliveries ────────────────────────────────────
deliveriesRouter.post('/', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const data = assignSchema.parse(req.body);
    const deliveryCode = `DEL-${Date.now().toString(36).toUpperCase()}`;

    const delivery = await prisma.delivery.create({
      data: {
        deliveryCode,
        orderId: data.orderId,
        driverId: data.driverId,
        addressId: data.addressId,
        scheduledDate: data.scheduledDate ? new Date(data.scheduledDate) : undefined,
        scheduledTimeSlot: data.scheduledTimeSlot,
        vehicleNumber: data.vehicleNumber,
        deliveryNotes: data.deliveryNotes,
        status: data.driverId ? 'ASSIGNED' : 'PENDING',
      },
      include: { order: { include: { customer: true } }, driver: true, address: true },
    });

    await prisma.order.update({ where: { id: data.orderId }, data: { status: 'SCHEDULED' } });

    res.status(201).json(delivery);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: 'Validation failed', issues: err.errors }); return; }
    next(err);
  }
});

// ── PATCH /api/deliveries/:id/status ────────────────────────
deliveriesRouter.patch('/:id/status', authenticate, async (req, res, next) => {
  try {
    const id = param(req.params.id);
    const { status, failureReason } = req.body;
    if (!status) { res.status(400).json({ error: 'Status is required' }); return; }

    // Drivers can only update their own deliveries
    if (req.user!.role === 'DRIVER') {
      const staff = await prisma.staff.findUnique({ where: { userId: req.user!.userId } });
      const delivery = await prisma.delivery.findUnique({ where: { id } });
      if (!delivery || delivery.driverId !== staff?.id) {
        res.status(403).json({ error: 'Cannot update this delivery' });
        return;
      }
    }

    const delivery = await prisma.$transaction(async (tx) => {
      const d = await tx.delivery.update({
        where: { id },
        data: {
          status,
          failureReason: failureReason || undefined,
          actualDeliveredAt: status === 'DELIVERED' ? new Date() : undefined,
        },
      });

      // Sync order status
      const orderStatus =
        status === 'DELIVERED' ? 'DELIVERED'
        : status === 'FAILED' ? 'FAILED'
        : status === 'OUT_FOR_DELIVERY' ? 'OUT_FOR_DELIVERY'
        : undefined;

      if (orderStatus) {
        await tx.order.update({ where: { id: d.orderId }, data: { status: orderStatus } });
      }

      return d;
    });

    res.json(delivery);
  } catch (err) { next(err); }
});

// ── POST /api/deliveries/:id/proof ──────────────────────────
deliveriesRouter.post('/:id/proof', authenticate, async (req, res, next) => {
  try {
    const id = param(req.params.id);
    const { photoUrl, signature, receiverName, notes } = req.body;
    const proof = await prisma.deliveryProof.upsert({
      where: { deliveryId: id },
      create: { deliveryId: id, photoUrl, signature, receiverName, notes },
      update: { photoUrl, signature, receiverName, notes },
    });
    res.json(proof);
  } catch (err) { next(err); }
});
