export interface CreateUsersDto {
    username: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    avatar?: string;
    address: string;
    password: string;
    role?: string;
}

export interface UpdateUsersDto {
    firstname?: string;
    lastname?: string;
    phone?: string;
    email?: string;
    avatar?: string;
    address?: string;
    password?: string;
    role?: string;
}
