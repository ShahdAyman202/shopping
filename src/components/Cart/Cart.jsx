import React, { useState ,useEffect,useContext} from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import toast from 'react-hot-toast';
export default function Cart() {
  const [counter, setcounter] = useState(0)
  const navigate = useNavigate();
    
const { getUserCart,totalPrice,numOfCartItem,products,updateCart,deleteCart,deleteAllCart } = useContext(CartContext) 
    // useEffect(() => {
    
    // }, [])
function handleCheckout() {
  if (numOfCartItem === 0) {
    toast.error("Cart is empty ‼️");
    return;
  }
  navigate('/checkout');
}
async function handleUpdate(prodId ,count) {
 let response=await updateCart(prodId ,count)
 if (response.data.status=== 'success') {
  toast.success('Product updated ✔')
 await getUserCart()
 }else{
  toast.error('ERROR...')
 }
}
async function handleDelete(prodId  ) {
 let response=await deleteCart(prodId )
 if (response.data.status=== 'success') {
  toast.success('Product Deleted ❌')
 }else{
  toast.error('ERROR...')
 }
}
const [isClearing, setIsClearing] = useState(false);

async function handleClearCart() {
  const confirmed = window.confirm("Are you sure you want to clear your cart?");
  
  if (confirmed) {
    setIsClearing(true);

    const response = await deleteAllCart(); // استدعاء المسح

    if (response?.status === 200) {
      toast.success("Cart cleared ✔");

       navigate('/')
    } else {
      toast.error("Something went wrong ❌");
    }

    setIsClearing(false);
  }
  
}

useEffect(() => {
  getUserCart();
}, []);


  return  <>
  <section className="w-full bg-zinc-50 border border-gray-200 rounded-lg shadow-sm   py-9 px-8">
  <h1 className="text-center text-blue-950    text-[32px] font-bold leading-[38px]">
    My Shopping Cart
  </h1>
 {isClearing ? (
  <Spinner />
) : (
  <>
   {products ?  <div className="flex items-start mt-8 gap-6 flex-col md:flex-row">
    <div className="bg-white p-4 w-full md:w-3/4 rounded-xl">
      <table className="w-full bg-white rounded-xl">
        <thead>
          <tr className="text-center border-b border-gray-400 w-full text-[#7f7f7f] text-sm font-medium uppercase leading-[14px] tracking-wide">
            <th className="text-left px-2 py-2">Product</th>
            <th className="px-2 py-2">price</th>
            <th className="px-2 py-2">Quantity</th>
            <th className="px-2 py-2">Subtotal</th>
            <th className="w-7 px-2 py-2" />
          </tr>
        </thead>
        <tbody>
         {products?.map((prod)=>{return  <tr key={prod?.product?._id} className="text-center">
            <td className="px-2 py-2 text-left align-top">
              <img src= {prod.product.imageCover} alt="test" className="w-[100px] mr-2 inline-block h-[100px]" /><span>{prod.product.title}</span>
            </td>
            <td className="px-2 py-2">${prod?.price}</td>
           <td className="px-2 py-2 align-middle">
                 <div className="bg-white rounded-[170px] border border-[#a0a0a0] flex justify-center items-center gap-2 w-fit mx-auto px-1.5 py-1">
    <svg width={14} height={15} className="cursor-pointer" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{handleUpdate(prod?.product?._id,prod?.count-1)}}>
      <path d="M2.33398 7.5H11.6673" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

    <span className="w-10 text-center text-[#191919] text-base font-normal leading-normal">
      {prod?.count}
    </span>

    <svg className="cursor-pointer relative" width={14} height={15} viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{handleUpdate(prod?.product?._id,prod?.count+1)}}>
      <path d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666V2.83331Z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
                       </div>
                   </td>
  

            <td className="px-2 py-2"> ${prod?.price * prod?.count}</td>
            <td className="px-2 py-2">
              <svg width={24} className="cursor-pointer" height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{handleDelete(prod?.product?._id)}}>
                <path d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z" stroke="#CCCCCC" strokeMiterlimit={10} />
                <path d="M16 8.5L8 16.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 16.5L8 8.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </td>
          </tr>

         })}
          
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-400">
            <td className="px-2 py-2" colSpan={3}>
              <button className="px-8 cursor-pointer py-3.5 bg-[#f2f2f2] rounded-[43px] text-[#4c4c4c] text-sm font-semibold className leading-[16px] hover:bg-blue-900 hover:text-white" onClick={() => navigate('/')}>
                Return to shop
              </button>
            </td>
            <td className="px-2 py-2" colSpan={2}>
              <button className="px-8 py-3.5 cursor-pointer bg-[#f2f2f2] rounded-[43px] text-[#4c4c4c] text-sm font-semibold  className leading-[16px] hover:bg-blue-900 hover:text-white" onClick={handleClearCart } > 
                  Clear Cart
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div className="w-[424px] bg-white rounded-lg p-6">
      <h2 className="text-blue-900 font-bold mb-2 text-xl   leading-[30px]">
        Cart Total
      </h2>
      <div className="w-[376px] py-3 justify-between items-center flex">
        <span className="text-[#4c4c4c] text-base font-normal leading-normal">Total:</span><span className="text-[#191919] text-base font-semibold leading-tight">${totalPrice}</span>
      </div>
      <div className="w-[376px] py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex">
        <span className="text-pink-600  text-sm font-normal leading-[21px]">Num Of Cart Item:</span><span className="text-pink-600  font-bold text-xl">{numOfCartItem}</span>
      </div>
       
      <button onClick={handleCheckout} className="w-[376px]   mt-5 px-10 py-4 bg-blue-950 hover:bg-pink-500 text-white rounded-[44px] gap-4 text-base font-semibold leading-tight">
        Proceed to checkout
      </button>
    </div>
  </div>:<Spinner/>}
  </>
)}

  
</section>

  </>
}
