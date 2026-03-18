export declare const orderRouter: import("@trpc/server").TRPCBuiltRouter<{
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
