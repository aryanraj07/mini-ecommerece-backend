export declare const cartRouter: import("@trpc/server").TRPCBuiltRouter<{
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
    addToCart: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            productId: number;
            quantity?: number | undefined;
        };
        output: {
            message: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    getCart: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            cartItem: {
                id: number;
                quantity: number;
                productId: number;
                title: string;
                price: number;
                discountPercentage: number;
                thumbnail: string;
                stock: number;
                rating: number;
                brandName: string;
                discountedPrice?: number | undefined;
            }[];
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    getCartSummary: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            cartItemIds: number[];
        };
        output: {
            total: number;
            discount: number;
            payable: number;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    removeFromCart: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            cartItemId: number;
        };
        output: {
            message: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    updateQuantity: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            cartItemId: number;
            quantity?: number | undefined;
        };
        output: {
            message: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    mergeCart: import("@trpc/server").TRPCMutationProcedure<{
        input: void;
        output: {
            message: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
}>>;
