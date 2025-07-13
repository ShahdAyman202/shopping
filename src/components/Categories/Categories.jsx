import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
export default function Categories() {
    const [category, setcategory] = useState(null)
function getCategory( ) {
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then(({data})=>{
setcategory(data?.data)
  }).catch((error)=>{

  })
}
    useEffect(() => {
    getCategory()
    }, [])
  return (
 <div className="flex flex-wrap gap-4 justify-center my-7">
  {category?.map((cate) => (
    <div
      key={cate._id}
      className="relative w-64 h-64 group rounded-full overflow-hidden transition-all duration-300 shadow-md  hover:shadow-pink-400"
    >
      <img
        src={cate?.image}
        alt={cate?.title}
        className="w-full h-full object-cover rounded-full"
      />

      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-blue-950 text-lg font-bold scale-0 group-hover:scale-100 transition-transform duration-300">
          {cate?.name}
        </p>
      </div>
    </div>
  ))}
</div>



  );
}