import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

  const {search, setShowSearch, showSearch , setSearch} = useContext(ShopContext);
  const [visible, setVisible] = useState(false)

 const location = useLocation();

useEffect(()=> {
 if (location.pathname.includes('collection')) {
  setVisible(true)
 }else {
  setVisible(false)
 }
},[location])
  
  return showSearch && visible ? (

    <div className="border-t border-b bg-gray-50 py-6">
  <div className="mx-auto w-11/12 sm:w-3/4 md:w-1/2 flex items-center gap-3 border border-gray-300 bg-white rounded-full px-4 py-2 shadow-sm">
    <img src={assets.search_icon} alt="search" className="w-5 opacity-60" />

    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      type="text"
      placeholder="Search"
      className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
    />

    <img
      onClick={() => setShowSearch(false)}
      src={assets.cross_icon}
      alt="close"
      className="w-4 cursor-pointer opacity-70 hover:opacity-100 transition"
    />
  </div>
</div>

  ): null
}

export default SearchBar

