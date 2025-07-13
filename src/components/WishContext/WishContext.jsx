//  import axios from "axios";
// import { createContext ,useState,useEffect } from "react";
 
//  export let WishContext= createContext(0)
 
//  export default function  WishContextProvider(props){
//  const [productId, setproductId] = useState(null)
  
//  const [products, setproducts] = useState(null)
//  let token=localStorage.getItem('userToken')
//  let headers ={
//           token:localStorage.getItem('userToken')
//         }
// function resetCart(params) {
//   setproductId(null)
//   setnumOfCartItem(0)
//   setproducts(null)
//   settotalPrice(0)
// }
//   async function addToWishList(prodId) {
//   return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
//     productId: prodId
//   }, {
//     headers
//   }).then((response) => {
//      getUserWishList()
//      return response
//   }).catch((error) => {
//     console.log(error);
//     return error.response; // ممكن ترجعي الخطأ كمان للتعامل معاه
//   });
// }

//  function getUserWishList(params) {
//     axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
//         headers
//     }).then((response)=>{
//   //       setcardId(response?.data?.cartId) 
//   //   settotalPrice(response?.data?.data?.totalCartPrice)
//   //  setproducts(response?.data?.data?.products)  
//   //    setnumOfCartItem(response?.data?.numOfCartItems)
//   console.log('wishlist:',response);
  
//     return response;
//     }).catch((error)=>{

//     })
//  }

// // function updateCart(prodId ,count) {
// //   return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,{
// //     count:count
// //   },{
// //     headers
// //   }).then((response)=>{
// //     setcardId(response?.data?.cartId) 
// //     settotalPrice(response?.data?.data?.totalCartPrice)
// //    setproducts(response?.data?.data?.products)  
// //      setnumOfCartItem(response?.data?.numOfCartItems)  
// // return response
// //   }).catch((error)=>{
// // return error
// //   })
// // }



// function deleteWishList(prodId ,count) {
//   return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`, {
//     headers
//   }).then((response)=>{
//   //   setcardId(response?.data?.cartId) 
//   //   settotalPrice(response?.data?.data?.totalCartPrice)
//   //  setproducts(response?.data?.data?.products)  
//   //    setnumOfCartItem(response?.data?.numOfCartItems)  
// return response
//   }).catch((error)=>{
// return error
//   })
// }

// function deleteAllCart() {
//   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
//     headers
//   }).then((response) => {
//     setcardId(null);         // 🧨 مهم تمسحي الـ cartId
//     settotalPrice(0);
//     setproducts([]);         // 🧨 تفضي المنتجات
//     setnumOfCartItem(0);
//     return response;
//   }).catch((error) => {
//     return error;
//   });
// }


//   useEffect(() => {
//      if(token){
//         getUserCart()
//      }
//    }, [token]);
 
 
 
//  return <WishContext.Provider  value={{cardId,addToWishList,getUserWishList,products}} > 
//   {props.children}
//  </WishContext.Provider>
// //   <CartContext.Provider value={{addToCart,numOfCartItem,totalPrice,cardId,products,updateCart,deleteCart,deleteAllCart,getUserCart,resetCart}}>
// //              {props.children}
// //  </CartContext.Provider>
 
 
 
//  }





import axios from "axios";
import { createContext, useState, useEffect } from "react";

 
export let WishContext = createContext(0);

export default function WishContextProvider(props) {
  const [products, setProducts] = useState(null);
  const token = localStorage.getItem("userToken");

  const headers = {
    token: token
  };

   
  async function addToWishList(prodId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: prodId },
        { headers }
      )
      .then((response) => {
        getUserWishList();   
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  }
 
  function getUserWishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((response) => {
        setProducts(response?.data?.data);  
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // حذف منتج من قائمة المفضلة
  function deleteWishList(prodId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`, {
        headers
      })
      .then((response) => {
        getUserWishList();  
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

   
  useEffect(() => {
    if (token) {
      getUserWishList();
    }
  }, [token]);

   
  return (
    <WishContext.Provider
      value={{ addToWishList, getUserWishList, deleteWishList, products }}
    >
      {props.children}
    </WishContext.Provider>
  );
}
