import {DataStore} from '../utils/dataStore';

export class UsersProducts {
    id: number;
    categoryId: number;
    userId: string;
    created: Date;
    updated: Date;

    constructor(data: Partial<UsersProducts>) {
        this.id = data.id || UsersProductsModel.generateId();
        this.categoryId = <number>data.categoryId;
        this.userId = <string>data.userId;
        this.created = data.created || new Date();
        this.updated = data.updated || new Date();
    }
}

export class UsersProductsModel {
    static findAll(): UsersProducts[] {
        return DataStore.usersProducts;
    }

    static findById(id: number): UsersProducts {
        return <UsersProducts>DataStore.usersProducts.find((up) => up.id === id);
    }

    static create(usersProductsData: Partial<UsersProducts>): UsersProducts {
        const usersProducts = new UsersProducts(usersProductsData);
        DataStore.usersProducts.push(usersProducts);
        return usersProducts;
    }

    static update(id: number, usersProductsData: Partial<UsersProducts>): UsersProducts | null {
        const usersProducts = UsersProductsModel.findById(id);
        if (!usersProducts) return null;
        Object.assign(usersProducts, usersProductsData, {updated: new Date()});
        return usersProducts;
    }

    static delete(id: number): boolean {
        const index = DataStore.usersProducts.findIndex((up) => up.id === id);
        if (index !== -1) {
            DataStore.usersProducts.splice(index, 1);
            return true;
        }
        return false;
    }

    static generateId(): number {
        return DataStore.usersProducts.length > 0
            ? DataStore.usersProducts[DataStore.usersProducts.length - 1].id + 1
            : 1;
    }
}
