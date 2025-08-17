import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/nonAuth/HomePage'
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import ShoppingPage from './components/nonAuth/ShoppingPage'

const AppRoutes = () => {
  return (
     <Routes>

      
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/shop' element={<ShoppingPage/>}/>

 
        <Route/>
     </Routes>
  )
}

export default AppRoutes