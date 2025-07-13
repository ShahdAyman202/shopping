import React, { useState ,useEffect, useContext} from 'react'
import style from './CheckOut.module.css'
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
export default function CheckOut() {
    const [isOnline, setisOnline] = useState(true)
let {cardId,resetCart ,getUserCart}= useContext(CartContext)
function payCash(val ) {
  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cardId}`,{
    shippingAddress:val
  },{
    headers:{
      token:localStorage.getItem('userToken')
    }
  }).then((response)=>{
if (response.data.status === 'success') {
  toast.success('Check out done ✔')
  resetCart()
   getUserCart();
}
  }).catch((error)=>{
toast.error('error ‼')
  })
}


function payOnline(val) {
  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:5173/`,{
    shippingAddress:val
  },{
    headers:{
      token:localStorage.getItem('userToken')
    }
  }).then((response)=>{
if (response?.data?.status === 'success') {
      
      window.location.href = response?.data?.session?.url;
    }
  }).catch((error)=>{

  })
}

function detectCash(val) {
  if (isOnline) {
    payOnline(val)
  }else{
    payCash(val)
  }
}

let formik= useFormik({
  initialValues:{
    
    details:"",
    phone:"",
    city:""
    
  } 
  ,
  onSubmit: detectCash
 
 })
    useEffect(() => {
    
    }, [])
  return  <>
  {/* Payment Section */}
<section className="bg-gray-100 py-20 px-6 ">
  <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden   ">
    {/* Checkout Form */}
    <div className="p-8 ">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Payment Details</h2>
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
         <div>
          <label className="block mb-1 text-sm text-gray-600" htmlFor='details'>Details</label>
          <input type="text" placeholder="Details" value={formik.values.details}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}  name="details"
      id="details" className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
         <div>
          <label className="block mb-1 text-sm text-gray-600" htmlFor='phone'>Phone</label>
          <input type="tel" placeholder="phone" value={formik.values.phone}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}  name="phone"
      id="phone" className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
         <div>
          <label className="block mb-1 text-sm text-gray-600" htmlFor='city'>City</label>
          <input type="text" placeholder="City" value={formik.values.city}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}  name="city"
      id="city" className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
         
        <button
  type="button"
  onClick={() => {
    setisOnline(false);
    formik.submitForm();  
  }}
  className="w-full mt-4 bg-green-600 hover:bg-green-800 text-white text-lg py-3 rounded-lg transition"
>
  Pay Cash
</button>

<button
  type="button"
  onClick={() => {
    setisOnline(true);
    formik.submitForm();
  }}
  className="w-full mt-4 bg-blue-800 hover:bg-blue-950 text-white text-lg py-3 rounded-lg transition"
>
  Pay Online
</button>
   </form>
    </div>
    
  </div>
</section>

  </>
}
