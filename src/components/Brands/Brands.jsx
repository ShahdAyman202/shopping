import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
export default function Brands() {
    const [brand, setbrand] = useState(null)
function getBrands( ) {
  axios.get(`https://ecommerce.routemisr.com/api/v1/brands`).then(({data})=>{
setbrand(data?.data)
console.log(data?.dat);

  }).catch((error)=>{

  })
}
    useEffect(() => {
    getBrands()
    }, [])
  return  <>
  <h1 className="text-center text-blue-950 mt-6 text-3xl font-bold">
        ALL BRANDS 
      </h1>
<div className="flex flex-wrap gap-4 justify-center ">
  
  {brand?.map((bra) => (
    <article
      key={bra._id}
      className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-70 mx-auto mt-15"
    >
      <img
        src={bra.image}
        alt={bra.name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-700 via-gray-900/40" />
      <h3 className="z-10 mt-3 text-3xl font-bold text-white scale-0 group-hover:scale-100 transition-transform duration-300">
        {bra.name}
      </h3>
    </article>
  ))}
</div>

  
  </>
}