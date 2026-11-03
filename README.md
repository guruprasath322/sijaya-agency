<<<<<<< HEAD
# SIJAYA GasFlow
## Premium LPG Agency Website & Smart Business Management Platform

A production-quality web platform and operational management system designed for **SIJAYA Agencies**, an authorized LPG distribution agency in official collaboration with supplier **Agispure Gas**.

---

## 🚀 Key Highlights & Architectural Modules

1. **Brand Identity & Public Website**
   - Distinctive corporate branding (#102A43 Navy, #176B9B Corporate Blue, #F59E0B Accent)
   - Sticky responsive navigation with active section tracking
   - Editorial Hero Section with realistic SVG LPG cylinder rendering and trust metrics
   - Continuous horizontal sliding brand showcase ("Businesses That Trust SIJAYA") with bilingual English/Tamil typography, pause-on-hover, and database approval filter
   - Comprehensive services sections for Domestic (14.2 kg, 5 kg), Commercial (19 kg), and Bulk LPG supply
   - Commercial continuity showcase for Hotels, Messes, Bakeries, Poultry, Hostels, and Industrial Mills
   - 4-step structured fulfillment workflow (Request → Confirm → Schedule → Deliver)
   - Configurable product catalogue with regulated pricing notices
   - Safety information, leak awareness guidelines, and emergency hotline callout
   - Frequently Asked Questions accordion (CMS-editable)
   - Working contact form, depot office details, and interactive map card
   - Floating WhatsApp support action and Back-to-Top button

2. **Customer Portal (`/customer`)**
   - Role-based dashboard with order statistics and account metrics
   - Domestic cylinder booking form (product selection, quantity limit rules, address selector)
   - Commercial and bulk order / quotation request desk
   - Order history with status badges and live dispatch tracking
   - Recurring supply subscriptions (weekly, bi-weekly, monthly) with operational confirmation checks
   - Formal price quotation tracker with 1-click Accept / Reject actions
   - Downloadable tax invoices and payment settlement history
   - Historical delivered cylinder trends with interactive Recharts data visualization
   - Customer profile and multiple saved delivery address management

3. **Manager & Admin Dashboard (`/dashboard`)**
   - SaaS dashboard layout with dark navy sidebar, search, and audit telemetry
   - Real-time KPI summary (total orders, pending confirmation, completed deliveries, accounts)
   - Warehouse stock summary cards with available, reserved, and quarantined damaged counts
   - Delivered revenue chart and domestic vs. commercial distribution pie chart
   - Full order management ledger with status transitions and driver dispatch assignments
   - **Supplier Load Intake**: Record Agispure Gas truck manifests, arrival counts, damaged tallies, and manager approval lock (inventory only updates upon approval)
   - **Inventory Ledger**: Stock reserves, low stock alerts, manual adjustments with audit reason recording, and immutable stock movement ledger
   - **Physical Cylinder Tracking**: Serial number registry, tare weights, client assignments, and valve inspections
   - **Customer & Credit Database**: Customer types (Domestic, Commercial, Bulk, Institutional) with credit limit enforcement
   - **Formal Quotation Generator**: Line item tariffs, customizable GST rates, delivery handling charges, and order conversion
   - **Fleet Dispatch Board**: Assign orders to drivers, set vehicle numbers, and verify proof of delivery
   - **Delivery Calendar**: Weekly dispatch timeline
   - **Settlement Ledger**: Record offline cash, UPI, cheque, and bank transfer payments
   - **Brand Showcase CMS**: Manager approval and visibility controls for homepage logo carousel
   - **Website Content CMS**: Edit landing page headline, descriptions, and contact details without code deployment
   - **Staff & Drivers**: Fleet roster and operational role management
   - **Security Audit Logs**: Tamper-evident ledger of administrative adjustments

4. **Driver Portal (`/driver`)**
   - Simplified mobile-first progressive interface for delivery personnel
   - Real-time assigned route dispatches with turn navigation and one-tap customer calling
   - Start route (Out for Delivery), Confirm Handover (record recipient name & tare weight notes), or Mark Failed with reason

5. **Staff Desk (`/staff`)**
   - Dedicated portal for warehouse personnel to verify intake, check inventory bins, and monitor daily schedules

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React, Recharts
- **Backend**: Node.js, Express.js (v5), TypeScript REST API
- **Database**: PostgreSQL 17 with Prisma ORM
- **Authentication**: JWT HTTP-only cookies + Argon2id / bcrypt password hashing
- **Security**: Helmet, CORS origin validation, express-rate-limit

---

## 🔑 Quick Start & Development

### 1. Prerequisites
- Node.js >= 20
- PostgreSQL >= 16 running locally on port 5432 with database `sijaya_gasflow`

### 2. Environment Configuration
Copy `.env.example` to `apps/api/.env`:
```bash
DATABASE_URL="postgresql://YOUR_USER@localhost:5432/sijaya_gasflow"
API_PORT=4000
JWT_SECRET=your-secure-jwt-secret-minimum-64-characters
COOKIE_SECRET=your-secure-cookie-secret
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Database Migration & Seed
```bash
cd apps/api
npx prisma migrate dev
npx tsx prisma/seed.ts
```

### 4. Running the Platform
From the repository root:
```bash
# Terminal 1: Backend API (runs on port 4000)
npm run dev:api

# Terminal 2: Frontend Web Application (runs on port 3000)
npm run dev:web
```

---

## 👤 Pre-configured Test Accounts

| Role | Email | Password | Primary Portal |
|---|---|---|---|
| **Administrator** | `admin@sijaya.in` | `Admin@123456` | `/dashboard` |
| **Manager** | `manager@sijaya.in` | `Manager@123456` | `/dashboard` |
| **Delivery Driver** | `driver@sijaya.in` | `Driver@123456` | `/driver` |
| **Customer** | `customer@sijaya.in` | `Customer@123456` | `/customer` |

*Note: Quick 1-click test credentials autofill buttons are available on the `/login` screen for effortless evaluation.*

---

## ⚖️ Business Rules Enforced

1. **Inventory Locking**: Incoming gas loads from Agispure Gas do not increment warehouse available stock until an authorized Manager inspects discrepancies and explicitly clicks **Approve to Stock**.
2. **Negative Stock Prevention**: Stock adjustments that would drop warehouse reserves below zero are rejected at the database transaction layer.
3. **No Automatic Dispatch on Subscription**: Subscriptions trigger scheduled supply requests that must be confirmed by warehouse staff against actual stock.
4. **Revenue ≠ Profit**: Delivered billings are strictly accounted as revenue; operational profit is never reported without cost ledger reconciliation.
5. **Brand Display Integrity**: Only organisations marked as **Approved** in the Brand Management CMS appear on the public homepage.

=======

>>>>>>> ac676424a11f0b61afd61d4f0f998f716b779469
