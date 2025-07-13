import React, { createContext, useState } from "react";


 export let counterContext= createContext(0)

 export default function CounterContextProvider(props) {
const [counter, setcounter] = useState(0)    
const [user, setuser] = useState('ahmed')





    return <counterContext.Provider value={{counter,setcounter,user}}> 
{props.children}
    </counterContext.Provider>
 }
  