import React, { useState } from 'react'
import style from './Login.module.css'
import axios from 'axios';
 import { Formik, useFormik } from 'formik';
import * as yup from 'yup' 
import {useNavigate,Link}from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useContext } from "react";
import { UserContext } from '../../Context/UserContext';


export default function Login() {
    const [counter, setcounter] = useState(0)
    let {setuserLogin}=useContext(UserContext)
 let validation =yup.object().shape({
  
  email:yup.string().required('email is required').email("invalid email"),
  password:yup.string().required('password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'invalid password'),
  })

 const [errMsg, seterrMsg] = useState(0)
    const [loadind, setloadind] = useState(false)
let navigate=useNavigate()
  
async function submitForm(val) {
   setloadind(true)
   axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,val).then(({data})=>{
    setloadind(false)
if (data.message==='success'){
   setuserLogin(data?.token)
   navigate('/')
  localStorage.setItem('userToken',data?.token)
 
}
   }).catch((error)=>{
    setloadind(false)
seterrMsg(error?.response?.data?.message)
   })
}


let formik= useFormik({
  initialValues:{
    
    email:"",
    password:"",
    
  },
   validationSchema:validation
  ,
  onSubmit: submitForm
 
 })
 
    // useEffect(() => {
    
    // }, [])
  return  <>
  

<form className="max-w-md mx-auto my-36" onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-20 text-center font-bold">
    <h2 className="py-2.5 font-extrabold mb-5 md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-t to-blue-900 from-pink-400">
      Log In Now
    </h2>
  </div>
 
  <div className="relative z-0 w-full mb-5 group">
    <input
      type="email"
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name="email"
      id="email"
      className="block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
      placeholder=" "
    />
    <label
      htmlFor="email"
      className="peer-focus:font-medium absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
    >
      Email address
    </label>
  </div>
{/* alert */}
{formik.errors.email && formik.touched.email? <div id="toast-danger" className="flex items-center w-full max-w-xs p-2 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-white dark:bg-red-500" role="alert">
  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
    </svg>
    <span className="sr-only">Error icon</span>
  </div>
  <div className="ml-3 text-sm font-normal"> {formik.errors.email}</div>
  <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-red-500 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
    <span className="sr-only">Close</span>
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
    </svg>
  </button>
</div>:null}

 {/* alert */}
 
  <div className="relative z-0 w-full mb-5 group">
    <input
      type="password"
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name="password"
      id="password"
      className="block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-900 peer"
      placeholder=" "
    />
    <label
      htmlFor="password"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
    >
      Password
    </label>
  </div>
{/* alert */}
{formik.errors.password && formik.touched.password? <div id="toast-danger" className="flex items-center w-full max-w-xs p-2 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-white dark:bg-red-500" role="alert">
  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
    </svg>
    <span className="sr-only">Error icon</span>
  </div>
  <div className="ml-3 text-sm font-normal"> {formik.errors.password}</div>
  <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-red-500 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
    <span className="sr-only">Close</span>
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
    </svg>
  </button>
</div>:null}

 {/* alert */}
   
   <div>
    <Link to={'/forgetpass'} className='flex justify-end text-blue-500 hover:underline hover:text-blue-800'>
    Forget Password?
    </Link>
   </div>

   <button
    type="submit"
    className="text-white bg-blue-900 hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center"
  >
   {loadind ? <i className='fas fa-spinner fa-spin me-1.5 text-white text-sm'></i> :' Log In'} 
  </button>

   {errMsg? <div id="toast-danger" className="flex items-center w-full max-w-xs p-2 my-4 text-gray-500 bg-white rounded-lg shadow dark:text-white dark:bg-red-500" role="alert">
  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
    </svg>
    <span className="sr-only">Error icon</span>
  </div>
  <div className="ml-3 text-sm font-normal">  {errMsg}</div>
  <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-red-500 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
    <span className="sr-only">Close</span>
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
    </svg>
  </button>
</div>: null}
</form>




  </>
}
