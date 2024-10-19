import {Router} from 'express';
import passport from 'passport';
import {ProductsController} from '../controllers/productsController';

const router = Router();
const productsController = new ProductsController();

router.use(passport.authenticate('jwt', {session: false}));

router.get('/', (req, res) => productsController.getAllProducts(req, res));
router.get('/:id', (req, res) => productsController.getProduct(req, res));
router.post('/', (req, res) => productsController.createProduct(req, res));
router.put('/:id', (req, res) => productsController.updateProduct(req, res));
router.delete('/:id', (req, res) => productsController.deleteProduct(req, res));

export {router as productsRouter};
