import {Router} from 'express';
import passport from 'passport';
import {UsersProductsController} from '../controllers/usersProductsController';

const router = Router();
const usersProductsController = new UsersProductsController();

router.use(passport.authenticate('jwt', {session: false}));

router.get('/', (req, res) => usersProductsController.getAllUsersProducts(req, res));
router.get('/:id', (req, res) => usersProductsController.getUsersProducts(req, res));
router.post('/', (req, res) => usersProductsController.createUsersProducts(req, res));
router.put('/:id', (req, res) => usersProductsController.updateUsersProducts(req, res));
router.delete('/:id', (req, res) => usersProductsController.deleteUsersProducts(req, res));

export {router as usersProductsRouter};
