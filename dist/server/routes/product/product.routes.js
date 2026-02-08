import z from "zod";
import { router, publicProcedure } from "../../trpc.js";
import { getAllProductOutput, productModel } from "./models.js";
export const productRouter = router({
    getAllProducts: publicProcedure
        .meta({
        openapi: {
            method: "GET",
            path: "/products",
            tags: ["Product"],
            description: "Returns all products",
        },
    })
        .input(z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(20),
    }))
        .output(z.array(productModel))
        .query(async ({ ctx, input }) => {
        const page = input?.page ?? 1;
        const limit = input?.limit ?? 20;
        const rawProducts = await ctx.prisma.product.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                category: true,
                brand: true,
                reviews: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
        const products = rawProducts.map((p) => ({
            ...p,
            price: Number(p.price),
            tags: p.tags?.map((t) => t.tag) ?? null,
        }));
        return products;
    }),
});
