import React from 'react'
import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {

const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const verifyPayment = async () => {
   try {
       if (!token) {
         return null;
       }

       const response = await axios.post(backendUrl + '/api/order/verify-stripe', {orderId, success}, {headers: {token}});

       if (response.data.success) {
        setCartItems({});
        navigate('/orders');
       }else{
        navigate('/cart');
       }
   } catch (error) {
       toast.error(error.message);
   } 
}

useEffect(()=> {
   verifyPayment();
   
}, [token])

  return (
    <div>
      verify
    </div>
  )
}

export default Verify;
