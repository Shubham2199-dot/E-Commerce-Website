import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;
 
      const response = await axios.post(
        backendUrl + '/api/order/user-orders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allItems = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allItems.push(item);
          });
        });

        setOrderData(allItems.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) loadOrderData();
  }, [token]);

  return (
    <div className="pt-16 px-4 max-w-6xl mx-auto">
      <div className="text-3xl font-semibold text-center mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="space-y-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="border rounded-md p-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-sm"
          >
            {/* Image + Name */}
            <div className="flex items-start gap-4 md:w-1/2">
              <img
                className="w-20 h-20 object-cover rounded"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                {/* Skip delivery charges from showing like product */}
                {item.name.toLowerCase().includes('delivery') ? (
                  <p className="text-sm text-blue-600 font-semibold">
                    Delivery Charges: {currency}
                    {item.price}
                  </p>
                ) : (
                  <>
                    <p className="text-lg font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-500">
                      Unit Price: {currency}
                      {item.price}
                    </p>
                    <p className="text-sm font-semibold">
                      Total: {currency}
                      {item.price * item.quantity}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Price + Date */}
            <div className="mt-4 md:mt-0 text-sm text-gray-600 md:text-right">
              <p>Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
              <p>Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
            </div>

            {/* Status + Button */}
            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <p className="text-sm text-gray-700">{item.status || "pending"}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="mt-1 border border-gray-700 text-gray-700 hover:bg-gray-100 px-4 py-1 text-sm font-medium rounded"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
