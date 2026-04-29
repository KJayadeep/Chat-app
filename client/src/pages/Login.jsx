import React from 'react'

const Login = () => {
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      <form action="" className='bg-white/30 backdrop-blur-lg p-8 rounded-xl shadow-lg'>
        <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>
        <div className='mb-4'>
          <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
          <input type="email" id="email" className='bg-white/50 placeholder:text-gray-400 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Enter your email" />
        </div>
        <div className='mb-6'>
          <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
          <input type="password" id="password" className='bg-white/50 placeholder:text-gray-400 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Enter your password" />
        </div>
        <button type="submit" className='w-full bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer hover:opacity-90 transition-opacity'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
