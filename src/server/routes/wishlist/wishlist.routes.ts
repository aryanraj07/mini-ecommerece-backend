import z from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc.js";
import { simpleMessageResponse } from "../users/model.js";
import { getWishListItemsOutput } from "./wishlist.model.js";
import { productPreviewModal } from "../product/models.js";

export const wishListRouter = router({
  addToWishlist: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        tags: ["Wishlist"],
        path: "/wishlist",
        description: "Add product to wishlist",
      },
    })
    .input(
      z.object({
        productId: z.number(),
      }),
    )
    .output(simpleMessageResponse)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.wishlistItem.upsert({
        where: {
          userId_productId: {
            userId: ctx.user.id,
            productId: input.productId,
          },
        },
        update: {},
        create: {
          userId: ctx.user.id,
          productId: input.productId,
        },
      });
      return { message: "Added to wishlist" };
    }),
  removeFromWishList: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/wishlist/{productId}",
        tags: ["Wishlist"],
        description: "Remove product from wishlist",
      },
    })
    .input(z.object({ productId: z.number() }))
    .output(simpleMessageResponse)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.wishlistItem.deleteMany({
        where: {
          productId: input.productId,
          userId: ctx.user.id,
        },
      });
      return { message: "Removed from wishlist" };
    }),
  getWishlist: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/wishlist",
        tags: ["Wishlist"],
      },
    })
    .output(z.array(productPreviewModal))
    .query(async ({ ctx }) => {
      const items = ctx.prisma.wishlistItem.findMany({
        where: {
          userId: ctx.user.id,
        },
        include: {
          product: {
            select: {
              id: true,
              title: true,
              price: true,
              discountPercentage: true,
              thumbnail: true,
              stock: true,
              rating: true,
              brand: {
                select: { name: true },
              },
            },
          },
        },
      });

      return (await items).map((item) => {
        const price = Number(item.product.price);
        const discountPercentage = item.product.discountPercentage ?? 0;

        const discountedPrice = Number(
          (price * (1 - discountPercentage / 100)).toFixed(2),
        );

        return {
          id: item.product.id,
          title: item.product.title,
          price: Number(item.product.price),
          discountPercentage: discountPercentage,
          discountedPrice: discountedPrice,
          thumbnail: item.product.thumbnail ?? "",
          stock: item.product.stock,
          rating: item.product.rating ?? 0,
          brandName: item.product.brand?.name ?? "",
        };
      });
    }),
  mergeWishlist: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/merge-wishlist",
        description: "Merge the wishlist product",
        tags: ["Wishlist"],
      },
    })
    .input(
      z.object({
        productIds: z.array(z.number()),
      }),
    )
    .output(simpleMessageResponse)
    .mutation(async ({ ctx, input }) => {
      for (const productId of input.productIds) {
        await ctx.prisma.wishlistItem.upsert({
          where: {
            userId_productId: {
              userId: ctx.user.id,
              productId,
            },
          },
          update: {},
          create: {
            userId: ctx.user.id,
            productId,
          },
        });
      }
      return { message: "Wishlist merged" };
    }),
});
