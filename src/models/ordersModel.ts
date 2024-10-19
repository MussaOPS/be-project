import {DataStore} from '../utils/dataStore';
import {randomUUID} from "node:crypto";

export class Orders {
    id: string;
    userId: string;
    productId: string;
    price: number;
    count: number;
    created: Date;
    updated: Date;

    constructor(data: Partial<Orders>) {
        this.id = data.id || randomUUID();
        this.userId = <string>data.userId;
        this.productId = <string>data.productId;
        this.price = <number>data.price;
        this.count = <number>data.count;
        this.created = data.created || new Date();
        this.updated = data.updated || new Date();
    }
}

export class OrdersModel {
    static findAll(): Orders[] {
        return DataStore.orders;
    }

    static findById(id: string): Orders {
        return <Orders>DataStore.orders.find((order) => order.id === id);
    }

    static create(orderData: Partial<Orders>): Orders {
        const order = new Orders(orderData);
        DataStore.orders.push(order);
        return order;
    }

    static update(id: string, orderData: Partial<Orders>): Orders | null {
        const order = OrdersModel.findById(id);
        if (!order) return null;
        Object.assign(order, orderData, {updated: new Date()});
        return order;
    }

    static delete(id: string): boolean {
        const index = DataStore.orders.findIndex((order) => order.id === id);
        if (index !== -1) {
            DataStore.orders.splice(index, 1);
            return true;
        }
        return false;
    }
}
