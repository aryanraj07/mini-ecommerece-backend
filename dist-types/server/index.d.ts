export declare const appRouter: import("@trpc/server").TRPCBuiltRouter<{
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
    products: import("@trpc/server").TRPCBuiltRouter<{
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
    filters: import("@trpc/server").TRPCBuiltRouter<{
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
    users: import("@trpc/server").TRPCBuiltRouter<{
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
        sendOtp: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                phoneNumber: string;
            };
            output: {
                message: string;
            };
            meta: import("trpc-to-openapi").OpenApiMeta;
        }>;
        verifyOtp: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                phoneNumber: string;
                otp: string;
            };
            output: {
                message: string;
            };
            meta: import("trpc-to-openapi").OpenApiMeta;
        }>;
        me: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                user: {
                    id: number;
                    name: string | null;
                    email: string | null;
                    phoneNumber: string;
                    isVerified: boolean;
                    role: "USER" | "ADMIN";
                    createdAt: Date;
                };
            };
            meta: import("trpc-to-openapi").OpenApiMeta;
        }>;
        refresh: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: void;
            meta: import("trpc-to-openapi").OpenApiMeta;
        }>;
        logout: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: {
                message: string;
            };
            meta: import("trpc-to-openapi").OpenApiMeta;
        }>;
    }>>;
    wishlistItems: import("@trpc/server").TRPCBuiltRouter<{
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
    cartItem: import("@trpc/server").TRPCBuiltRouter<{
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
    order: import("@trpc/server").TRPCBuiltRouter<{
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
        checkout: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                cartItemsIds: number[];
            };
            output: {
                orderId: number;
                razorpayOrderId: string;
                amount: number;
                currency: string;
                key: string;
            };
            meta: import("trpc-to-openapi").OpenApiMeta;
        }>;
        getMyOrders: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                userId: number;
                totalAmount: number;
                paymentStatus: "PENDING" | "SUCCESS" | "FAILED";
                paymentId: string | null;
                orderStatus: "CREATED" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
                createdAt: Date;
                items: {
                    id: number;
                    orderId: number;
                    productId: number;
                    quantity: number;
                    cartItemId: number;
                    price: number;
                    product: {
                        id: number;
                        title: string;
                        thumbnail: string | null;
                    };
                }[];
            }[];
            meta: import("trpc-to-openapi").OpenApiMeta;
        }>;
        getOrdderById: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                orderId: number;
            };
            output: {
                id: number;
                userId: number;
                totalAmount: number;
                paymentStatus: "PENDING" | "SUCCESS" | "FAILED";
                paymentId: string | null;
                orderStatus: "CREATED" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
                createdAt: Date;
                items: {
                    id: number;
                    orderId: number;
                    productId: number;
                    quantity: number;
                    cartItemId: number;
                    price: number;
                    product: {
                        id: number;
                        title: string;
                        thumbnail: string | null;
                    };
                }[];
            };
            meta: import("trpc-to-openapi").OpenApiMeta;
        }>;
        myOrders: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: ({
                items: ({
                    product: {
                        id: number;
                        createdAt: Date;
                        meta: import("@prisma/client/runtime/client").JsonValue | null;
                        title: string;
                        description: string;
                        categoryId: number;
                        price: import("@prisma/client-runtime-utils").Decimal;
                        discountPercentage: number | null;
                        rating: number | null;
                        stock: number;
                        brandId: number | null;
                        sku: string | null;
                        weight: number | null;
                        dimensions: import("@prisma/client/runtime/client").JsonValue | null;
                        availabilityStatus: string | null;
                        returnPolicy: string | null;
                        images: string[];
                        thumbnail: string | null;
                        updatedAt: Date;
                        sellerId: number;
                        slug: string;
                        totalReviews: number;
                        minimumOrderQuantity: number;
                        shippingInformation: string | null;
                        warrantyInformation: string | null;
                    };
                } & {
                    id: number;
                    price: import("@prisma/client-runtime-utils").Decimal;
                    productId: number;
                    quantity: number;
                    orderId: number;
                    cartItemId: number;
                })[];
            } & {
                id: number;
                createdAt: Date;
                userId: number;
                totalAmount: import("@prisma/client-runtime-utils").Decimal;
                paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
                paymentId: string | null;
                orderStatus: import("@prisma/client").$Enums.OrderStatus;
            })[];
            meta: import("trpc-to-openapi").OpenApiMeta;
        }>;
    }>>;
}>>;
export type AppRouter = typeof appRouter;
