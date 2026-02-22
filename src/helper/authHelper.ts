import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});
export async function getUserFromToken(token?: string) {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      userId: number;
    };

    return prisma.user.findUnique({
      where: { id: decoded.userId },
    });
  } catch {
    return null;
  }
}
