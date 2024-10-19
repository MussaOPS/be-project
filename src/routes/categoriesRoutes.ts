import {Router} from 'express';
import passport from 'passport';
import {CategoriesController} from '../controllers/categoriesController';

const router = Router();
const categoriesController = new CategoriesController();

router.use(passport.authenticate('jwt', {session: false}));

router.get('/', (req, res) => categoriesController.getAllCategories(req, res));
router.get('/:id', (req, res) => categoriesController.getCategory(req, res));
router.post('/', (req, res) => categoriesController.createCategory(req, res));
router.put('/:id', (req, res) => categoriesController.updateCategory(req, res));
router.delete('/:id', (req, res) => categoriesController.deleteCategory(req, res));

export {router as categoriesRouter};
