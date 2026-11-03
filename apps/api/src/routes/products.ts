import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, authorise } from '../middleware/auth';
import { param } from '../utils/params';
import { Prisma } from '@prisma/client';

export const productsRouter = Router();

// ── GET /api/products (public) ──────────────────────────────
productsRouter.get('/', async (_req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: { inventoryRecords: true },
      orderBy: { displayOrder: 'asc' },
    });
    res.json(products);
  } catch (err) { next(err); }
});

const productSchema = z.object({
  name: z.string().min(1),
  nameTamil: z.string().optional(),
  description: z.string().optional(),
  unit: z.enum(['CYLINDER_14KG', 'CYLINDER_19KG', 'CYLINDER_5KG', 'KG', 'LITRE']),
  displayOrder: z.number().int().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  specifications: z.record(z.unknown()).optional(),
});

// ── POST /api/products (manager) ────────────────────────────
productsRouter.post('/', authenticate, authorise('ADMIN', 'MANAGER'), async (req, res, next) => {
  try {
    const data = productSchema.parse(req.body);
    const product = await prisma.$transaction(async (tx) => {
      const p = await tx.product.create({
        data: {
          ...data,
          specifications: data.specifications as Prisma.InputJsonValue,
        },
      });
      // Initialise inventory record
      await tx.inventory.create({ data: { productId: p.id } });
      return p;
    });
    res.status(201).json(product);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: 'Validation failed', issues: err.errors }); return; }
    next(err);
  }
});

// ── PATCH /api/products/:id ──────────────────────────────────
productsRouter.patch('/:id', authenticate, authorise('ADMIN', 'MANAGER'), async (req, res, next) => {
  try {
    const data = productSchema.partial().parse(req.body);
    const id = param(req.params.id);
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        specifications: data.specifications ? (data.specifications as Prisma.InputJsonValue) : undefined,
      },
    });
    res.json(product);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: 'Validation failed', issues: err.errors }); return; }
    next(err);
  }
});
