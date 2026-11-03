import { Router } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate } from '../middleware/auth';

export const authRouter = Router();

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  password: z.string().min(8),
  businessName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function signToken(payload: { userId: string; role: string; email: string }) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'],
  });
}

function setAuthCookie(res: import('express').Response, token: string) {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

// ── POST /api/auth/register ─────────────────────────────────
authRouter.post('/register', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      res.status(409).json({ error: 'An account with this email already exists' });
      return;
    }

    const passwordHash = await argon2.hash(data.password);

    const user = await prisma.$transaction(async (tx) => {
      const u = await tx.user.create({
        data: {
          email: data.email,
          phone: data.phone,
          passwordHash,
          role: 'CUSTOMER',
        },
      });

      const customerCode = `CUST-${Date.now().toString(36).toUpperCase()}`;
      await tx.customer.create({
        data: {
          userId: u.id,
          customerCode,
          name: data.name,
          phone: data.phone,
          email: data.email,
          businessName: data.businessName,
          customerType: data.businessName ? 'COMMERCIAL' : 'DOMESTIC',
        },
      });

      return u;
    });

    const token = signToken({ userId: user.id, role: user.role, email: user.email });
    setAuthCookie(res, token);

    res.status(201).json({ message: 'Account created successfully', role: user.role });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation failed', issues: err.errors });
      return;
    }
    next(err);
  }
});

// ── POST /api/auth/login ────────────────────────────────────
authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = signToken({ userId: user.id, role: user.role, email: user.email });
    setAuthCookie(res, token);

    res.json({ message: 'Logged in successfully', role: user.role, userId: user.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation failed', issues: err.errors });
      return;
    }
    next(err);
  }
});

// ── POST /api/auth/logout ───────────────────────────────────
authRouter.post('/logout', (_req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// ── GET /api/auth/me ────────────────────────────────────────
authRouter.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        customer: {
          select: {
            id: true,
            name: true,
            businessName: true,
            customerCode: true,
            customerType: true,
          },
        },
        staff: {
          select: {
            id: true,
            name: true,
            employeeCode: true,
            role: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

