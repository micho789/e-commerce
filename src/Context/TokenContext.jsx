import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const tokenContext = createContext()

export default function TokenContextProvider({children}){
    const [token, setToken] = useState(false)
    const [userId, setUserId] = useState("second")

    useEffect(() => {
        verifyUserToken()
    }, [])
    

    async function verifyUserToken(){
        axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken",{
            headers:{
                token: localStorage.getItem("token")
            }
        }).then((res)=>{
            setToken(true)
            setUserId(res.data.decoded.id)
        }).catch((err)=> {
            localStorage.removeItem("token")
            setToken(false)
        })
    }



    return(
        <tokenContext.Provider value={{token ,setToken , userId }}>
            {children}
        </tokenContext.Provider>
    )
}