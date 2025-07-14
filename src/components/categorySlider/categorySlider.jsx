import React, { useState ,useEffect} from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'
import Slider from 'react-slick';

export default function CategorySlider() {
   const settings = {
    arrows: false,
   dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 1000,
    cssEase: "linear",
     responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
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
  return  <>
  <div className="relative z-0 w-full my-6   font-bold">
    <h2 className="py-2.5 font-extrabold mb-5 w-5xl text-transparent bg-clip-text bg-gradient-to-t to-blue-900 from-pink-400">
       Shop Popular Categories
    </h2>
  </div>
  <Slider {...settings}>
    {category?.map((cate)=>{return <img key={cate.id} src={cate?.image} className='h-[250px] md:h-[150px] ' alt={cate?.name} />})}
  </Slider>
  </>
}
