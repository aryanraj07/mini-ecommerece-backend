import "dotenv/config";
import { faker } from "@faker-js/faker";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Prisma } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const FAKE_COUNT = 3000;

async function fetchAllProducts() {
  const all: any[] = [];
  let skip = 0;
  const limit = 50;

  while (true) {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    );
    const json = await res.json();

    all.push(...json.products);

    skip += limit;
    if (skip >= json.total) break;
  }

  return all;
}

async function main() {
  console.log("🌱 Seeding started...");

  ////////////////////////////////////////
  // EXTRA DATA
  ////////////////////////////////////////

  const extraCategories = [
    "Furniture",
    "Electronics",
    "Fashion",
    "Kitchen",
    "Office",
    "Sports",
    "Gaming",
    "Decor",
    "Lighting",
    "Outdoor",
  ];

  const extraBrands = [
    "IKEA",
    "Nilkamal",
    "Godrej",
    "Samsung",
    "Apple",
    "Boat",
    "Sony",
    "Wakefit",
    "UrbanLadder",
    "HomeTown",
  ];

  const extraTags = [
    "New",
    "Trending",
    "Best Seller",
    "Limited",
    "Premium",
    "Budget",
    "Luxury",
    "Eco",
    "Compact",
    "Smart",
  ];

  await prisma.category.createMany({
    data: extraCategories.map((name) => ({ name })),
    skipDuplicates: true,
  });

  await prisma.brand.createMany({
    data: extraBrands.map((name) => ({ name })),
    skipDuplicates: true,
  });

  await prisma.tag.createMany({
    data: extraTags.map((name) => ({ name })),
    skipDuplicates: true,
  });

  ////////////////////////////////////////
  // REAL PRODUCTS
  ////////////////////////////////////////

  const realProducts = await fetchAllProducts();

  const categories = [...new Set(realProducts.map((p) => p.category))];
  const brands = [...new Set(realProducts.map((p) => p.brand).filter(Boolean))];

  await prisma.category.createMany({
    data: categories.map((name) => ({ name })),
    skipDuplicates: true,
  });

  await prisma.brand.createMany({
    data: brands.map((name) => ({ name })),
    skipDuplicates: true,
  });

  const allCategories = await prisma.category.findMany();
  const allBrands = await prisma.brand.findMany();
  const allTags = await prisma.tag.findMany();

  const categoryMap = Object.fromEntries(
    allCategories.map((c) => [c.name, c.id]),
  );
  const brandMap = Object.fromEntries(allBrands.map((b) => [b.name, b.id]));

  const categoryIds = allCategories.map((c) => c.id);
  const brandIds = allBrands.map((b) => b.id);
  const tagIds = allTags.map((t) => t.id);

  ////////////////////////////////////////
  // PRODUCTS
  ////////////////////////////////////////

  const formatted: Prisma.ProductCreateManyInput[] = [];

  // ✅ REAL
  realProducts.forEach((p, i) => {
    formatted.push({
      title: p.title,
      description: p.description,
      price: new Prisma.Decimal(p.price),
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      stock: p.stock,
      sku: p.sku ?? `SKU-${i}`,
      images: p.images,
      thumbnail: p.thumbnail,
      categoryId: categoryMap[p.category],
      brandId: brandMap[p.brand],
    });
  });

  // ✅ FAKE
  const remaining = FAKE_COUNT - formatted.length;

  for (let i = 0; i < remaining; i++) {
    formatted.push({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: new Prisma.Decimal(faker.number.int({ min: 500, max: 50000 })),
      discountPercentage: faker.number.int({ min: 5, max: 50 }),
      rating: faker.number.float({ min: 2, max: 5, fractionDigits: 1 }),
      stock: faker.number.int({ min: 0, max: 300 }),
      sku: faker.string.alphanumeric(10),
      images: [faker.image.urlPicsumPhotos({ width: 900, height: 900 })],
      thumbnail: faker.image.urlPicsumPhotos({ width: 400, height: 400 }),
      categoryId: faker.helpers.arrayElement(categoryIds),
      brandId: faker.helpers.arrayElement(brandIds),
    });
  }

  await prisma.product.createMany({ data: formatted });

  ////////////////////////////////////////
  // TAG LINKS
  ////////////////////////////////////////

  const dbProducts = await prisma.product.findMany({ select: { id: true } });

  const links: Prisma.ProductTagCreateManyInput[] = [];

  dbProducts.forEach((p) => {
    faker.helpers.arrayElements(tagIds, { min: 1, max: 4 }).forEach((tagId) => {
      links.push({ productId: p.id, tagId });
    });
  });

  await prisma.productTag.createMany({ data: links });

  console.log("✅ Seed finished with 3000 products");
}

main().finally(() => prisma.$disconnect());
