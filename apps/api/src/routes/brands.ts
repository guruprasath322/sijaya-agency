import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, authorise } from '../middleware/auth';
import { param } from '../utils/params';

export const brandsRouter = Router();

// ── GET /api/brands (public) ────────────────────────────────
brandsRouter.get('/', async (_req, res, next) => {
  try {
    const brands = await prisma.brand.findMany({
      where: { isApproved: true, isVisible: true },
      orderBy: { displayOrder: 'asc' },
    });
    res.json(brands);
  } catch (err) {
    next(err);
  }
});

// ── GET /api/brands/all (manager) ──────────────────────────
brandsRouter.get('/all', authenticate, authorise('ADMIN', 'MANAGER'), async (_req, res, next) => {
  try {
    const brands = await prisma.brand.findMany({ orderBy: { displayOrder: 'asc' } });
    res.json(brands);
  } catch (err) {
    next(err);
  }
});

const brandSchema = z.object({
  nameEnglish: z.string().min(1).max(200),
  nameTamil: z.string().optional(),
  logoUrl: z.string().url().optional().or(z.literal('')),
  category: z.string().optional(),
  displayOrder: z.number().int().optional(),
  isApproved: z.boolean().optional(),
  isVisible: z.boolean().optional(),
  notes: z.string().optional(),
});

// ── POST /api/brands ────────────────────────────────────────
brandsRouter.post('/', authenticate, authorise('ADMIN', 'MANAGER'), async (req, res, next) => {
  try {
    const data = brandSchema.parse(req.body);
    const brand = await prisma.brand.create({ data });
    res.status(201).json(brand);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: 'Validation failed', issues: err.errors }); return; }
    next(err);
  }
});

// ── PATCH /api/brands/:id ───────────────────────────────────
brandsRouter.patch('/:id', authenticate, authorise('ADMIN', 'MANAGER'), async (req, res, next) => {
  try {
    const data = brandSchema.partial().parse(req.body);
    const id = param(req.params.id);
    const brand = await prisma.brand.update({ where: { id }, data });
    res.json(brand);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: 'Validation failed', issues: err.errors }); return; }
    next(err);
  }
});

// ── DELETE /api/brands/:id ──────────────────────────────────
brandsRouter.delete('/:id', authenticate, authorise('ADMIN', 'MANAGER'), async (req, res, next) => {
  try {
    const id = param(req.params.id);
    await prisma.brand.delete({ where: { id } });
    res.json({ message: 'Brand deleted' });
  } catch (err) {
    next(err);
  }
});
