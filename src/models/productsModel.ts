import {DataStore} from '../utils/dataStore';
import {CategoriesModel} from './categoriesModel';
import {randomUUID} from "node:crypto";

export class Products {
    id: string;
    name: string;
    description: string;
    price: number;
    count: number;
    categoryId: number;
    created: Date;
    updated: Date;

    constructor(data: Partial<Products>) {
        this.id = data.id || randomUUID();
        this.name = <string>data.name;
        this.description = <string>data.description;
        this.price = <number>data.price;
        this.count = <number>data.count;
        this.categoryId = <number>data.categoryId;
        this.created = data.created || new Date();
        this.updated = data.updated || new Date();
    }
}

export class ProductsModel {
    static findAll(): Products[] {
        return DataStore.products;
    }

    static findById(id: string): Products {
        return <Products>DataStore.products.find((product) => product.id === id);
    }

    static create(productData: Partial<Products>): Products {
        const product = new Products(productData);
        DataStore.products.push(product);
        return product;
    }

    static update(id: string, productData: Partial<Products>): Products | null {
        const product = ProductsModel.findById(id);
        if (!product) return null;
        Object.assign(product, productData, {updated: new Date()});
        return product;
    }

    static delete(id: string): boolean {
        const index = DataStore.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            DataStore.products.splice(index, 1);
            return true;
        }
        return false;
    }
}
