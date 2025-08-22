import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/product/list",
        { headers: { token } }
      );
   
        
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await getData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    
    getData()
    
  }, []); 

  return (
    <>
  <p className="mb-4 text-lg font-semibold text-gray-800">All Products List</p>

  <div className="flex flex-col gap-2">
    {/* List table header */}
    <div className="hidden md:grid md:grid-cols-[80px_2fr_2fr_1fr_1fr] bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm">
      <span>Image</span>
      <span>Name</span>
      <span>Category</span>
      <span>Price</span>
      <span className="text-center">Action</span>
    </div>

    {/* Product list */}
    {Array.isArray(list) && list.length > 0 ? (
      list.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[80px_1fr_1fr] md:grid-cols-[80px_2fr_2fr_1fr_1fr] items-center gap-2 py-2 px-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
        >
          <img
            className="w-16 h-16 object-cover rounded-md border"
            src={item.image[0]}
            alt={item.name}
          />
          <p className="font-medium text-gray-800">{item.name}</p>
          <p className="text-gray-600">{item.category}</p>
          <p className="font-semibold text-gray-900">
            {currency}
            {item.price}
          </p>
          <button
            onClick={() => removeProduct(item._id)}
            className="text-red-500 hover:text-red-700 font-bold text-lg transition-colors duration-150"
          >
            ✕
          </button>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500 py-6">No products found.</p>
    )}
  </div>
</>

  );
};

export default List;
