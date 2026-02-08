import "dotenv/config";
import { faker } from "@faker-js/faker";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Prisma } from "@prisma/client";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});

const FAKE_COUNT = 3000;

async function fetchAllProducts() {
  const all: any[] = [];
  let skip = 0;
  let limit = 50;
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
const generateFakeProducts = (count: number) => {
  const categories = [
    "electronics",
    "fashion",
    "beauty",
    "home",
    "sports",
    "books",
    "toys",
  ];
  const brands = [
    "Nike",
    "Samsung",
    "Apple",
    "Boat",
    "Sony",
    "Adidas",
    "Puma",
    "IKEA",
    "Dyson",
    "Glossier ",
    " The Ordinary",
    "Levi's ",
    "H&M ",
    "Patagonia ",
  ];
  const products: any[] = [];
  for (let i = 0; i < count; i++) {
    const category = faker.helpers.arrayElement(categories);
    const brand = faker.helpers.arrayElement(brands);
    products.push({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.float({ min: 10, max: 2000 }),
      discountPercentage: faker.number.float({ min: 0, max: 40 }),
      rating: faker.number.float({ min: 2, max: 5, precision: 0.1 }),
      stock: faker.number.int({ min: 0, max: 500 }),
      sku: `FAKE-SKU-${i}`,
      images: [`https://picsum.photos/400/400?random=${i}`],
      thumbnail: `https://picsum.photos/300/300?random=${i}`,
      category,
      brand,
    });
  }
  return products;
};
async function main() {
  console.log("🌱 Seeding started...");

  const realProducts = await fetchAllProducts();
  const fakeProducts = generateFakeProducts(FAKE_COUNT);

  const allProducts = [...realProducts, ...fakeProducts];

  console.log(`Total products: ${allProducts.length}`);

  //////////////////////////////////////
  // categories + brands
  //////////////////////////////////////

  const categories = [
    ...new Set(
      allProducts
        .map((p) => p.category)
        .filter((b) => typeof b === "string" && b.trim().length > 0),
    ),
  ];
  const brands = [
    ...new Set(
      allProducts
        .map((p) => p.brand)
        .filter((b) => typeof b === "string" && b.trim().length > 0),
    ),
  ];

  await prisma.category.createMany({
    data: categories.map((name) => ({ name })),
    skipDuplicates: true,
  });

  await prisma.brand.createMany({
    data: brands.map((name) => ({ name })),
    skipDuplicates: true,
  });

  const categoryMap = Object.fromEntries(
    (await prisma.category.findMany()).map((c) => [c.name, c.id]),
  );

  const brandMap = Object.fromEntries(
    (await prisma.brand.findMany()).map((b) => [b.name, b.id]),
  );

  //////////////////////////////////////
  // transform products
  //////////////////////////////////////

  const formatted: Prisma.ProductCreateManyInput[] = allProducts.map(
    (p, i) => ({
      title: p.title,
      description: p.description,
      price: new Prisma.Decimal(p.price),
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      stock: p.stock,
      sku: p.sku ?? `SKU-${i}`,
      images: p.images ?? [`https://picsum.photos/400/400?random=${i}`],
      thumbnail: p.thumbnail ?? `https://picsum.photos/300/300?random=${i}`,

      categoryId: categoryMap[p.category],
      brandId: brandMap[p.brand],
    }),
  );

  //////////////////////////////////////
  // bulk insert
  //////////////////////////////////////

  await prisma.product.createMany({
    data: formatted,
    skipDuplicates: true,
  });

  console.log("✅ Seed completed successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
