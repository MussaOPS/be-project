import {Request, Response} from 'express';
import {CategoriesModel} from '../models/categoriesModel';
import {CreateCategoriesDto, UpdateCategoriesDto} from '../dto/categoriesDto';

export class CategoriesController {
    // GET ALL
    getAllCategories(req: Request, res: Response) {
        const categories = CategoriesModel.findAll();
        res.json(categories);
    }

    // GET
    getCategory(req: Request, res: Response) {
        const category = CategoriesModel.findById(parseInt(req.params.id));
        if (!category) return res.status(404).json({message: 'Category not found'});
        res.json(category);
    }

    // CREATE
    createCategory(req: Request, res: Response) {
        const createCategoriesDto: CreateCategoriesDto = req.body;
        const category = CategoriesModel.create(createCategoriesDto);
        res.status(201).json(category);
    }

    // UPDATE
    updateCategory(req: Request, res: Response) {
        const updateCategoriesDto: UpdateCategoriesDto = req.body;
        const category = CategoriesModel.update(parseInt(req.params.id), updateCategoriesDto);
        if (!category) return res.status(404).json({message: 'Category not found'});
        res.json(category);
    }

    // DELETE
    deleteCategory(req: Request, res: Response) {
        const success = CategoriesModel.delete(parseInt(req.params.id));
        if (!success) return res.status(404).json({message: 'Category not found'});
        res.json({message: 'Category deleted'});
    }
}
