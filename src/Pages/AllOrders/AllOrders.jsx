import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';

export default function AllOrders() {


 async function getAllOrders(){
   await axios.get("https://ecommerce.routemisr.com/api/v1/orders/").then((response)=>{
    console.log(response);
  }).catch((err)=>{
    console.log(err);
  })
  }

useEffect(() => {
  getAllOrders()
}, [])



  return (
    <div>AllOrders</div>
  )
}
