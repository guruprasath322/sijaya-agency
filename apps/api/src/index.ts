import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { authRouter } from './routes/auth';
import { customersRouter } from './routes/customers';
import { productsRouter } from './routes/products';
import { ordersRouter } from './routes/orders';
import { inventoryRouter } from './routes/inventory';
import { loadsRouter } from './routes/loads';
import { deliveriesRouter } from './routes/deliveries';
import { brandsRouter } from './routes/brands';
import { contentRouter } from './routes/content';
import { quotationsRouter } from './routes/quotations';
import { paymentsRouter } from './routes/payments';
import { staffRouter } from './routes/staff';
import { analyticsRouter } from './routes/analytics';
import { reportsRouter } from './routes/reports';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.API_PORT || 4000;

// ── Security middleware ─────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Rate limiting ───────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many authentication attempts. Please try again later.',
});

// ── Body parsers ────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// ── Static uploads ──────────────────────────────────────────
app.use('/uploads', express.static('uploads'));

// ── Health check ────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'SIJAYA Agency API' });
});

// ── API Routes ──────────────────────────────────────────────
app.use('/api/auth', authLimiter, authRouter);
app.use('/api/customers', customersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/loads', loadsRouter);
app.use('/api/deliveries', deliveriesRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/content', contentRouter);
app.use('/api/quotations', quotationsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/staff', staffRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/reports', reportsRouter);

// ── Error handler ───────────────────────────────────────────
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n🚀 SIJAYA Agency API running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health\n`);
});

export default app;

