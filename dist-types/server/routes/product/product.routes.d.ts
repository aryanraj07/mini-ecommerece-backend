export declare const productRouter: import("@trpc/server").TRPCBuiltRouter<{
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
    getAllProducts: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            page?: unknown;
            limit?: unknown;
            category?: string[] | undefined;
            brand?: string[] | undefined;
            tag?: string[] | undefined;
            min?: unknown;
            max?: unknown;
            rating?: unknown;
            search?: string | undefined;
            sort?: string | undefined;
            ids?: number[] | undefined;
        };
        output: {
            products: {
                id: number;
                title: string;
                price: number;
                discountPercentage: number;
                thumbnail: string;
                stock: number;
                rating: number;
                brandName: string;
                discountedPrice?: number | undefined;
                tags?: {
                    id: number;
                    name: string;
                }[] | undefined;
                category?: {
                    id: number;
                    name: string;
                } | undefined;
                brand?: {
                    id: number;
                    name: string;
                } | null | undefined;
            }[];
            meta: {
                current_page: number;
                last_page: number;
                total: number;
            };
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    getSingleProduct: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: unknown;
        };
        output: {
            product: {
                id: number;
                title: string;
                description: string;
                price: number;
                discountPercentage: number | null;
                rating: number | null;
                stock: number;
                sku: string | null;
                weight: number | null;
                dimensions: unknown;
                warrantyInformation: string | null;
                shippingInformation: string | null;
                availabilityStatus: string | null;
                returnPolicy: string | null;
                minimumOrderQuantity: number | null;
                meta: unknown;
                images: string[] | null;
                thumbnail: string | null;
                categoryId: number;
                brandId: number | null;
                category: {
                    id: number;
                    name: string;
                } | null;
                brand: {
                    id: number;
                    name: string;
                } | null;
                tags: {
                    id: number;
                    name: string;
                }[] | null;
                reviews: {
                    id: number;
                    rating: number;
                    comment: string;
                    createdAt: Date;
                    reviewerName: string;
                    reviewerEmail: string;
                }[] | null;
                createdAt: Date;
                updatedAt: Date;
            };
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    getSimilarProducts: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            productId: number;
        };
        output: {
            products: {
                id: number;
                title: string;
                price: number;
                discountPercentage: number;
                thumbnail: string;
                stock: number;
                rating: number;
                brandName: string;
                discountedPrice?: number | undefined;
                tags?: {
                    id: number;
                    name: string;
                }[] | undefined;
                category?: {
                    id: number;
                    name: string;
                } | undefined;
                brand?: {
                    id: number;
                    name: string;
                } | null | undefined;
            }[];
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
}>>;
