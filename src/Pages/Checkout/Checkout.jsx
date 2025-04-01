import { useFormik } from 'formik'
import React, { useContext, useEffect } from 'react'
import * as Yup from 'yup'
import { CartContext } from '../../Context/CartContext'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Checkout() {
    
    const {onlinePayment , cashOnDelivery, setCartId , setNumOfCartItems }= useContext(CartContext);
    const [paymentMethod , setPaymentMethod] = useState("cash")
    const navigate = useNavigate();
    const initialValues ={
        details: "",
        phone: "",
        city: ""
    }

    const validationSchema = Yup.object({
        details: Yup.string().required("Details is required"),
        phone: Yup.string().required("Phone Number is required"),
        city: Yup.string().required("City is required"),
    })


    async function handleSubmit(data){

      if(paymentMethod === "online"){
        let response = await onlinePayment({shippingAddress: data})
        if(response.status === 'success'){
            window.location.href=response.session.url
          }
      }else{
        let response = await cashOnDelivery({shippingAddress: data});
        if (response.data.status){
           setCartId(null);
           setNumOfCartItems(0);
           navigate('/allorders');
        }
      }
    }




    const formik = useFormik({
  initialValues,
  validationSchema,
  onSubmit:handleSubmit
})


useEffect(() => {
    document.title = "Checkout";
  }, []);

    
  return (
    <>

<div className='flex justify-center items-center  p-4'>
      <section className="dark:bg-gray-900 w-full md:w-3/4 lg:w-1/2 bg-gray-100 border  p-5 rounded-lg shadow-lg">
      <h1 className='text-3xl font-bold my-3 text-main'>Checkout:</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="details" className="block mb-2  text-sm font-semibold text-main dark:text-white">Your Details</label>
        <input onChange={formik.handleChange} type="text" name="details" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-green-500 focus:border-green-500" placeholder="Enter Your Details" value={formik.values.details} onBlur={formik.handleBlur}  />
        {formik.touched.details && formik.errors.details && (<small className='text-red-600'>{formik.errors.details}</small>)}
      </div>
      <div>
        <label htmlFor="phone" className="block mb-2 text-sm font-semibold text-main dark:text-white">Your Phone</label>
        <input onChange={formik.handleChange} type="tel" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-green-500 focus:border-green-500" placeholder="Enter Your Phone" value={formik.values.phone} onBlur={formik.handleBlur}  />
        {formik.touched.phone && formik.errors.phone && (<small className='text-red-600'>{formik.errors.phone}</small>)}
      </div>
      <div>
        <label htmlFor="city" className="block mb-2 text-sm font-semibold text-main dark:text-white">Your City</label>
        <input onChange={formik.handleChange} type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-green-500 focus:border-green-500" placeholder="Enter Your City" value={formik.values.city} onBlur={formik.handleBlur}  />
        {formik.touched.city && formik.errors.city && (<small className='text-red-600'>{formik.errors.city}</small>)}
      </div>
      <div>
      <label htmlFor="payment" className="block mb-2 text-sm font-semibold text-main dark:text-white">Choose your payment method</label>
      <select id="payment" name='payment' onChange={(e)=>{setPaymentMethod(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-green-500 focus:border-green-500 ">
        <option value="cash">Cash</option>
        <option value="online">Online</option>
      </select>
      </div>
      <button type="submit" className="text-white bg-main disabled:bg-green-300 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full transition duration-300">Pay</button>
      </form>
    </section>
    </div>
    </>
  )
}
