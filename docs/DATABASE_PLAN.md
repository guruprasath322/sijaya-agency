# SIJAYA GasFlow — Database Plan

## Technology

- **Database:** PostgreSQL 17
- **ORM:** Prisma 5
- **Connection:** Single database, schema: `public`

---

## Schema Overview

### Core Tables

| Table | Purpose |
|-------|---------|
| `User` | Authentication — all portal users |
| `Session` | JWT sessions (optional revocation) |
| `Customer` | Customer profile and type |
| `CustomerAddress` | Multiple addresses per customer |
| `Staff` | Employee/driver profiles |

### Product & Inventory

| Table | Purpose |
|-------|---------|
| `Product` | LPG product catalogue |
| `Supplier` | Gas supplier records |
| `GasLoad` | Incoming load manifests |
| `GasLoadItem` | Per-product load quantities |
| `Inventory` | Current stock levels per product |
| `StockMovement` | Full ledger of every stock change |
| `CylinderAsset` | Individual cylinder tracking |

### Orders & Fulfilment

| Table | Purpose |
|-------|---------|
| `Order` | Customer orders |
| `OrderItem` | Line items per order |
| `Delivery` | Delivery assignments |
| `DeliveryProof` | Proof of delivery |
| `Subscription` | Recurring supply plans |
| `SubscriptionSchedule` | Individual schedule entries |

### Financial

| Table | Purpose |
|-------|---------|
| `CreditAccount` | Business credit limits |
| `Quotation` | Formal quotations |
| `QuotationItem` | Line items per quotation |
| `Invoice` | Generated invoices |
| `Payment` | Payment records |

### Content & Config

| Table | Purpose |
|-------|---------|
| `Brand` | Homepage carousel brands |
| `WebsiteContent` | CMS content (key-value) |
| `ConsumptionRecord` | Delivered quantity history |
| `Notification` | User notifications |
| `AuditLog` | Sensitive operation logs |

---

## Key Design Rules

1. **UUID primary keys** on all tables
2. **Soft delete** (`deletedAt`) on Customer, Order, User
3. **Decimal** for all financial and quantity fields
4. **Stock never goes negative** — enforced in application layer
5. **Inventory only updated after load approval**
6. **Every stock change creates a StockMovement record**
7. **Role checks on server side only** — never trust client
8. **Audit logging** for: load approval, inventory adjustment, payment recording, status changes

---

## Development Credentials (Seed)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@sijaya.in | Admin@123456 |
| Manager | manager@sijaya.in | Manager@123456 |
| Driver | driver@sijaya.in | Driver@123456 |
| Customer | customer@sijaya.in | Customer@123456 |

⚠️ **Change all passwords before any production use.**

