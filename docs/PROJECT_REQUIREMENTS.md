# SIJAYA Agency — Project Requirements

## Business Context

**Business:** SIJAYA Agency  
**Platform:** SIJAYA Agency  
**Category:** LPG Gas Agency and Distribution Management  
**Supplier:** Aegis Pure gas (no API — manual data entry only)

---

## Portal Summary

| Portal | Users | Purpose |
|--------|-------|---------|
| Public Website | Visitors | Company presence, service information |
| Customer Portal | Customers | Bookings, orders, subscriptions, invoices |
| Manager Dashboard | Admin/Manager | Full operational control |
| Staff Portal | Staff | Order processing, inventory, load recording |
| Driver Portal | Drivers | Delivery assignments, status updates |

---

## Role Permissions Matrix

| Capability | Admin | Manager | Staff | Driver | Customer |
|-----------|-------|---------|-------|--------|----------|
| View all orders | ✓ | ✓ | ✓ | — | Own only |
| Create orders | ✓ | ✓ | ✓ | — | Own only |
| Approve loads | ✓ | ✓ | — | — | — |
| Record loads | ✓ | ✓ | ✓ | — | — |
| Approve inventory adjustment | ✓ | ✓ | — | — | — |
| View all customers | ✓ | ✓ | ✓ | — | — |
| Manage brands | ✓ | ✓ | — | — | — |
| Edit website content | ✓ | ✓ | — | — | — |
| Assign deliveries | ✓ | ✓ | ✓ | — | — |
| Update delivery status | ✓ | ✓ | ✓ | Own only | — |
| View analytics | ✓ | ✓ | — | — | — |
| Manage staff | ✓ | ✓ | — | — | — |
| View audit logs | ✓ | — | — | — | — |

---

## Critical Business Rules

1. **Inventory is only updated after load approval by a Manager/Admin.**
2. **Stock cannot go negative** — system prevents over-allocation.
3. **Subscriptions generate planned orders only** — each must be manually confirmed with stock.
4. **Revenue ≠ Profit** — the platform does not calculate profit unless cost/expense records exist.
5. **Only approved brands appear on the public homepage.**
6. **Quotations have an expiry date** — expired quotations cannot be accepted.
7. **Credit limit orders above the limit require Manager approval.**
8. **All sensitive operations are recorded in audit logs.**
9. **No external payment gateway** unless explicitly configured.
10. **All company information editable through the dashboard** — no hardcoded business details.

---

## Technology Constraints

- No MongoDB, Firebase, or alternative databases without approval
- No payment gateway integration without approval
- No deployment to production services without approval
- No AI features in v1 (architecture should be extensible)
- No copyrighted assets without permission

---

## Placeholder Policy

When real business information is unavailable:
- Use clearly labelled `[PLACEHOLDER]` values
- Make all such fields editable from the admin dashboard
- Never invent prices, tax rates, addresses, or phone numbers
- Never fabricate customer partnerships or testimonials

