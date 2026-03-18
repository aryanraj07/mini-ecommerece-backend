export declare const wishListRouter: import("@trpc/server").TRPCBuiltRouter<{
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
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    addToWishlist: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            productId: number;
        };
        output: {
            message: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    removeFromWishList: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            productId: number;
        };
        output: {
            message: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    getWishlist: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: number[];
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    mergeWishlist: import("@trpc/server").TRPCMutationProcedure<{
        input: void;
        output: {
            message: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
}>>;
