import express from 'express';
import {codOrder, placedOrderStripe, placedOrderRazorpay, allOrders, usersOrders, updateStatus, verifyStripe, verifyRazorpay} from '../controllers/ordersController.js';

import auth from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js';
const orderRouter = express.Router();

//for admin panel
orderRouter.post('/list',adminAuth, allOrders);  
orderRouter.post('/status', adminAuth, updateStatus);



//payment method route
orderRouter.post('/cod-order',auth, codOrder);
orderRouter.post('/place-order-stripe',auth, placedOrderStripe); 
orderRouter.post('/place-order-razorpay',auth, placedOrderRazorpay);

//user feature routes
orderRouter.post('/user-orders', auth, usersOrders);

//verify payment
orderRouter.post('/verify-stripe', auth, verifyStripe);
orderRouter.post('/verify-razorpay', auth, verifyRazorpay);

export default orderRouter;
