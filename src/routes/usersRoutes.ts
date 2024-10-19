import {Router} from 'express';
import passport from 'passport';
import {UsersController} from '../controllers/usersController';

const router = Router();
const usersController = new UsersController();

// Public Routes
router.post('/register', (req, res) => usersController.createUser(req, res));
router.post('/login', (req, res) => usersController.login(req, res));

// Protected Routes
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => usersController.getAllUsers(req, res));
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => usersController.getUser(req, res));
router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => usersController.updateUser(req, res));
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => usersController.deleteUser(req, res));

export {router as usersRouter};
