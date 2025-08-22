import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
 export const ShopContext = createContext();
 import { useNavigate } from "react-router-dom";
 import axios from 'axios';



const ShopContextProvider =(props) => {

  const currency = '$';
  const deliveryFee = 10;
  const backendUrl =  import.meta.env.VITE_BACKEND_URL;
   const [token, setToken] = useState('')
  const [search , setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false)
  const[cartItems, setCartItems] = useState({})
  const [products, setProducts] = useState([])
  const navigate = useNavigate();
const [tokenLoaded, setTokenLoaded] = useState(false);


const addToCart = async (itemId, size) => {

  if (!size) {
    toast.error('Select Product Size')
    return
  }

 let cartData =  structuredClone(cartItems);

 if (cartData[itemId]) {
     if (cartData[itemId] [size]) {
      cartData[itemId] [size] += 1;
     }
     else{
      cartData[itemId][size] = 1;
     }
 }
 else{
  cartData[itemId] ={}
  cartData[itemId][size] = 1;

 }
 setCartItems(cartData);
 if(token){
  try {
     await axios.post(backendUrl + '/api/cart/add', { itemId, size },{headers:{token}})
  } catch (error) {
    toast.error(error.message)
  }
 }
}


const getCartCount = () => {
  let count = 0;

  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      const qty = cartItems[productId][size];
      if (qty > 0) {
        count += qty;
      }
    }
  }

  return count;
};

     const updateQuantity =  async (itemId, size, quantity) => {
     let cartData = structuredClone(cartItems);
     cartData[itemId][size] = quantity
     setCartItems(cartData)

     if(token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });

      } catch (error) {
        toast.error(error.message);
      }
     }
}

const getCartAmount = () => {
  let totalAmt = 0;

  for (const items in cartItems) {
    let product = products.find((p) => p._id === items);
    if (!product) continue; 

    for (const size in cartItems[items]) {
      let quantity = cartItems[items][size];
      if (quantity > 0) {
        totalAmt += product.price * quantity;
      }
    }
  }

  return totalAmt;
}


const getProductsData = async () => {
  try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if(response.data.success){
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }
  } catch (error) {
    toast.error(error.message)
  }
}

const getUserCart = async (token) => {
try {
    const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });

    if (response.data.success) {
     setCartItems(response.data.cartData); 
    }
} catch (error) {
     toast.error(error.message)
}
}

useEffect(()=> {
   getProductsData();
}, [])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'));
    }
  },[]);

useEffect(() => {
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    setToken(storedToken);
    getUserCart(storedToken);
  }
   setTokenLoaded(true); 
}, []);


  const value = {
     products, currency, deliveryFee, showSearch, setShowSearch, search , setSearch, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, token, setToken, setCartItems,  tokenLoaded,
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}


export default ShopContextProvider;