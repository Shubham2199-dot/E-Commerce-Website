import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

// global intialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const currency = 'inr';
const deliveryCharges = 10;

//  COD Order
const codOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'cod',
      payment: false,
      date: Date.now(),
    };

    const order = new orderModel(orderData);
    await order.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: 'Order placed' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//  Stripe Order
const placedOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'stripe',
      payment: false,
      date: Date.now(),
    };

    const order = new orderModel(orderData);
    await order.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    items.forEach((item) => {
  console.log("Item name:", item.name, "| Price:", item.price, "| Quantity:", item.quantity);
});

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
    
      success_url: `${origin}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Verify Stripe Payment
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Razorpay Order
const placedOrderRazorpay = async (req, res) => {
  try {
    console.log(req.body)
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'razorpay',
      payment: false,
      date: Date.now(),
    };

    const order = new orderModel(orderData);
    console.log("Order data:", orderData);
    await order.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: order._id.toString(),
    };
    console.log("Razorpay options:", options);
     const razorpayOrder =  await razorpayInstance.orders.create(options)
     console.log(razorpayOrder);
  
     res.json({
      success: true,  order: razorpayOrder})
  
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.json({ success: false, message: error.message });
  }
};

//  Verify Razorpay Payment
const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === 'paid') {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ success: true, message: 'Payment successful' });
    } else {
      res.json({ success: false, message: 'Payment not completed yet' });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// All Orders (for Admin)
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//  User Orders (for User Panel)
const usersOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//  Update Order Status (Admin Panel)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,
      message: 'Order status updated',
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  codOrder,
  placedOrderStripe,
  verifyStripe,
  placedOrderRazorpay,
  verifyRazorpay,
  allOrders,
  usersOrders,
  updateStatus,
};


