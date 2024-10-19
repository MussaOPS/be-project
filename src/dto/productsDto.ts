export interface CreateProductsDto {
    name: string;
    description: string;
    price: number;
    count: number;
    categoryId: number;
}

export interface UpdateProductsDto {
    name?: string;
    description?: string;
    price?: number;
    count?: number;
    categoryId?: number;
}
