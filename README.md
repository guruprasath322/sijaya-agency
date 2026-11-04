# SIJAYA Agency Website

Public website and operations portal for SIJAYA Agency, an LPG distributor supplied by Aegis Puregas.

## Website features

- Responsive Home, About, Services, Business Solutions, Products, Safety, and Contact pages
- LPG product and business customer showcases
- Agency phone, WhatsApp, email, and map details
- Supply request form connected to Web3Forms for email delivery
- Customer, staff, driver, and administration portals

## Technology

- Next.js 15, React 19, TypeScript, and Tailwind CSS
- Express API and Prisma ORM
- PostgreSQL for customer and operations portal data
- Web3Forms for public contact form submissions; the form sends email and does not save requests to PostgreSQL

## Requirements

- Node.js 20 or newer
- PostgreSQL for the API and database-backed portal features
- A Web3Forms access key for the public contact form

## Local setup

Install dependencies from this folder:

```bash
npm ci
```

Configure the API using the variables in `.env.example`. Put the API environment file at `apps/api/.env`; provide valid PostgreSQL connection values and the required authentication secrets. Apply the Prisma migrations and generate the client:

```bash
npm run db:migrate --workspace=@sijaya/api
npm run db:generate --workspace=@sijaya/api
```

For the public website form, create a Web3Forms access key and put it in `apps/web/.env.local`:

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

The access key is intended for browser-side use. Never put database credentials or authentication secrets in a `NEXT_PUBLIC_` variable. Do not commit `.env`, `.env.local`, or other files containing real credentials.

Start the development servers from the project root:

```bash
npm run dev
```

The website runs at `http://localhost:3000` and the API at `http://localhost:4000`. If either port is already in use, stop the earlier development server before starting another.

## Build

Build the public website:

```bash
npm run build --workspace=@sijaya/web
```

Build the API:

```bash
npm run db:generate --workspace=@sijaya/api
npm run build --workspace=@sijaya/api
```

## Deployment notes

- Add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` to the environment of the host that builds and serves the Next.js website, then rebuild and redeploy.
- The API service is separate from the Next.js website. Configure API environment variables on the API host.
- Configure PostgreSQL and apply production migrations before using database-backed portal features.
- The public request form delivers submissions through Web3Forms; view and manage them through the Web3Forms account and its email notifications.

## Project structure

```text
apps/
  api/       Express API, Prisma schema, migrations, and seed data
  web/       Next.js website and portal
packages/
  shared/    Shared TypeScript types and validation schemas
docs/        Project documentation
```

## Branding

SIJAYA Agency is the company. Aegis Puregas is its LPG supplier.
