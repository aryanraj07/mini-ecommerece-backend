import type { OpenApiMeta } from "trpc-to-openapi";
export declare const router: import("@trpc/server").TRPCRouterBuilder<{
    ctx: {
        prisma: import("@prisma/client").PrismaClient<{
            adapter: import("@prisma/adapter-pg").PrismaPg;
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
    };
    meta: OpenApiMeta;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}>;
export declare const publicProcedure: import("@trpc/server").TRPCProcedureBuilder<{
    prisma: import("@prisma/client").PrismaClient<{
        adapter: import("@prisma/adapter-pg").PrismaPg;
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
}, OpenApiMeta, object, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
export declare const protectedProcedure: import("@trpc/server").TRPCProcedureBuilder<{
    prisma: import("@prisma/client").PrismaClient<{
        adapter: import("@prisma/adapter-pg").PrismaPg;
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
}, OpenApiMeta, {
    user: {
        id: number;
        phoneNumber: string;
        name: string | null;
        email: string | null;
        isVerified: boolean;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
    };
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
    guestId: any;
    prisma: import("@prisma/client").PrismaClient<{
        adapter: import("@prisma/adapter-pg").PrismaPg;
    }, never, import("@prisma/client/runtime/client").DefaultArgs>;
}, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
