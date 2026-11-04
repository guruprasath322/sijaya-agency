SIJAYA AGENCY WEBSITE

SIJAYA Agency is an LPG distributor supplied by Aegis Puregas. This project contains its public website and database-backed customer and operations portals.

PUBLIC WEBSITE
- Home, About, Services, Business Solutions, Products, Safety, and Contact pages
- Responsive layouts, product and customer showcases, contact details, and depot map
- Supply request form sends submissions to the agency email through Web3Forms

TECHNOLOGY
- Next.js 15, React 19, TypeScript, Tailwind CSS
- Express API, Prisma ORM, and PostgreSQL for portal data
- Web3Forms for contact form email delivery (the form does not save to PostgreSQL)

LOCAL SETUP
1. Install Node.js 20 or newer.
2. From the SIJAYA project folder, run: npm ci
3. Configure apps/api/.env using .env.example. Add valid PostgreSQL URLs and authentication secrets.
4. Add the Web3Forms key to apps/web/.env.local:
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
5. Apply the database migrations and generate Prisma Client:
   npm run db:migrate --workspace=@sijaya/api
   npm run db:generate --workspace=@sijaya/api
6. Start the website and API from the project root:
   npm run dev

The website runs at http://localhost:3000. The API runs at http://localhost:4000. If either port is already occupied, stop the old development server before starting another.

BUILD
Website: npm run build --workspace=@sijaya/web
API: npm run build --workspace=@sijaya/api

DEPLOYMENT
Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY on the hosting service that builds the Next.js website, then redeploy. Configure API environment variables and PostgreSQL on the API host. Do not commit real credentials or .env files.

BRANDING
The company is SIJAYA Agency. Aegis Puregas is its LPG supplier.
