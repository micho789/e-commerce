
import axios from 'axios'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function ForgetPassword() {


  async function handleForgetPassword() {
    
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords").then((response) => console.log(response)).catch((err) => console.log(err));
  }

  useEffect(() => {
    handleForgetPassword()
  }, [])
  

  return (
    <>
    <Helmet>
        <title>ForgetPassword</title>
      </Helmet>
    <div className='flex justify-center items-center'>

<div className="w-full max-w-sm p-4 bg-white border border-gray-300 rounded-lg shadow-lg sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
  <form className="space-y-6" action="#">
    <h2 className="text-2xl font-bold text-main dark:text-white">Find Your Account</h2>
    <p>Please enter your email address to search for your account.</p>
    <div className='mb-5'>
        <label htmlFor="email" className="block mb-2 text-sm font-semibold text-main dark:text-white">Your email</label>
        <input  type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-main  focus:ring-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"  />
      </div>
    <button type="submit" className="text-white mt-1 w-full bg-main hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Search</button>
    <div className="text-sm font-medium text-gray-800 dark:text-gray-300">
      Not registered? <Link to={"/register"} className="text-green-400 font-bold hover:text-main">Create account</Link>
    </div>
  </form>
</div>
</div>
</>
  )
}
