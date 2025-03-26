import axios from 'axios';
import { createContext, useEffect, useState} from 'react'

export const WishlistContext = createContext()


export default function WishlistContextProvider({ children }) {

    const [count, setCount] = useState(0)

    const headers = {
        token: localStorage.getItem("token"),
    }

    function addToWishlist(id) {
    return  axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
        {
            productId : id,
        },
        {
            headers,
        }
        ).then((response) => response.data)
        .catch((err) => err)
    }

    function getLoggedUserWishlist() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
             { headers, }
        ).then((response) => response.data)
        .catch((err) => err)
    }

    function removeWishlistItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
             { headers, }
            ).then((response) => response.data)
            .catch((err) => err)
    }


    async function getData(){
            let response =  await getLoggedUserWishlist();
            setCount(response.count)
        }
        
        useEffect(() => {
          getData();
        }, [])

  return <WishlistContext.Provider value={{addToWishlist , getLoggedUserWishlist , removeWishlistItem , count , setCount }}>{children}</WishlistContext.Provider>
}


