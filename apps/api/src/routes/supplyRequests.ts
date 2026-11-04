import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, authorise } from '../middleware/auth';
import { param } from '../utils/params';

export const supplyRequestsRouter = Router();

const publicRequestLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests. Please try again later.',
});

const createSupplyRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(10).max(20).regex(/^[+\d\s()-]+$/),
  email: z.union([z.string().trim().email().max(254), z.literal('')]).optional(),
  category: z.enum([
    'Domestic LPG',
    'Commercial LPG',
    'Bulk LPG Supply',
    'Hotel Recurring Supply',
    'Institutional Quotation',
  ]),
  message: z.string().trim().min(5).max(3000),
  website: z.string().max(200).optional(),
});

const updateStatusSchema = z.object({ status: z.enum(['NEW', 'CONTACTED', 'CLOSED']) });

// Public website form submission. A filled honeypot is silently discarded.
supplyRequestsRouter.post('/', publicRequestLimiter, async (req, res, next) => {
  try {
    const data = createSupplyRequestSchema.parse(req.body);
    if (data.website) {
      res.status(201).json({ received: true });
      return;
    }

    const request = await prisma.supplyRequest.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        requirementType: data.category,
        message: data.message,
      },
      select: { id: true, createdAt: true },
    });

    res.status(201).json({ received: true, id: request.id, createdAt: request.createdAt });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Please check the form details and try again.' });
      return;
    }
    next(err);
  }
});

// Staff-only request inbox.
supplyRequestsRouter.get('/', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;
    const where = status && ['NEW', 'CONTACTED', 'CLOSED'].includes(status) ? { status } : {};
    const requests = await prisma.supplyRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    res.json(requests);
  } catch (err) { next(err); }
});

supplyRequestsRouter.patch('/:id/status', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (req, res, next) => {
  try {
    const data = updateStatusSchema.parse(req.body);
    const request = await prisma.supplyRequest.update({
      where: { id: param(req.params.id) },
      data: { status: data.status },
    });
    res.json(request);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid request status.' });
      return;
    }
    next(err);
  }
});
