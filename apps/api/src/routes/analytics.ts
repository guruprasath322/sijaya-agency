import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorise } from '../middleware/auth';

export const analyticsRouter = Router();

// ── GET /api/analytics/dashboard ────────────────────────────
analyticsRouter.get('/dashboard', authenticate, authorise('ADMIN', 'MANAGER'), async (_req, res, next) => {
  try {
    const [
      totalOrders,
      pendingOrders,
      deliveredOrders,
      totalCustomers,
      inventory,
      recentOrders,
      monthlyRevenue,
    ] = await Promise.all([
      prisma.order.count({ where: { deletedAt: null } }),
      prisma.order.count({ where: { status: 'PENDING', deletedAt: null } }),
      prisma.order.count({ where: { status: 'DELIVERED', deletedAt: null } }),
      prisma.customer.count({ where: { deletedAt: null } }),
      prisma.inventory.findMany({ include: { product: true } }),
      prisma.order.findMany({
        where: { deletedAt: null },
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { customer: { select: { name: true } }, items: { include: { product: true } } },
      }),
      // Monthly revenue for last 6 months
      prisma.$queryRaw<Array<{ month: string; revenue: number }>>`
        SELECT 
          TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon YYYY') as month,
          SUM("netAmount")::float as revenue
        FROM "Order"
        WHERE "status" = 'DELIVERED'
          AND "deletedAt" IS NULL
          AND "createdAt" >= NOW() - INTERVAL '6 months'
        GROUP BY DATE_TRUNC('month', "createdAt")
        ORDER BY DATE_TRUNC('month', "createdAt") ASC
      `,
    ]);

    res.json({
      summary: {
        totalOrders,
        pendingOrders,
        deliveredOrders,
        totalCustomers,
      },
      inventory,
      recentOrders,
      monthlyRevenue,
    });
  } catch (err) { next(err); }
});

// ── GET /api/analytics/orders-by-type ───────────────────────
analyticsRouter.get('/orders-by-type', authenticate, authorise('ADMIN', 'MANAGER'), async (_req, res, next) => {
  try {
    const data = await prisma.order.groupBy({
      by: ['orderType'],
      where: { deletedAt: null },
      _count: { id: true },
    });
    res.json(data);
  } catch (err) { next(err); }
});

