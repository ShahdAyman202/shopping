import React, { useState ,useEffect} from 'react'
import Slider from 'react-slick';
import style from './MainSlider.module.css'
import img1 from '../../assets/images/img1.jpg'
import img2 from '../../assets/images/img2.jpg'
import img3 from '../../assets/images/img3.jpg'
import img4 from '../../assets/images/img4.jpg'
import img5 from '../../assets/images/img5.jpg'
export default function MainSlider() {
   const settings = {
    arrows: false,
   dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    cssEase: "linear",
     responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
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
    const [slider, setslider] = useState(0)

    useEffect(() => {
    
    }, [])
  return  <>
  <div className='flex flex-wrap'>
    <div className="w-3/4">
    <Slider {...settings}>
  <img src={img3} className='h-[400px] w-full object-contain' alt="" />
  <img src={img4} className='h-[400px] w-full object-contain' alt="" />
  <img src={img5} className='h-[400px] w-full object-contain' alt="" />
</Slider>

    </div>
    <div className="w-1/4">
    <img src={img1} className='w-full' alt=''/>
    <img src={img2} className='w-full' alt=''/>

    </div>
  </div>
  </>
}
