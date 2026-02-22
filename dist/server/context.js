import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as trpcExpress from "@trpc/server/adapters/express";
import jwt, {} from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { getUserFromToken } from "../helper/authHelper.js";
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
    adapter,
});
export const createContext = async ({ req, res, }) => {
    let user = null;
    const token = req.cookies?.accessToken;
    user = await getUserFromToken(token);
    let guestId = req.cookies?.guestId;
    if (!user && !guestId) {
        guestId = randomUUID();
        res.cookie("guestId", guestId, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });
    }
    return { prisma, user, req, res, guestId };
}; // no contextp
