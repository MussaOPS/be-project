import {Request, Response} from 'express';
import {UsersProductsModel} from '../models/usersProductsModel';
import {UsersModel} from '../models/usersModel';
import {CategoriesModel} from '../models/categoriesModel';
import {CreateUsersProductsDto, UpdateUsersProductsDto} from '../dto/usersProductsDto';

export class UsersProductsController {
    // GET ALL
    getAllUsersProducts(req: Request, res: Response) {
        const usersProducts = UsersProductsModel.findAll();
        res.json(usersProducts);
    }

    // GET
    getUsersProducts(req: Request, res: Response) {
        const usersProduct = UsersProductsModel.findById(parseInt(req.params.id));
        if (!usersProduct) return res.status(404).json({message: 'UsersProducts not found'});
        res.json(usersProduct);
    }

    // CREATE
    createUsersProducts(req: Request, res: Response) {
        const createUsersProductsDto: CreateUsersProductsDto = req.body;
        const user = UsersModel.findById(createUsersProductsDto.userId);
        const category = CategoriesModel.findById(createUsersProductsDto.categoryId);
        if (!user || !category) return res.status(400).json({message: 'Invalid user or category ID'});

        const usersProduct = UsersProductsModel.create(createUsersProductsDto);
        res.status(201).json(usersProduct);
    }

    // UPDATE
    updateUsersProducts(req: Request, res: Response) {
        const updateUsersProductsDto: UpdateUsersProductsDto = req.body;
        if (updateUsersProductsDto.userId) {
            const user = UsersModel.findById(updateUsersProductsDto.userId);
            if (!user) return res.status(400).json({message: 'Invalid user ID'});
        }
        if (updateUsersProductsDto.categoryId) {
            const category = CategoriesModel.findById(updateUsersProductsDto.categoryId);
            if (!category) return res.status(400).json({message: 'Invalid category ID'});
        }
        const usersProduct = UsersProductsModel.update(parseInt(req.params.id), updateUsersProductsDto);
        if (!usersProduct) return res.status(404).json({message: 'UsersProducts not found'});
        res.json(usersProduct);
    }

    // DELETE
    deleteUsersProducts = (req: Request, res: Response) => {
        const success = UsersProductsModel.delete(parseInt(req.params.id));
        if (!success) return res.status(404).json({message: 'UsersProducts not found'});
        res.json({message: 'UsersProducts deleted'});
    }
}
