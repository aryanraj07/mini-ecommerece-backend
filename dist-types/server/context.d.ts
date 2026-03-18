import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as trpcExpress from "@trpc/server/adapters/express";
export declare const createContext: ({ req, res, }: trpcExpress.CreateExpressContextOptions) => Promise<{
    prisma: PrismaClient<{
        adapter: PrismaPg;
    }, never, import("@prisma/client/runtime/client").DefaultArgs>;
    user: {
        id: number;
        phoneNumber: string;
        name: string | null;
        email: string | null;
        isVerified: boolean;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
    } | null;
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    guestId: any;
}>;
export type Context = Awaited<ReturnType<typeof createContext>>;
