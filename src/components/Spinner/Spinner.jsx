import React, { useState ,useEffect} from 'react'
import {Hearts} from 'react-loader-spinner'
import style from './Spinner.module.css'
export default function Spinner() {
    const [counter, setcounter] = useState(0)

    useEffect(() => {
    
    }, [])
  return  <>
<div className='h-screen flex justify-center items-center'> 
  <Hearts
  height="80"
  width="80"
  color="#1B3C53"
  ariaLabel="hearts-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />

</div>

  </>
}
