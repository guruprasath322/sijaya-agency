import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding SIJAYA Agency database...\n');

  // ── Admin user ─────────────────────────────────────────────
  const adminHash = await argon2.hash('Admin@123456');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sijaya.in' },
    update: {},
    create: {
      email: 'admin@sijaya.in',
      passwordHash: adminHash,
      role: 'ADMIN',
      staff: {
        create: {
          employeeCode: 'EMP-ADMIN-001',
          name: 'SIJAYA Agency Administrator',
          phone: '[PHONE-PLACEHOLDER]',
          role: 'ADMIN',
        },
      },
    },
  });
  console.log(`✔ Admin user: ${admin.email}`);

  // ── Manager user ────────────────────────────────────────────
  const managerHash = await argon2.hash('Manager@123456');
  const manager = await prisma.user.upsert({
    where: { email: 'manager@sijaya.in' },
    update: {},
    create: {
      email: 'manager@sijaya.in',
      passwordHash: managerHash,
      role: 'MANAGER',
      staff: {
        create: {
          employeeCode: 'EMP-MGR-001',
          name: 'SIJAYA Agency Manager',
          phone: '[PHONE-PLACEHOLDER]',
          role: 'MANAGER',
        },
      },
    },
  });
  console.log(`✔ Manager user: ${manager.email}`);

  // ── Driver user ─────────────────────────────────────────────
  const driverHash = await argon2.hash('Driver@123456');
  const driver = await prisma.user.upsert({
    where: { email: 'driver@sijaya.in' },
    update: {},
    create: {
      email: 'driver@sijaya.in',
      passwordHash: driverHash,
      role: 'DRIVER',
      staff: {
        create: {
          employeeCode: 'EMP-DRV-001',
          name: 'Delivery Driver (Demo)',
          phone: '[PHONE-PLACEHOLDER]',
          role: 'DRIVER',
        },
      },
    },
  });
  console.log(`✔ Driver user: ${driver.email}`);

  // ── Demo customer ───────────────────────────────────────────
  const customerHash = await argon2.hash('Customer@123456');
  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@sijaya.in' },
    update: {},
    create: {
      email: 'customer@sijaya.in',
      passwordHash: customerHash,
      role: 'CUSTOMER',
      phone: '[PHONE-PLACEHOLDER]',
      customer: {
        create: {
          customerCode: 'CUST-DEMO-001',
          name: 'Demo Customer',
          phone: '[PHONE-PLACEHOLDER]',
          email: 'customer@sijaya.in',
          customerType: 'DOMESTIC',
          addresses: {
            create: {
              label: 'Home',
              addressLine1: '[ADDRESS-PLACEHOLDER]',
              city: 'Palani',
              district: 'Dindigul',
              isDefault: true,
            },
          },
        },
      },
    },
  });
  console.log(`✔ Demo customer: ${customerUser.email}`);

  // ── Supplier ────────────────────────────────────────────────
  const supplier = await prisma.supplier.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: { name: 'Aegis Pure gas' },
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Aegis Pure gas',
      notes: 'Primary LPG supplier for SIJAYA Agency',
    },
  });
  console.log(`✔ Supplier: ${supplier.name}`);

  // ── Products ────────────────────────────────────────────────
  const products = [
    { name: 'Domestic LPG 14.2 kg', nameTamil: 'உள்நாட்டு எல்பிஜி 14.2 கிலோ', unit: 'CYLINDER_14KG' as const, displayOrder: 1 },
    { name: 'Commercial LPG 19 kg', nameTamil: 'வணிக எல்பிஜி 19 கிலோ', unit: 'CYLINDER_19KG' as const, displayOrder: 2 },
    { name: 'Compact LPG 5 kg', nameTamil: 'சிறிய எல்பிஜி 5 கிலோ', unit: 'CYLINDER_5KG' as const, displayOrder: 3 },
    { name: 'Bulk LPG (kg)', nameTamil: 'மொத்த எல்பிஜி (கிலோ)', unit: 'KG' as const, displayOrder: 4 },
  ];

  for (const p of products) {
    const existing = await prisma.product.findFirst({ where: { name: p.name } });
    if (!existing) {
      const product = await prisma.product.create({ data: p });
      await prisma.inventory.create({ data: { productId: product.id } });
      console.log(`✔ Product: ${product.name}`);
    }
  }

  // ── Initial brand entries (unverified — manager must approve before display) ──
  const brands = [
    { nameEnglish: 'EBET College', category: 'Education', isApproved: false },
    { nameEnglish: 'Kuppanna Poultry', category: 'Poultry & Farm', isApproved: false },
    { nameEnglish: 'Kannika Bakery', category: 'Bakery', isApproved: false },
    { nameEnglish: 'S.R. Bakery – Ottanchathiram', category: 'Bakery', isApproved: false },
    { nameEnglish: 'Salem R.R Biriyani', category: 'Restaurant', isApproved: false },
    { nameEnglish: 'Winsome Hostel – Palani', category: 'Hostel', isApproved: false },
    { nameEnglish: 'Pazhaniandavar Mill', nameTamil: 'பழனியாண்டவர் மில்', category: 'Commercial Mill', isApproved: false },
    { nameEnglish: 'Arunmigu Mill', nameTamil: 'அருண்மிகு மில்', category: 'Commercial Mill', isApproved: false },
  ];

  for (const [i, brand] of brands.entries()) {
    const existing = await prisma.brand.findFirst({ where: { nameEnglish: brand.nameEnglish } });
    if (!existing) {
      await prisma.brand.create({ data: { ...brand, displayOrder: i + 1 } });
      console.log(`✔ Brand (pending approval): ${brand.nameEnglish}`);
    }
  }

  // ── Website content placeholders ────────────────────────────
  const contentEntries = [
    {
      key: 'hero',
      title: 'Reliable Gas Supply. Smarter Business.',
      content: 'Dependable LPG solutions for homes, businesses and industries — powered by reliable supply and smarter distribution.',
      contentJson: { primaryCta: 'Request Gas Supply', secondaryCta: 'Explore Our Services' },
    },
    {
      key: 'about',
      title: 'About SIJAYA Agency',
      content: 'SIJAYA Agency is a trusted LPG gas distribution agency supplying domestic, commercial and bulk LPG to homes, businesses and institutions. We are committed to reliable delivery, transparent service and customer satisfaction.',
    },
    {
      key: 'contact',
      title: 'Contact SIJAYA Agency',
      contentJson: {
        address: '[Business Address — To Be Updated]',
        phone: '[Phone Number — To Be Updated]',
        email: '[Email — To Be Updated]',
        whatsapp: '[WhatsApp Number — To Be Updated]',
        businessHours: 'Monday–Saturday: 9:00 AM – 6:00 PM',
        mapEmbed: '',
      },
    },
    {
      key: 'faqs',
      contentJson: [
        { q: 'How can I request an LPG cylinder?', a: 'You can request a cylinder through our website, customer portal, or by contacting us directly.' },
        { q: 'Do you supply commercial LPG?', a: 'Yes. We supply commercial LPG cylinders and bulk LPG to hotels, restaurants, bakeries, institutions and other businesses.' },
        { q: 'Can hotels request recurring supply?', a: 'Yes. We offer recurring supply arrangements for commercial customers. Contact us to discuss your requirements.' },
        { q: 'How can I request bulk LPG?', a: 'Use the "Request Bulk Supply" form or contact us directly with your quantity requirements and location.' },
        { q: 'How can I track my order?', a: 'You can track your order status through the customer portal after logging in.' },
        { q: 'How do I contact SIJAYA Agency?', a: 'You can reach us by phone, email, WhatsApp or through the contact form on this website.' },
      ],
    },
  ];

  for (const entry of contentEntries) {
    await prisma.websiteContent.upsert({
      where: { key: entry.key },
      update: { ...entry },
      create: { ...entry },
    });
    console.log(`✔ Content: ${entry.key}`);
  }

  console.log('\n✅ Seed completed successfully.');
  console.log('\n⚠️  IMPORTANT: These are development credentials.');
  console.log('   Change all passwords before any non-development use.');
  console.log('   Update all [PLACEHOLDER] values with real business information.\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

