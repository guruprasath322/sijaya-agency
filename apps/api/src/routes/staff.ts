import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorise } from '../middleware/auth';

export const staffRouter = Router();

// ── GET /api/staff ──────────────────────────────────────────
staffRouter.get('/', authenticate, authorise('ADMIN', 'MANAGER'), async (_req, res, next) => {
  try {
    const staff = await prisma.staff.findMany({
      where: { isActive: true },
      include: { user: { select: { email: true, isActive: true } } },
      orderBy: { name: 'asc' },
    });
    res.json(staff);
  } catch (err) { next(err); }
});

// ── GET /api/staff/drivers ──────────────────────────────────
staffRouter.get('/drivers', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (_req, res, next) => {
  try {
    const drivers = await prisma.staff.findMany({
      where: { role: 'DRIVER', isActive: true },
      select: { id: true, name: true, phone: true, employeeCode: true },
    });
    res.json(drivers);
  } catch (err) { next(err); }
});

