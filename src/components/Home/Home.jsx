import React, { useContext, useState } from 'react'
import style from './Home.module.css'
import { counterContext } from '../../Context/counterContext'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../categorySlider/categorySlider'
import MainSlider from '../MainSlider/MainSlider'
import toast from 'react-hot-toast'
export default function Home() {
    const [counter, setcounter] = useState(0)
let x= useContext(counterContext)
console.log(x);

    //  useEffect(() => {
     
    //  }, [])
  return  <>
   

<div className='my-7'>
 <MainSlider/> 
  <CategorySlider/>
</div>
  <div className="container mt-6 w-full">
   
    <RecentProducts/>
  </div>
  </>
}
