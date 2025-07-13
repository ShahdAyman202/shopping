// App.jsx
import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CounterContextProvider from './Context/counterContext';
import Layout from './Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Brands from './components/Brands/Brands'
import UserContextProvider from './Context/UserContext';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut';
import WishList from './components/WishList/WishList';
import WishListProvider from './components/WishContext/WishContext';
import ForgetPass from './components/ForgetPass/ForgetPass';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
 
const route= createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      { index: true, element: <ProtectRoute><Home/></ProtectRoute> },
      { path: 'products', element: <ProtectRoute><Products/></ProtectRoute> },
      { path: 'cart', element: <ProtectRoute><Cart/></ProtectRoute> },
      { path: 'categories', element: <ProtectRoute><Categories/></ProtectRoute> },
      { path: 'checkout', element: <ProtectRoute><CheckOut/></ProtectRoute> },
      { path: 'wishlist', element: <ProtectRoute><WishList/></ProtectRoute> },
      { path: 'forgetpass', element:  <ForgetPass/> },
      { path: 'resetpassword', element:  <ResetPassword/> },
       
      { path: 'verifycode', element:  <VerifyCode/> },
      { path: 'productdetails/:id/:category', element: <ProtectRoute><ProductDetails/> </ProtectRoute> },
      { path: 'register', element: <Register/> },
      { path: 'login', element:<Login/> },
      { path: 'brands', element: <ProtectRoute><Brands/></ProtectRoute> },
      
    ]
  }
]);

export default function App() {
  return<>
  
 <UserContextProvider>
 <CartContextProvider>
  <WishListProvider>
     <CounterContextProvider>
  <RouterProvider router={route} />
  <Toaster/>
</CounterContextProvider>
  </WishListProvider>
 </CartContextProvider>
 </UserContextProvider>
   
  </>
}
