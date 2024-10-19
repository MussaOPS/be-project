import {DataStore} from '../utils/dataStore';
import {UsersRole} from "../enums/usersRoleEnum";
import {randomUUID} from "node:crypto";
import {UpdateUsersDto} from "../dto/usersDto";

export class Users {
    id?: string;
    username: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    avatar: string;
    address: string;
    password: string;
    role: UsersRole;
    created?: Date;
    updated?: Date;

    constructor(data: {
        firstname: string;
        password: string;
        address: string;
        role?: string;
        phone: string;
        avatar?: string;
        email: string;
        username: string;
        lastname: string
    }) {
        this.id = randomUUID();
        this.username = <string>data.username;
        this.firstname = <string>data.firstname;
        this.lastname = <string>data.lastname;
        this.phone = <string>data.phone;
        this.email = <string>data.email;
        this.avatar = <string>data.avatar;
        this.address = <string>data.address;
        this.password = <string>data.password;
        this.role = UsersRole.USER;
        this.created = new Date();
        this.updated = new Date();
    }
}

export class UsersModel {
    static findAll(): Users[] {
        return DataStore.users;
    }

    static findById(id: string): Users {
        return <Users>DataStore.users.find((user) => user.id === id);
    }

    static findByUsername(username: string): Users {
        return <Users>DataStore.users.find((user) => user.username === username);
    }

    static create(userData: {
        firstname: string;
        password: string;
        address: string;
        role?: string;
        phone: string;
        avatar?: string;
        email: string;
        username: string;
        lastname: string
    }): Users {
        const user = new Users(userData);
        DataStore.users.push(user);
        return user;
    }

    static update(id: string, userData: UpdateUsersDto): Users | null {
        const user = UsersModel.findById(id);
        if (!user) return null;
        Object.assign(user, userData, {updated: new Date()});
        return user;
    }

    static delete(id: string): boolean {
        const index = DataStore.users.findIndex((user) => user.id === id);
        if (index !== -1) {
            DataStore.users.splice(index, 1);
            return true;
        }
        return false;
    }
}
