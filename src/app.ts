import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import {usersRouter} from './routes/usersRoutes';
import {productsRouter} from './routes/productsRoutes';
import {categoriesRouter} from './routes/categoriesRoutes';
import {usersProductsRouter} from './routes/usersProductsRoutes';
import {ordersRouter} from './routes/ordersRoutes';
import cors from 'cors';
import './middleware/passport';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));

// Routes
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/users-products', usersProductsRouter);
app.use('/orders', ordersRouter);

export default app;
