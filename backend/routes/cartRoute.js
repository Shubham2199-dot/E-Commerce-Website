import express from 'express';
import { addToCart, getCartItems, updateCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', authUser, addToCart);
cartRouter.post('/get',authUser, getCartItems);   
cartRouter.post('/update',authUser, updateCart)

export default cartRouter;