 import userModel from '../models/userModel.js';
//add to cart
const addToCart = async (req, res) => {
   try {
      const { userId, itemId, size } = req.body;
       
      const userData = await userModel.findById(userId);

      let cartData = userData.cartData 

      if (cartData[itemId]) {
         if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
         } else {
            cartData[itemId][size] = 1;
         }
      } else {
         cartData[itemId] = {};
         cartData[itemId][size] = 1;
      }

      await userModel.findByIdAndUpdate(userId, { cartData });

      res.json({
         success: true,
         message: 'Item added to cart successfully',
      });

   } catch (error) {
      res.json({
         success: false,
         message: error.message,
      });
   }
}

//update cart
const updateCart = async (req, res) => {
try {
   const { userId, itemId, size, quantity } = req.body;

 const userData = await userModel.findById(userId);
      let cartData = userData.cartData;

   cartData[itemId][size] = quantity;   

   await userModel.findByIdAndUpdate(userId, { cartData });

      res.json({
         success: true,
         message: 'Item updated to cart',
      });

} catch (error) {
    res.json({
         success: false,
         message: error.message,
      });
}
}

//get user cart
const getCartItems = async (req, res) => {
   try {
      const { userId } = req.body;
       const userData = await userModel.findById(userId);
      let cartData = userData.cartData;
      res.json({
         success: true,
        cartData,
      });
   } catch (error) {
        res.json({
         success: false,
         message: error.message,
      });
   }
}


export { addToCart, updateCart, getCartItems };