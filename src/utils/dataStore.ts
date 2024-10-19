import {Users} from '../models/usersModel';
import {Products} from '../models/productsModel';
import {Categories} from '../models/categoriesModel';
import {UsersProducts} from '../models/usersProductsModel';
import {Orders} from '../models/ordersModel';

export class DataStore {
    static users: Users[] = [];
    static products: Products[] = [];
    static categories: Categories[] = [];
    static usersProducts: UsersProducts[] = [];
    static orders: Orders[] = [];
}
