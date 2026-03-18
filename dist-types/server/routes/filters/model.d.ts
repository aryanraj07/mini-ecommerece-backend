import z from "zod";
export declare const filterOptionModel: z.ZodObject<{
    value: z.ZodNullable<z.ZodString>;
    count: z.ZodNumber;
}, z.z.core.$strip>;
export declare const priceRangeModel: z.ZodObject<{
    min: z.ZodNumber;
    max: z.ZodNumber;
}, z.z.core.$strip>;
export declare const ratingRangeModel: z.ZodObject<{
    max: z.ZodNumber;
}, z.z.core.$strip>;
export declare const attributesModel: z.ZodObject<{}, z.z.core.$catchall<z.ZodArray<z.ZodString>>>;
export declare const sortOptionsModel: z.ZodArray<z.ZodEnum<{
    price_asc: "price_asc";
    price_desc: "price_desc";
    rating_desc: "rating_desc";
    newest: "newest";
}>>;
export declare const getFilterDataOutput: z.ZodObject<{
    categories: z.ZodArray<z.ZodObject<{
        value: z.ZodNullable<z.ZodString>;
        count: z.ZodNumber;
    }, z.z.core.$strip>>;
    brands: z.ZodArray<z.ZodObject<{
        value: z.ZodNullable<z.ZodString>;
        count: z.ZodNumber;
    }, z.z.core.$strip>>;
    tags: z.ZodArray<z.ZodObject<{
        value: z.ZodNullable<z.ZodString>;
        count: z.ZodNumber;
    }, z.z.core.$strip>>;
    priceRange: z.ZodObject<{
        min: z.ZodNumber;
        max: z.ZodNumber;
    }, z.z.core.$strip>;
    ratingRange: z.ZodObject<{
        max: z.ZodNumber;
    }, z.z.core.$strip>;
    attributes: z.ZodObject<{}, z.z.core.$catchall<z.ZodArray<z.ZodString>>>;
    sortOptions: z.ZodArray<z.ZodEnum<{
        price_asc: "price_asc";
        price_desc: "price_desc";
        rating_desc: "rating_desc";
        newest: "newest";
    }>>;
}, z.z.core.$strip>;
export type FilterDataOutput = z.infer<typeof getFilterDataOutput>;
