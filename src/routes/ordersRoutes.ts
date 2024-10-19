import {Router} from 'express';
import passport from 'passport';
import {OrdersController} from '../controllers/ordersController';

const router = Router();
const ordersController = new OrdersController();

router.use(passport.authenticate('jwt', {session: false}));

router.get('/', (req, res) => ordersController.getAllOrders(req, res));
router.get('/:id', (req, res) => ordersController.getOrder(req, res));
router.post('/', (req, res) => ordersController.createOrder(req, res));
router.put('/:id', (req, res) => ordersController.updateOrder(req, res));
router.delete('/:id', (req, res) => ordersController.deleteOrder(req, res));

export {router as ordersRouter};
