// Navbar.jsx
import React from 'react'
import { Disclosure } from '@headlessui/react'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/images/gift-bag_9095412.png'
import cart from '../assets/images/shopping-cart_15406825.png'
import { NavLink, useNavigate } from 'react-router-dom'
import {  useState,useContext } from "react";
import { UserContext } from '../Context/UserContext'
import { CartContext } from '../Context/CartContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
let navigat= useNavigate()
let {userLogin,setuserLogin}= useContext(UserContext) 
let navigate=useNavigate()
const {  numOfCartItem  } = useContext(CartContext) 
function logOut( ) {
  localStorage.removeItem('userToken')
  setuserLogin(null)
navigate('/login')
}


  return (
   <Disclosure as="nav" className="bg-pink-200 fixed top-0 left-0 w-full z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex h-16 items-center justify-between">

               
              <div className="flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-pink-500">
                  <Bars3Icon className="block h-6 w-6" />
                </Disclosure.Button>
              </div>

               
              <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="h-8 w-auto" />
                <span className="font-bold">My Shop</span>
              </div>

               
             {userLogin !== null ? <> <div className="hidden sm:flex gap-4">
                {['/', '/products', '/categories', '/brands', '/wishlist','/cart', '/logout'].map((path, index) => {
                  const labels = ['Home', 'Products', 'Categories', 'Brands', 'Wish List','Cart',  "Log Out"];
                  if (path === '/logout') {
    return (
      <button
        key={path}
        onClick={logOut}
        className="text-gray-700 hover:bg-pink-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
        >
           {labels[index]}
        </button>)
      }
                  return (
                    <NavLink
                      key={path}
                      to={path}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? 'bg-blue-950 text-white'
                            : 'text-gray-700 hover:bg-pink-500 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )
                      }
                    >
                      {labels[index]}
                    </NavLink>
                  );
                })}
              </div>
               <div className="hidden sm:block cursor-pointer" onClick={() => navigate('/cart')} >
                <img src={cart} alt="User" className="h-8 w-full rounded-full relative  " />
                <span className='absolute top-0 end-0 text-sm rounded-full me-2 mt-2 bg-pink-600 text-white px-2 py-0.5'>{numOfCartItem}</span>
              </div>
              </> : <> 
              <div className="hidden sm:flex gap-4">
                {[ '/register', '/login' ].map((path, index) => {
                  const labels = [  'Register', 'Log In' ];
                  return (
                    <NavLink
                      key={path}
                      to={path}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? 'bg-blue-950 text-white'
                            : 'text-gray-700 hover:bg-pink-500 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )
                      }
                    >
                      {labels[index]}
                    </NavLink>
                  );
                })}
              </div></>}

               
             
            </div>
          </div>

           
          <Disclosure.Panel className="sm:hidden px-4 pb-4">
  {userLogin !== null ? (
    <div className="flex flex-col gap-2">
      {['/', '/products', '/categories', '/brands', '/wishlist','/cart', '/logout'].map((path, index) => {
        const labels = ['Home', 'Products', 'Categories', 'Wish List','Brands', 'Cart', 'Log Out'];
        return (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              classNames(
                isActive
                  ? 'bg-blue-950 text-white'
                  : 'text-gray-700 hover:bg-pink-500 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium'
              )
            }
          >
            {labels[index]}
          </NavLink>
        );
      })}
    </div>
  ) : (
    <div className="flex flex-col gap-2">
      {['/register', '/login'].map((path, index) => {
        const labels = ['Register', 'Log In'];
        return (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              classNames(
                isActive
                  ? 'bg-blue-950 text-white'
                  : 'text-gray-700 hover:bg-pink-500 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium'
              )
            }
          >
            {labels[index]}
          </NavLink>
        );
      })}
    </div>
  )}
</Disclosure.Panel>

        </>
      )}
    </Disclosure>

  )
}
