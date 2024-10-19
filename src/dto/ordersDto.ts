export interface CreateOrdersDto {
    userId: string;
    productId: string;
    price: number;
    count: number;
}

export interface UpdateOrdersDto {
    userId?: string;
    productId?: string;
    price?: number;
    count?: number;
}
