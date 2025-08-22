import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const[category, setCategory] = useState([]);
const [subcategory, setSubCategory] = useState([])
const [sortType, setsortType] = useState('relavent');


  const togglecategory = (e) => {

    if (category.includes(e.target.value)) {
 setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

    const toggleSubcategory = (e) => {

    if (subcategory.includes(e.target.value)) {
     setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilterCategory = () => {
     
    let productCopy = products.slice();

    
    if (showSearch && search ) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category))
    } 
      if (subcategory.length > 0) {
      productCopy = productCopy.filter(item => subcategory.includes(item.subCategory))
    }
    setFilterProducts(productCopy)
  }

  useEffect(() =>{
  applyFilterCategory();
  },[category, subcategory, search, products])


  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch(sortType) {
      case 'low-to-high':
      setFilterProducts(fpCopy.sort((a, b)=>(a.price- b.price)));
      break;

      case 'high-to-low':
      setFilterProducts(fpCopy.sort((a, b)=>(b.price- a.price)));
      break;

      default:
      applyFilterCategory();
       break;
    }

  }
  
useEffect(() =>{
 sortProduct();
},[sortType])
  
  return (
  <div className="flex flex-col sm:flex-row gap-1    sm:gap-10  pt-10 border-t">
      {/* filter option */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : " "}`} src={assets.dropdown_icon} alt=""/>
        </p>

        {/*CATEGORY FILTER */}
        <div
          className={`border border-gray-300 pl-5 py-3 pmt-6 ${
            showFilter ? "" : "hidden"
          }`}>
          <p className="mb-3 text:sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Men"} onChange={togglecategory}/>
              Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Women"} onChange={togglecategory} />
              Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Kids"} onChange={togglecategory} />
              Kids
            </p>
          </div>
        </div>
      
      {/*SUBCATEGORY FILTER */}
      <div
          className={`border border-gray-300 pl-5 py-3 pmt-6 mt-5 ${
            showFilter ? "" : "hidden"
          }`}>
          <p className="mb-3 text:sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Topwear"} onChange={toggleSubcategory}/>
              Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Bottomwear"} onChange={toggleSubcategory} />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Winterwear"} onChange={toggleSubcategory} />
              Winterwear
            </p>
          </div>
        </div>
    </div>


    {/*Right side */}
    <div className="flex-1">
      <div className="flex justify-between text-base sm:text-2xl mb-4">
        <Title text1={`ALL`} text2={`COLLECTIONS`} />
          {/*product sort */}

          <select onChange={(e) => setsortType(e.target.value)} className="border border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-to-high">Sort by: low-to-high</option>
            <option value="high-to-low">Sort by: high-to-low</option>
          </select>
      </div>
 {/*map products */}
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
{filterProducts.map((items, index) => (
   <ProductItem
    key={index} 
   name={items.name} 
   id={items._id}
    price={items.price}
   image={items.image}/>
))}
 </div>

    </div>
    </div>
  );
};

export default Collection;
