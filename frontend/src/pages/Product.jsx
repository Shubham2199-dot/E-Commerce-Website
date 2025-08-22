import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState('');

  useEffect(() => {
    let matchedProduct = products.find((items) => items._id === productId);
    if (matchedProduct) {
      setProductData(matchedProduct);
      setImage(matchedProduct.image[0]);
    }
  }, [productId, products]);
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex sm:flex-row flex-col gap-6 w-full">
        <div className="flex sm:flex-row flex-col w-full sm:w-[60%] gap-4">
          <div className="flex sm:flex-col sm:w-[10%] w-full gap-2 sm:overflow-y-auto overflow-x-auto">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className={`w-[70px] h-[80px] object-cover rounded-md cursor-pointer 
              ${
                image === item
                  ? "border-2 border-blue-500"
                  : "border border-gray-300"
              }`}
              />
            ))}
          </div>

          <div className="w-full sm:w-[60%]">
            <img
              src={image}
              alt="Main Product"
              className="w-full max-h-[500px] object-contain rounded-md shadow-md"
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index)=>(
                 <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text:sm active:bg-gray-700 ">ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5"/>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
          <p>100% Original Product.</p>
          <p>Cash on delivery available on this Product</p>
          <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>


      {/*description and review section */}
      <div className="mt-20">
        <div className="flex ">
          <p className="border px-5 py-3 text:sm">Description</p>
<p className="border px-5 py-3 text:sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border  px-6 text:sm text-gray-600">
          <p>
An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
          </p>
          <p>
E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
          </p>
        </div>
      </div>

       {/*display related products */}
       <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
