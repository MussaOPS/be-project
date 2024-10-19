import {Request, Response} from 'express';
import {ProductsModel} from '../models/productsModel';
import {CategoriesModel} from '../models/categoriesModel';
import {CreateProductsDto, UpdateProductsDto} from '../dto/productsDto';

export class ProductsController {
    // GET ALL
    getAllProducts(req: Request, res: Response) {
        const products = ProductsModel.findAll();
        res.json(products);
    }

    // GET
    getProduct(req: Request, res: Response) {
        const product = ProductsModel.findById(req.params.id);
        if (!product) return res.status(404).json({message: 'Product not found'});
        res.json(product);
    }

    // CREATE
    createProduct(req: Request, res: Response) {
        const createProductDto: CreateProductsDto = req.body;
        const category = CategoriesModel.findById(createProductDto.categoryId);
        if (!category) return res.status(400).json({message: 'Invalid category ID'});

        const product = ProductsModel.create(createProductDto);
        res.status(201).json(product);
    }

    // UPDATE
    updateProduct(req: Request, res: Response) {
        const updateProductDto: UpdateProductsDto = req.body;
        if (updateProductDto.categoryId) {
            const category = CategoriesModel.findById(updateProductDto.categoryId);
            if (!category) return res.status(400).json({message: 'Invalid category ID'});
        }
        const product = ProductsModel.update(req.params.id, updateProductDto);
        if (!product) return res.status(404).json({message: 'Product not found'});
        res.json(product);
    }

    // DELETE
    deleteProduct(req: Request, res: Response) {
        const success = ProductsModel.delete(req.params.id);
        if (!success) return res.status(404).json({message: 'Product not found'});
        res.json({message: 'Product deleted'});
    }
}
