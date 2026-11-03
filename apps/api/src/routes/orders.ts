import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, authorise } from '../middleware/auth';
import { param } from '../utils/params';

export const ordersRouter = Router();

const createOrderSchema = z.object({
  customerId: z.string().uuid(),
  orderType: z.enum(['DOMESTIC', 'COMMERCIAL', 'BULK', 'INSTITUTIONAL']).default('DOMESTIC'),
  notes: z.string().optional(),
  deliveryNotes: z.string().optional(),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().positive(),
    unitPrice: z.number().nonnegative(),
    taxRate: z.number().nonnegative().default(0),
  })).min(1),
});

// ── GET /api/orders ─────────────────────────────────────────
ordersRouter.get('/', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const { status, customerId, page = '1', limit = '20' } = req.query as Record<string, string>;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where: Record<string, unknown> = { deletedAt: null };
    if (status) where.status = status;
    if (customerId) where.customerId = customerId;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where, skip, take: parseInt(limit),
        include: { customer: { select: { name: true, customerCode: true } }, items: { include: { product: true } }, delivery: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    res.json({ data: orders, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) { next(err); }
});

// ── GET /api/orders/my ──────────────────────────────────────
ordersRouter.get('/my', authenticate, authorise('CUSTOMER'), async (req, res, next) => {
  try {
    const customer = await prisma.customer.findUnique({ where: { userId: req.user!.userId } });
    if (!customer) { res.status(404).json({ error: 'Customer not found' }); return; }

    const orders = await prisma.order.findMany({
      where: { customerId: customer.id, deletedAt: null },
      include: { items: { include: { product: true } }, delivery: true, invoice: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (err) { next(err); }
});

// ── GET /api/orders/:id ─────────────────────────────────────
ordersRouter.get('/:id', authenticate, async (req, res, next) => {
  try {
    const id = param(req.params.id);
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: { include: { addresses: true } },
        items: { include: { product: true } },
        delivery: { include: { driver: true, proof: true } },
        invoice: true,
        payments: true,
      },
    });
    if (!order) { res.status(404).json({ error: 'Order not found' }); return; }
    res.json(order);
  } catch (err) { next(err); }
});

// ── POST /api/orders ────────────────────────────────────────
ordersRouter.post('/', authenticate, async (req, res, next) => {
  try {
    const data = createOrderSchema.parse(req.body);

    // Customers can only create orders for themselves
    if (req.user!.role === 'CUSTOMER') {
      const customer = await prisma.customer.findUnique({ where: { userId: req.user!.userId } });
      if (!customer || customer.id !== data.customerId) {
        res.status(403).json({ error: 'Cannot create orders for other customers' });
        return;
      }
    }

    const order = await prisma.$transaction(async (tx) => {
      const orderCode = `ORD-${Date.now().toString(36).toUpperCase()}`;

      let totalAmount = 0;
      let taxAmount = 0;
      const itemsData = data.items.map((item) => {
        const lineTotal = item.quantity * item.unitPrice * (1 + item.taxRate / 100);
        totalAmount += item.quantity * item.unitPrice;
        taxAmount += item.quantity * item.unitPrice * (item.taxRate / 100);
        return {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxRate: item.taxRate,
          lineTotal,
        };
      });

      return tx.order.create({
        data: {
          orderCode,
          customerId: data.customerId,
          orderType: data.orderType,
          notes: data.notes,
          deliveryNotes: data.deliveryNotes,
          totalAmount,
          taxAmount,
          netAmount: totalAmount + taxAmount,
          items: { create: itemsData },
        },
        include: { items: { include: { product: true } } },
      });
    });

    res.status(201).json(order);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: 'Validation failed', issues: err.errors }); return; }
    next(err);
  }
});

// ── PATCH /api/orders/:id/status ────────────────────────────
ordersRouter.patch('/:id/status', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const id = param(req.params.id);
    const { status, notes } = req.body;
    if (!status) { res.status(400).json({ error: 'Status is required' }); return; }

    const order = await prisma.order.update({
      where: { id },
      data: { status, notes: notes || undefined },
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user!.userId,
        action: 'ORDER_STATUS_CHANGED',
        entityType: 'Order',
        entityId: order.id,
        newData: { status },
      },
    });

    res.json(order);
  } catch (err) { next(err); }
});
