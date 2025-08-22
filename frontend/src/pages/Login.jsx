import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'
import { toast } from 'react-toastify';
const Login = () => {
  const {token, setToken, backendUrl, navigate} = useContext(ShopContext)
  const [currentState, setCurrentState] = useState('signup');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')


  const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    if (currentState === 'signup') {
      const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token); 
      } else {
        toast.error(response.data.message);
      }

    } else {
      const response = await axios.post(backendUrl + '/api/user/login', { email, password });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token); 
      } else {
        toast.error(response.data.message);
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  useEffect(()=>{
    if (token) {
      navigate('/home')

    }
  },[token])
  return (
    <form onSubmit={onSubmitHandler}  className="w-[90%] sm:w-[400px] mx-auto mt-20 bg-white p-6 rounded-xl shadow-md space-y-5">
      {/* Title */}
      <div className="flex items-center gap-3 justify-center">
        <p className="text-2xl font-semibold text-gray-800">
          {currentState === 'Login' ? 'Login to Account' : 'Create an Account'}
        </p>
        <hr className="w-8 h-[2px] bg-gray-800 border-none" />
      </div>

      {/* Name Field - Only for Signup */}
      {currentState === 'signup' && (
        <input onChange={(e) => setName(e.target.value)} value={name}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          placeholder="Full Name"
        />
      )}

      {/* Email Field */}
      <input onChange={(e) => setEmail(e.target.value)} value={email}
        type="email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
        placeholder="Email Address"
      />

      {/* Password Field */}
      <input onChange={(e) => setPassword(e.target.value)} value={password}
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
        placeholder="Password"
      />

      {/* Bottom Links */}
      <div className="flex justify-between text-sm text-gray-600">
        <p className="cursor-pointer hover:text-gray-900">Forgot Password?</p>
        <p
          className="cursor-pointer hover:text-gray-900"
          onClick={() =>
            setCurrentState(currentState === 'Login' ? 'signup' : 'Login')
          }
        >
          {currentState === 'Login'
            ? 'Create Account'
            : 'Already have an account? Login'}
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 mt-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-all"
      >
        {currentState === 'Login' ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;

