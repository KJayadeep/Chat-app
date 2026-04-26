import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Profile from './pages/Profile'
import Login from './pages/Login'

const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />

      </Routes>
    </div>
  )
}

export default App

