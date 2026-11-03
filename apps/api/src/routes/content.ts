import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorise } from '../middleware/auth';
import { param } from '../utils/params';

export const contentRouter = Router();

// ── GET /api/content/:key (public) ─────────────────────────
contentRouter.get('/:key', async (req, res, next) => {
  try {
    const key = param(req.params.key);
    const content = await prisma.websiteContent.findUnique({ where: { key } });
    if (!content) { res.status(404).json({ error: 'Content not found' }); return; }
    res.json(content);
  } catch (err) { next(err); }
});

// ── GET /api/content (public — all active) ─────────────────
contentRouter.get('/', async (_req, res, next) => {
  try {
    const content = await prisma.websiteContent.findMany({ where: { isActive: true } });
    res.json(content);
  } catch (err) { next(err); }
});

// ── PUT /api/content/:key (manager) ────────────────────────
contentRouter.put('/:key', authenticate, authorise('ADMIN', 'MANAGER'), async (req, res, next) => {
  try {
    const key = param(req.params.key);
    const content = await prisma.websiteContent.upsert({
      where: { key },
      update: { ...req.body, updatedById: req.user!.userId },
      create: { key, ...req.body, updatedById: req.user!.userId },
    });
    res.json(content);
  } catch (err) { next(err); }
});
