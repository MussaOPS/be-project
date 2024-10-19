import {Router} from 'express';
import passport from 'passport';
import {ProductsController} from '../controllers/productsController';

const router = Router();
const productsController = new ProductsController();

router.use(passport.authenticate('jwt', {session: false}));

router.get('/', (req, res) => productsController.getAllProducts(req, res));
router.get('/:id', (req, res) => productsController.getProduct(req, res));
router.post('/', (req, res, next) => productsController.createProduct(req, res, next));
router.put('/:id', (req, res, next) => productsController.updateProduct(req, res, next));
router.delete('/:id', (req, res, next) => productsController.deleteProduct(req, res, next));

export {router as productsRouter};
