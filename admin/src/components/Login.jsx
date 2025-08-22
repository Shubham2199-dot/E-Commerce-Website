import React, { useState } from 'react'
import axios from 'axios';
import { backendUrl } from '../App';
const Login = ({setToken}) => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const onSubmitHandler =async (e) => {
  try {
    e.preventDefault();
    const response = await axios.post(backendUrl + '/api/user/admin',{email, password})
    
     if (response.data.success) {
      
        setToken(response.data.token)
     }else{
      
     }
  } catch (error) {
    
  }
}

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
      Admin Panel
    </h1>
    <form onSubmit={onSubmitHandler} className="space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Email Address</p>
        <input onChange={(e)=>setEmail(e.target.value)}
        value={email}
          type="email"
          placeholder="Enter Email address"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Password</p>
        <input onChange={(e)=> setPassword(e.target.value)}
        value={password}
          type="password"
          placeholder="Enter password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </div>
    <button
  type="submit"
  className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300"
>
  Login
</button>

    </form>
  </div>
</div>

  )
}

export default Login
