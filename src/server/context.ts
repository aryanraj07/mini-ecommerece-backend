import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as trpcExpress from "@trpc/server/adapters/express";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});
export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { prisma };
}; // no contextp
export type Context = Awaited<ReturnType<typeof createContext>>;
