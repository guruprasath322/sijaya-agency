import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, authorise } from '../middleware/auth';
import { param } from '../utils/params';

export const customersRouter = Router();

// ── GET /api/customers (manager) ───────────────────────────
customersRouter.get('/', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const { type, search, page = '1', limit = '20' } = req.query as Record<string, string>;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where: Record<string, unknown> = { deletedAt: null };
    if (type) where.customerType = type;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { businessName: { contains: search, mode: 'insensitive' } },
        { customerCode: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ];
    }

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: { addresses: { where: { isDefault: true } }, creditAccount: true },
        orderBy: { registeredAt: 'desc' },
      }),
      prisma.customer.count({ where }),
    ]);

    res.json({ data: customers, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) { next(err); }
});

// ── GET /api/customers/me (customer portal) ─────────────────
customersRouter.get('/me', authenticate, authorise('CUSTOMER'), async (req, res, next) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user!.userId },
      include: {
        addresses: true,
        creditAccount: true,
        subscriptions: { where: { status: 'ACTIVE' } },
      },
    });
    if (!customer) { res.status(404).json({ error: 'Customer profile not found' }); return; }
    res.json(customer);
  } catch (err) { next(err); }
});

// ── GET /api/customers/:id ──────────────────────────────────
customersRouter.get('/:id', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const id = param(req.params.id);
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        addresses: true,
        creditAccount: true,
        orders: { take: 10, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!customer) { res.status(404).json({ error: 'Customer not found' }); return; }
    res.json(customer);
  } catch (err) { next(err); }
});

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  businessName: z.string().optional(),
  phone: z.string().optional(),
  customerType: z.enum(['DOMESTIC', 'COMMERCIAL', 'BULK', 'INSTITUTIONAL']).optional(),
  notes: z.string().optional(),
});

// ── PATCH /api/customers/:id ────────────────────────────────
customersRouter.patch('/:id', authenticate, async (req, res, next) => {
  try {
    const data = updateSchema.parse(req.body);
    const id = param(req.params.id);
    const customer = await prisma.customer.update({ where: { id }, data });
    res.json(customer);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: 'Validation failed', issues: err.errors }); return; }
    next(err);
  }
});
