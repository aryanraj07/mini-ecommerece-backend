export declare const userRouter: import("@trpc/server").TRPCBuiltRouter<{
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
