import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorise } from '../middleware/auth';

export const paymentsRouter = Router();

// ── GET /api/payments ───────────────────────────────────────
paymentsRouter.get('/', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const { customerId, status, page = '1', limit = '20' } = req.query as Record<string, string>;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where: Record<string, unknown> = {};
    if (customerId) where.customerId = customerId;
    if (status) where.status = status;

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where, skip, take: parseInt(limit),
        include: { customer: { select: { name: true, customerCode: true } }, order: true, invoice: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.payment.count({ where }),
    ]);

    res.json({ data: payments, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) { next(err); }
});

// ── POST /api/payments ──────────────────────────────────────
paymentsRouter.post('/', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const { customerId, orderId, invoiceId, amount, method, reference, paidAt, notes } = req.body;
    if (!customerId || !amount) {
      res.status(400).json({ error: 'customerId and amount are required' });
      return;
    }

    const paymentCode = `PAY-${Date.now().toString(36).toUpperCase()}`;

    const payment = await prisma.payment.create({
      data: {
        paymentCode,
        customerId,
        orderId: orderId || undefined,
        invoiceId: invoiceId || undefined,
        amount,
        method: method || 'CASH',
        status: 'PAID',
        reference: reference || undefined,
        paidAt: paidAt ? new Date(paidAt) : new Date(),
        notes: notes || undefined,
        recordedById: req.user!.userId,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user!.userId,
        action: 'PAYMENT_RECORDED',
        entityType: 'Payment',
        entityId: payment.id,
        newData: { amount, method, customerId },
      },
    });

    res.status(201).json(payment);
  } catch (err) { next(err); }
});

