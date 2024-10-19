export interface CreateUsersProductsDto {
    categoryId: number;
    userId: string;
}

export interface UpdateUsersProductsDto {
    categoryId?: number;
    userId?: string;
}
