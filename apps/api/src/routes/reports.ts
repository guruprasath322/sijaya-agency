import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorise } from '../middleware/auth';

export const reportsRouter = Router();

// ── GET /api/reports/daily-orders ───────────────────────────
reportsRouter.get('/daily-orders', authenticate, authorise('ADMIN', 'MANAGER'), async (req, res, next) => {
  try {
    const { date } = req.query as { date?: string };
    const targetDate = date ? new Date(date) : new Date();
    const start = new Date(targetDate.setHours(0, 0, 0, 0));
    const end = new Date(targetDate.setHours(23, 59, 59, 999));

    const orders = await prisma.order.findMany({
      where: { createdAt: { gte: start, lte: end }, deletedAt: null },
      include: {
        customer: { select: { name: true, customerCode: true, customerType: true } },
        items: { include: { product: true } },
        delivery: { select: { status: true, scheduledDate: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ date: start, orders, total: orders.length });
  } catch (err) { next(err); }
});

// ── GET /api/reports/outstanding-payments ───────────────────
reportsRouter.get('/outstanding-payments', authenticate, authorise('ADMIN', 'MANAGER'), async (_req, res, next) => {
  try {
    const customers = await prisma.customer.findMany({
      where: { creditAccount: { outstandingBalance: { gt: 0 } }, deletedAt: null },
      include: { creditAccount: true },
      orderBy: { creditAccount: { outstandingBalance: 'desc' } },
    });
    res.json(customers);
  } catch (err) { next(err); }
});

