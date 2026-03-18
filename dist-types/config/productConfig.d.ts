export interface ProductConfigType {
    brands: string[];
    imageQuery: string;
    basePrice: {
        min: number;
        max: number;
    };
    colors?: string[];
    sizes?: string[];
    storage?: string[];
}
export declare const productConfig: Record<string, ProductConfigType>;
