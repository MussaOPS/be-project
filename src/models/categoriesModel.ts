import {DataStore} from '../utils/dataStore';

export class Categories {
    id: number;
    name: string;
    created: Date;
    updated: Date;

    constructor(data: Partial<Categories>) {
        this.id = data.id || CategoriesModel.generateId();
        this.name = <string>data.name;
        this.created = data.created || new Date();
        this.updated = data.updated || new Date();
    }
}

export class CategoriesModel {
    static findAll(): Categories[] {
        return DataStore.categories;
    }

    static findById(id: number): Categories {
        return <Categories>DataStore.categories.find((category) => category.id === id);
    }

    static create(categoryData: Partial<Categories>): Categories {
        const category = new Categories(categoryData);
        DataStore.categories.push(category);
        return category;
    }

    static update(id: number, categoryData: Partial<Categories>): Categories {
        const category = CategoriesModel.findById(id);
        if (!category) return null;
        Object.assign(category, categoryData, {updated: new Date()});
        return category;
    }

    static delete(id: number): boolean {
        const index = DataStore.categories.findIndex((category) => category.id === id);
        if (index !== -1) {
            DataStore.categories.splice(index, 1);
            return true;
        }
        return false;
    }

    static generateId(): number {
        return DataStore.categories.length > 0
            ? DataStore.categories[DataStore.categories.length - 1].id + 1
            : 1;
    }
}
