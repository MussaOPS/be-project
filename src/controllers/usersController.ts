import {Request, RequestHandler, Response} from 'express';
import {UsersModel} from '../models/usersModel';
import {CreateUsersDto, UpdateUsersDto} from '../dto/usersDto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UsersController {
    // GET ALL
    getAllUsers(req: Request, res: Response) {
        const users = UsersModel.findAll().map((user) => ({
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            email: user.email,
            avatar: user.avatar,
            address: user.address,
            role: user.role,
            created: user.created,
            updated: user.updated,
        }));
        res.json(users);
    }

    // GET
    getUser(req: Request, res: Response) {
        const user = UsersModel.findById(req.params.id);
        if (!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }
        const {password, ...userData} = user;
        res.json(userData);
    };

    // CREATE
    createUser = async (req: Request, res: Response) => {
        const createUserDto: CreateUsersDto = req.body;
        const existingUser = UsersModel.findByUsername(createUserDto.username);
        if (existingUser) {
            res.status(400).json({message: 'Username already exists'});
            return;
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = UsersModel.create({...createUserDto, password: hashedPassword});
        res.status(201).json(user);
    };

    // UPDATE
    updateUser = async (req: Request, res: Response) => {
        const updateUserDto: UpdateUsersDto = req.body;
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        const user = UsersModel.update(req.params.id, updateUserDto);
        if (!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }
        res.json(user);
    };

    // DELETE
    deleteUser = (req: Request, res: Response) => {
        const success = UsersModel.delete(req.params.id);
        if (!success) {
            res.status(404).json({message: 'User not found'});
            return;
        }
        res.json({message: 'User deleted'});
    };

    // LOGIN
    login = async (req: Request, res: Response) => {
        const {username, password} = req.body;
        const user = UsersModel.findByUsername(username);
        if (!user) {
            res.status(400).json({message: 'Invalid credentials'});
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({message: 'Invalid credentials'});
            return;
        }

        const token = jwt.sign({id: user.id}, 'your_jwt_secret', {expiresIn: '1h'});
        res.cookie('jwt', token, {httpOnly: true});
        res.json({message: 'Logged in successfully'});
    };
}
