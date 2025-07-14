 import axios from "axios";
import { createContext ,useState,useEffect } from "react";
 
 export let CartContext= createContext(0)
 
 export default function CartContextProvider(props){
 const [cardId, setcardId] = useState(null)
 const [totalPrice, settotalPrice] = useState(0)
 const [numOfCartItem, setnumOfCartItem] = useState(0)
 const [products, setproducts] = useState(null)
 let token=localStorage.getItem('userToken')
   let headers= {
  token:  token ||''
}


function resetCart(params) {
  setcardId(null)
  setnumOfCartItem(0)
  setproducts(null)
  settotalPrice(0)
}
async function addToCart(prodId) {
  console.log('Adding to cart...', prodId);
  console.log('Token:', localStorage.getItem('userToken'));

  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    { productId: prodId },
    {
       headers
    }
  ).then((response) => {
    console.log('Add success:', response);
    getUserCart();
    return response;
  }).catch((error) => {
    console.log('❌ Add to cart error:', error?.response?.data);
    return error.response;
  });
}



 function getUserCart(params) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers
    }).then((response)=>{
        setcardId(response?.data?.cartId) 
    settotalPrice(response?.data?.data?.totalCartPrice)
   setproducts(response?.data?.data?.products)  
     setnumOfCartItem(response?.data?.numOfCartItems)
    return response;
    }).catch((error)=>{

    })
 }

function updateCart(prodId ,count) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,{
    count:count
  },{
    headers
  }).then((response)=>{
    setcardId(response?.data?.cartId) 
    settotalPrice(response?.data?.data?.totalCartPrice)
   setproducts(response?.data?.data?.products)  
     setnumOfCartItem(response?.data?.numOfCartItems)  
return response
  }).catch((error)=>{
return error
  })
}



function deleteCart(prodId ,count) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`, {
    headers
  }).then((response)=>{
    setcardId(response?.data?.cartId) 
    settotalPrice(response?.data?.data?.totalCartPrice)
   setproducts(response?.data?.data?.products)  
     setnumOfCartItem(response?.data?.numOfCartItems)  
return response
  }).catch((error)=>{
return error
  })
}

function deleteAllCart() {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers
  }).then((response) => {
    setcardId(null);         // 🧨 مهم تمسحي الـ cartId
    settotalPrice(0);
    setproducts([]);         // 🧨 تفضي المنتجات
    setnumOfCartItem(0);
    return response;
  }).catch((error) => {
    return error;
  });
}


  useEffect(() => {
     if(token){
        getUserCart()
     }
   }, [token]);
 
 
 
 return  <CartContext.Provider value={{addToCart,numOfCartItem,totalPrice,cardId,products,updateCart,deleteCart,deleteAllCart,getUserCart,resetCart}}>
             {props.children}
 </CartContext.Provider>
 
 
 
 }