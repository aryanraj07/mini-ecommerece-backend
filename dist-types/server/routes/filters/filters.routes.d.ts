export declare const filterRouter: import("@trpc/server").TRPCBuiltRouter<{
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
    getFilterData: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            categories: {
                value: string | null;
                count: number;
            }[];
            brands: {
                value: string | null;
                count: number;
            }[];
            tags: {
                value: string | null;
                count: number;
            }[];
            priceRange: {
                min: number;
                max: number;
            };
            ratingRange: {
                max: number;
            };
            attributes: {
                [x: string]: string[];
            };
            sortOptions: ("price_asc" | "price_desc" | "rating_desc" | "newest")[];
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
}>>;
