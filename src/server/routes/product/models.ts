import z from "zod";
// Enums

export const userRoleEnum = z.enum(["USER", "ADMIN"]);
// Base Entities
export const categoryModel = z.object({
  id: z.number().int().describe("Auto increment category id"),
  name: z.string().describe("Category name"),
});
export const brandModel = z.object({
  id: z.number().int().describe("Auto increment brand id"),
  name: z.string().describe("Brand name"),
});
export const tagModel = z.object({
  id: z.number().int().describe("Tag id"),
  name: z.string().describe("Tag name"),
});
// Review
export const reviewModel = z.object({
  id: z.number().int().describe("Review id"),
  rating: z.number().int().min(1).max(5).describe("Star Rating"),
  comment: z.string().describe("Review text"),
  date: z.date().describe("Review created date"),
  reviewerName: z.string().describe("Reviewer name"),
  reviewerEmail: z.string().email().describe("Reviewer email"),
});
//Product
export const productModel = z.object({
  id: z.number().int().describe("Auto increment product id"),
  title: z.string().describe("Product title"),
  description: z.string().describe(" Product Description "),
  price: z.number().describe("Product price (decimal converted to number)"),
  discountPercentage: z
    .number()
    .nullable()
    .describe("Discount percentage if available"),
  rating: z.number().nullable().describe("Average rating"),
  stock: z.number().int().describe("Available stock quantity"),
  sku: z.string().describe("Unique stock keeping unit"),
  weight: z.number().nullable().describe("Weight in grams"),
  dimensions: z.unknown().nullable().describe("Json object storing size info"),
  warrantyInformation: z.string().nullable(),
  shippingInformation: z.string().nullable(),
  availabilityStatus: z.string().nullable(),
  returnPolicy: z.string().nullable(),
  minimumOrderQuantity: z.number().int().nullable(),
  meta: z.unknown().nullable().describe("Extra metadata JSON"),
  images: z.array(z.string()).nullable().describe("Product Image Urls"),
  thumbnail: z.string().nullable().describe("Thumbnail image URL"),
  // Relations
  categoryId: z.number().int(),
  brandId: z.number().nullable(),
  category: categoryModel.nullable(),
  brand: brandModel.nullable(),
  tags: z.array(tagModel).nullable(),
  reviews: z.array(reviewModel).nullable(),
  // TimeStamps
  createdAt: z.date().describe("Created timestamps"),
  updatedAt: z.date().describe("Last updated timestamps"),
});

export type Product = z.infer<typeof productModel>;
// User

export const userModel = z.object({
  id: z.number().int(),
  name: z.string().nullable().describe("Name of the user"),
  email: z.string().email().nullable().describe("Email of the user"),
  otpRef: z.string().nullable().describe("Reference of otp"),
  otpHased: z.string().nullable().describe("Hashed otp to be stored in db"),
  otpExpiry: z.date(),
  isVerified: z.boolean().default(false),
  role: userRoleEnum.default("USER"),
  refreshToken: z.string(),
  createdAt: z.date(),
});
export const cartItemModal = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int().min(1),
  product: productModel.nullable(),
});
export const wishListModel = z.object({
  id: z.number().int(),

  userId: z.number().int(),

  productId: z.number().int(),

  quantity: z.number().int().min(1),

  product: productModel.nullable(),
});
export const getAllProductOutput = z.object({
  products: z.array(productModel),
});
export const getSingleProductOutput = z.object({
  product: productModel,
});
