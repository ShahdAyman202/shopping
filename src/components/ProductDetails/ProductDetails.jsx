import React, { useState ,useEffect} from 'react'
import style from './ProductDetails.module.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import Slider from "react-slick";

export default function ProductDetails() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows:false
  };
    const [productDetails, setproductDetails] = useState(null)
    const [relatedProduct, setrelatedProduct] = useState(null)
let {id,category}=useParams()
function getProductDetails( ) {
  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(({data})=>{
    console.log(data?.data);
    
setproductDetails(data?.data)
  }).catch((error)=>{

  })
}

function getAllProducts( ) {
  axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then(({data})=>{console.log(data.data);
   let related=data?.data.filter((prod)=>{return prod.category.name === category}) 
   setrelatedProduct(related)
  }).catch((error)=>{
console.log('error');

  })
}
  
    useEffect(() => {
    getProductDetails()
    getAllProducts()
    }, [id])
  return  <>

 
{productDetails? <div className='flex flex-col items-center mx-auto mt-8  md:flex-row md:max-w-7xl hover:bg-gray-100 bg-zinc-50 border border-gray-200 rounded-lg shadow-sm'>
   <div className='w-full md:w-2/4'>
    <Slider {...settings}>
      {productDetails?.images.map((src)=>{ return  <img className=" w-full object-contain   rounded-t-lg h-96   md:w-100 md:rounded-none md:rounded-s-lg" src= {src} alt={productDetails?.title} />


      })}
    </Slider>

     </div>
  <div className="flex flex-col justify-between p-4 leading-normal w-2/4">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900  ">{productDetails?.title} </h5>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{productDetails?.description} </p>
       <div className='flex my-4'>
    <span className='text-pink-700'>{productDetails?.category.name}</span>
    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3 ">{productDetails?.ratingsAverage}</span>

   </div>
   <span className="text-3xl font-bold text-gray-900 mb-3 ">{productDetails?.price}$</span>
   <a   className="bg-blue-950 hover:bg-pink-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Add To Cart</a>
 
  </div>
</div>
:<Spinner/>}

<div className="relative z-0 w-full my-15 text-center font-bold">
    <h2 className="py-2.5 font-extrabold mb-5 md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-t to-blue-900 from-pink-400">
      Related Product
    </h2>
  </div>
<div className=" flex flex-wrap gap-x-4 gap-y-6 ">
  {relatedProduct?.map((prod)=>{return <div key={prod.id} className="w-full sm:w-full md:basis-[32%] md:max-w-[32%] lg:basis-[23%] lg:max-w-[23%] ">
 <div className="product bg-zinc-50 border border-gray-200 rounded-lg shadow-sm h-full">
   <Link to={ `/productdetails/${prod.id}/${prod.category.name}`}>
   <a href="#">
    <img className="p-4 rounded-t-lg" src= {prod.imageCover} alt={prod.title} />
  </a>
   </Link>
  <div className="px-5 pb-5">
    <a href="#">
       <span className='text-pink-700'>{prod.category.name}</span>
      <h5 className="text-xl font-semibold tracking-tight text-gray-900  ">{prod.title.split(' ').slice(0,2).join(' ')}</h5>
    </a>
    <div className="flex items-center mt-2.5 mb-5">
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      </div>
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">{prod.ratingsAverage}</span>
    </div>
   <div className="flex  gap-y-2 flex-col">
      <span className="text-3xl font-bold text-gray-900  ">{prod.price}$</span>
      <a href="#" className="bg-blue-950 hover:bg-pink-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Add To Cart</a>
    </div>
  </div>
 
   
   
 </div>
</div>
  

  })}



  </div> 

  </>
}
