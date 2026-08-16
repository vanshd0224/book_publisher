import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed Products
  const products = [
    {
      title: 'Essentials of Medical Device Clinical Research - Volume 1: Fundamentals & Regulations',
      volumeNumber: 1,
      price: 3500,
      stock: 500,
      isbn: '978-81-950000-1-0',
      description: 'Comprehensive volume covering fundamental principles, ISO 14155, and regulatory pathways across India, FDA, and EU MDR.',
      images: ['https://storage.googleapis.com/book-publisher-assets/vol1.jpg'],
      hsnCode: '4901',
      gstRate: 0.0,
    },
    {
      title: 'Essentials of Medical Device Clinical Research - Volume 2: Study Design & Management',
      volumeNumber: 2,
      price: 3500,
      stock: 500,
      isbn: '978-81-950000-2-7',
      description: 'In-depth guide on clinical investigation protocol design, risk management, monitoring, and data integrity.',
      images: ['https://storage.googleapis.com/book-publisher-assets/vol2.jpg'],
      hsnCode: '4901',
      gstRate: 0.0,
    },
    {
      title: 'Essentials of Medical Device Clinical Research - Volume 3: Post-Market Surveillance & Ethics',
      volumeNumber: 3,
      price: 3500,
      stock: 500,
      isbn: '978-81-950000-3-4',
      description: 'Focuses on PMCF, vigilance reporting, ethics committee reviews, and real-world evidence generation.',
      images: ['https://storage.googleapis.com/book-publisher-assets/vol3.jpg'],
      hsnCode: '4901',
      gstRate: 0.0,
    },
    {
      title: 'Essentials of Medical Device Clinical Research - Complete 3-Volume Hardcover Bundle Set',
      volumeNumber: 0, // 0 denotes full bundle
      price: 9500,
      stock: 1000,
      isbn: '978-81-950000-0-3',
      description: 'The authoritative 3-volume master collection by Dr. Ashish Indani for researchers, institutions, and clinical trial professionals.',
      images: ['https://storage.googleapis.com/book-publisher-assets/bundle.jpg'],
      hsnCode: '4901',
      gstRate: 0.0,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { isbn: p.isbn },
      update: p,
      create: p,
    });
  }
  console.log('Products seeded.');

  // Seed Discount Tiers for Institutional & Bulk Purchases
  const tiers = [
    { minQuantity: 1, maxQuantity: 4, discountPercent: 0.0 },
    { minQuantity: 5, maxQuantity: 19, discountPercent: 10.0 },
    { minQuantity: 20, maxQuantity: null, discountPercent: 20.0 },
  ];

  await prisma.discountTier.deleteMany({});
  for (const t of tiers) {
    await prisma.discountTier.create({ data: t });
  }
  console.log('Discount Tiers seeded.');

  // Seed Default Admin User
  const adminEmail = 'admin@bookpublisher.com';
  const hashedPassword = await bcrypt.hash('AdminPass@2026', 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash: hashedPassword },
    create: {
      email: adminEmail,
      passwordHash: hashedPassword,
      role: Role.ADMIN,
    },
  });
  console.log('Admin user seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
