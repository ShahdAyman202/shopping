import React, { useState } from 'react'
import style from './ProtectRoute.module.css'
import { Navigate } from 'react-router-dom'
 
export default function ProtectRoute(props) {
    const [counter, setcounter] = useState(0)
if(localStorage.getItem('userToken') !== null){
  return props.children
}else{
  return <Navigate to={'/login'}/>
}
    // useEffect(() => {
    
    // }, [])
   
}
