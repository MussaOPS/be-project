import {Request, Response} from 'express';
import {OrdersModel} from '../models/ordersModel';
import {UsersModel} from '../models/usersModel';
import {ProductsModel} from '../models/productsModel';
import {CreateOrdersDto, UpdateOrdersDto} from '../dto/ordersDto';

export class OrdersController {
    // GET ALL
    getAllOrders(req: Request, res: Response) {
        const orders = OrdersModel.findAll();
        res.json(orders);
    }

    // GET
    getOrder(req: Request, res: Response) {
        const order = OrdersModel.findById(req.params.id);
        if (!order) return res.status(404).json({message: 'Order not found'});
        res.json(order);
    }

    // CREATE
    createOrder(req: Request, res: Response) {
        const createOrderDto: CreateOrdersDto = req.body;
        const user = UsersModel.findById(createOrderDto.userId);
        const product = ProductsModel.findById(createOrderDto.productId);
        if (!user || !product) return res.status(400).json({message: 'Invalid user or product ID'});

        const order = OrdersModel.create(createOrderDto);
        res.status(201).json(order);
    }

    // UPDATE
    updateOrder(req: Request, res: Response) {
        const updateOrderDto: UpdateOrdersDto = req.body;
        if (updateOrderDto.userId) {
            const user = UsersModel.findById(updateOrderDto.userId);
            if (!user) return res.status(400).json({message: 'Invalid user ID'});
        }
        if (updateOrderDto.productId) {
            const product = ProductsModel.findById(updateOrderDto.productId);
            if (!product) return res.status(400).json({message: 'Invalid product ID'});
        }
        const order = OrdersModel.update(req.params.id, updateOrderDto);
        if (!order) return res.status(404).json({message: 'Order not found'});
        res.json(order);
    }

    // DELETE
    deleteOrder(req: Request, res: Response) {
        const success = OrdersModel.delete(req.params.id);
        if (!success) return res.status(404).json({message: 'Order not found'});
        res.json({message: 'Order deleted'});
    }
}
