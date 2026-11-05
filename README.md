# SIJAYA Agency

SIJAYA Agency supplies LPG to households, businesses, and institutions. Aegis Puregas is the LPG supplier. This repository contains SIJAYA's public website and its supporting operations API.

**Live website:** [https://www.sijaya.in](https://www.sijaya.in)

## Website

The responsive website is built with Next.js and includes:

- Home, About, Services, Business Solutions, Products, Safety, and Contact pages
- Domestic, commercial, and bulk LPG product information
- Agency contact details, WhatsApp ordering, and directions
- A supply request form delivered through Web3Forms
- Customer, staff, driver, and administration portal pages
- SIJAYA branding and customer logos

## Technology

- Next.js 15, React 19, TypeScript, and Tailwind CSS
- Express API with Prisma ORM
- PostgreSQL for API and portal data
- Web3Forms for submissions from the public supply request form

The public request form sends submissions through Web3Forms. Those submissions are not saved in the application's PostgreSQL database.

## Repository layout

```text
apps/
  web/       Next.js website and portal
  api/       Express API, Prisma schema, migrations, and seed data
packages/
  shared/    Shared TypeScript types and validation schemas
docs/        Project, design, and database documentation
```

## Requirements

- Node.js 20 or newer
- npm
- PostgreSQL for local API and database-backed portal features
- A Web3Forms access key for the public request form

## Run locally

Run commands from the repository root:

```bash
npm ci
```

Create `apps/api/.env` with the API, authentication, and PostgreSQL settings from the root `.env.example`. Configure `DATABASE_URL` and `DIRECT_URL` for your database, and set strong values for `JWT_SECRET` and `COOKIE_SECRET`. Generate Prisma Client and apply the development migrations:

```bash
npm run db:generate --workspace=@sijaya/api
npm run db:migrate
```

Create `apps/web/.env.local` for the website settings:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

Get a Web3Forms access key from [web3forms.com](https://web3forms.com/). This key is intended for browser-side use. Never put database credentials, JWT secrets, or other private credentials in a `NEXT_PUBLIC_` variable. Do not commit `.env` files or real credentials.

Start the website and API together:

```bash
npm run dev
```

- Website: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:4000](http://localhost:4000)

To start one service only, use `npm run dev:web` or `npm run dev:api`. If ports 3000 or 4000 are already in use, stop the process already using that port first.

## Build

Build the website:

```bash
npm run build --workspace=@sijaya/web
```

Build the API:

```bash
npm run db:generate --workspace=@sijaya/api
npm run build --workspace=@sijaya/api
```

Build all workspaces:

```bash
npm run build
```

## Deploy the website with Vercel

The repository is an npm workspace monorepo. Import the GitHub repository into Vercel and keep the **Root Directory** at the repository root so the root `package-lock.json` and workspaces are available.

Use these project settings if Vercel does not detect them automatically:

- Framework preset: **Next.js**
- Install command: `npm ci`
- Build command: `npm run build --workspace=@sijaya/web`

Add the website environment variables in Vercel's project settings, including `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. If the portal should call a deployed API, set `NEXT_PUBLIC_API_URL` to that API's public URL. The Express API is a separate service and needs its own host and environment variables; deploying the Next.js website alone does not deploy the API.

The custom domain [www.sijaya.in](https://www.sijaya.in) is connected to the website. Vercel provisions HTTPS after the domain's DNS configuration has been verified.

## Agency and supplier

**Company:** SIJAYA Agency

**LPG supplier:** Aegis Puregas

## Development acknowledgment

Built and maintained by Guruprasath, with coding, debugging, documentation, and deployment assistance from OpenAI Codex.
