import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const CartContext = createContext()


export default function CartContextProvider({ children }) {
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [cartId, setCartId] = useState(null)

    const headers = {
        token: localStorage.getItem("token"),
    }
    
    function addToCart(id) {
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            productId: id
        }, {
            headers,
        }
        ).then((response) => response.data).catch((err) => err);
    }
    
    function getLoggedUserCart() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers, }).then((response) => response.data).catch((err) => err);
    }
    
    function removeCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers, }).then((response) => response.data).catch((err) => err);
    }
    
    function updateProductQuantity(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count: count,
            }, { headers, }).then((response) => response.data).catch((err) => err);
    }
    
    function clearCart() {
        return axios.delete("https://ecommerce.routemisr.com/api/v1/cart", { headers, }).then((response) => response.data).catch((err) => err);
    }
    
    async function getData(){
        let response =  await getLoggedUserCart();
        setNumOfCartItems(response.numOfCartItems)
        setCartId(response.cartId)
    }
    
    useEffect(() => {
      getData();
    }, [])


    function cashOnDelivery(data){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , data , {headers}).then((response) => response).catch((err) => err);
    }

    function onlinePayment(data){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
            data,{
                params:{
                    url:"http://localhost:5173",
                },
                headers,
            }
        ).then((response) => response.data).catch((err) => err);
    }
    

    return <CartContext.Provider value={{ addToCart, getLoggedUserCart, removeCartItem, updateProductQuantity, clearCart , numOfCartItems , cartId , setCartId , setNumOfCartItems , cashOnDelivery , onlinePayment }}>{children}</CartContext.Provider>
}