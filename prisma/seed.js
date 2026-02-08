import dotenv from "dotenv";
dotenv.config();

import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const FAKE_COUNT = 3000;

async function generateFakeProducts(count) {
  const categories = ["electronics", "fashion", "beauty"];
  const brands = ["Nike", "Samsung", "Apple"];

  const products = [];

  for (let i = 0; i < count; i++) {
    products.push({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: new Prisma.Decimal(faker.number.float({ min: 10, max: 2000 })),
      stock: faker.number.int({ min: 0, max: 500 }),
      sku: `SKU-${i}`,
      images: [`https://picsum.photos/400/400?random=${i}`],
      thumbnail: `https://picsum.photos/300/300?random=${i}`,
      categoryId: 1,
      brandId: 1,
    });
  }

  return products;
}

async function main() {
  console.log("🌱 Seeding...");

  await prisma.category
    .create({
      data: { name: "electronics" },
    })
    .catch(() => {});

  await prisma.brand
    .create({
      data: { name: "Nike" },
    })
    .catch(() => {});

  const fakeProducts = await generateFakeProducts(FAKE_COUNT);

  await prisma.product.createMany({
    data: fakeProducts,
    skipDuplicates: true,
  });

  console.log("✅ Seed complete");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
