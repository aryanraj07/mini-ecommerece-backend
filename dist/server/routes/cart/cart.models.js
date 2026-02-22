import z, { number } from "zod";
import { productModel, productPreviewModal } from "../product/models.js";
export const cartProductModel = productModel.pick({
    id: true,
    title: true,
    price: true,
    discountPercentage: true,
    thumbnail: true,
    stock: true,
});
export const cartSummary = z.object({
    total: z.number(),
    discount: z.number(),
    payable: z.number(),
});
export const cartItemModel = z.object({
    quantity: z.number().int().min(1),
    productId: z.number(),
    title: z.string(),
    price: z.number(),
    discountPercentage: z.number(),
    discountedPrice: z.number().optional(),
    thumbnail: z.string(),
    stock: z.number(),
    rating: z.number(),
    brandName: z.string(),
});
export const getCartItemsOutput = z.object({
    cartItem: z.array(cartItemModel),
    summary: cartSummary,
});
