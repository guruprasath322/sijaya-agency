import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorise } from '../middleware/auth';

export const inventoryRouter = Router();

// ── GET /api/inventory ──────────────────────────────────────
inventoryRouter.get('/', authenticate, authorise('ADMIN', 'MANAGER', 'STAFF'), async (_req, res, next) => {
  try {
    const inventory = await prisma.inventory.findMany({
      include: { product: true },
    });
    res.json(inventory);
  } catch (err) { next(err); }
});

// ── GET /api/inventory/movements ────────────────────────────
inventoryRouter.get('/movements', authenticate, authorise('ADMIN', 'MANAGER'), async (req, res, next) => {
  try {
    const { productId, page = '1', limit = '50' } = req.query as Record<string, string>;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where: Record<string, unknown> = {};
    if (productId) where.productId = productId;

    const movements = await prisma.stockMovement.findMany({
      where, skip, take: parseInt(limit),
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(movements);
  } catch (err) { next(err); }
});

// ── POST /api/inventory/adjust (manager only — manual adjustment) ──
inventoryRouter.post('/adjust', authenticate, authorise('ADMIN', 'MANAGER'), async (req, res, next) => {
  try {
    const { productId, quantity, adjustmentType, notes } = req.body;
    if (!productId || !quantity || !adjustmentType) {
      res.status(400).json({ error: 'productId, quantity, and adjustmentType are required' });
      return;
    }

    const movementType = adjustmentType === 'IN' ? 'ADJUSTMENT_IN' : 'ADJUSTMENT_OUT';

    await prisma.$transaction(async (tx) => {
      const inventory = await tx.inventory.findUnique({ where: { productId } });
      if (!inventory) { throw new Error('Product inventory not found'); }

      const newBalance =
        adjustmentType === 'IN'
          ? Number(inventory.availableQty) + Math.abs(quantity)
          : Number(inventory.availableQty) - Math.abs(quantity);

      if (newBalance < 0) throw new Error('Adjustment would result in negative stock');

      await tx.inventory.update({
        where: { productId },
        data: { availableQty: newBalance },
      });

      await tx.stockMovement.create({
        data: {
          productId,
          movementType,
          quantity: Math.abs(quantity),
          balanceAfter: newBalance,
          referenceType: 'ADJUSTMENT',
          performedById: req.user!.userId,
          notes,
        },
      });

      await tx.auditLog.create({
        data: {
          userId: req.user!.userId,
          action: 'INVENTORY_ADJUSTED',
          entityType: 'Inventory',
          entityId: productId,
          newData: { adjustmentType, quantity, newBalance, notes },
        },
      });
    });

    res.json({ message: 'Inventory adjusted successfully' });
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('negative stock')) {
      res.status(400).json({ error: err.message });
      return;
    }
    next(err);
  }
});

