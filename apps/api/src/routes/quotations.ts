import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, authorise } from '../middleware/auth';
import { param } from '../utils/params';

export const quotationsRouter = Router();

const createQuotationSchema = z.object({
  customerId: z.string().uuid(),
  validUntil: z.string().datetime().optional(),
  notes: z.string().optional(),
  termsConditions: z.string().optional(),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().positive(),
    unitPrice: z.number().nonnegative(),
    taxRate: z.number().nonnegative().default(0),
    additionalCharges: z.number().nonnegative().default(0),
    notes: z.string().optional(),
  })).min(1),
});

// ── GET /api/quotations ─────────────────────────────────────
quotationsRouter.get('/', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const { status, page = '1', limit = '20' } = req.query as Record<string, string>;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const [quotations, total] = await Promise.all([
      prisma.quotation.findMany({
        where, skip, take: parseInt(limit),
        include: { customer: { select: { name: true, customerCode: true } }, items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.quotation.count({ where }),
    ]);

    res.json({ data: quotations, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) { next(err); }
});

// ── GET /api/quotations/my (customer) ──────────────────────
quotationsRouter.get('/my', authenticate, authorise('CUSTOMER'), async (req, res, next) => {
  try {
    const customer = await prisma.customer.findUnique({ where: { userId: req.user!.userId } });
    if (!customer) { res.status(404).json({ error: 'Customer not found' }); return; }
    const quotations = await prisma.quotation.findMany({
      where: { customerId: customer.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(quotations);
  } catch (err) { next(err); }
});

// ── POST /api/quotations ────────────────────────────────────
quotationsRouter.post('/', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const data = createQuotationSchema.parse(req.body);
    const quotationCode = `QUO-${Date.now().toString(36).toUpperCase()}`;

    let totalAmount = 0;
    let taxAmount = 0;
    const itemsData = data.items.map((item) => {
      const subtotal = item.quantity * item.unitPrice + item.additionalCharges;
      const tax = subtotal * (item.taxRate / 100);
      totalAmount += subtotal;
      taxAmount += tax;
      return { ...item, lineTotal: subtotal + tax };
    });

    const quotation = await prisma.quotation.create({
      data: {
        quotationCode,
        customerId: data.customerId,
        validUntil: data.validUntil ? new Date(data.validUntil) : undefined,
        notes: data.notes,
        termsConditions: data.termsConditions,
        totalAmount,
        taxAmount,
        netAmount: totalAmount + taxAmount,
        createdById: req.user!.userId,
        items: { create: itemsData },
      },
      include: { items: { include: { product: true } }, customer: true },
    });

    res.status(201).json(quotation);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: 'Validation failed', issues: err.errors }); return; }
    next(err);
  }
});

// ── PATCH /api/quotations/:id/accept ────────────────────────
quotationsRouter.patch('/:id/accept', authenticate, async (req, res, next) => {
  try {
    const id = param(req.params.id);
    const quotation = await prisma.quotation.update({
      where: { id },
      data: { status: 'ACCEPTED', acceptedAt: new Date() },
    });
    res.json(quotation);
  } catch (err) { next(err); }
});

// ── PATCH /api/quotations/:id/reject ────────────────────────
quotationsRouter.patch('/:id/reject', authenticate, async (req, res, next) => {
  try {
    const id = param(req.params.id);
    const quotation = await prisma.quotation.update({
      where: { id },
      data: { status: 'REJECTED', rejectedAt: new Date() },
    });
    res.json(quotation);
  } catch (err) { next(err); }
});
