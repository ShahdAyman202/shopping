import { createContext ,useState,useEffect } from "react";

export let UserContext= createContext(0)

export default function UserContextProvider(props){
const [userLogin, setuserLogin] = useState(null)


 useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setuserLogin(token);  
    }
  }, []);



return <UserContext.Provider value={{ userLogin, setuserLogin }}>
{props.children}
</UserContext.Provider>



}