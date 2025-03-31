import { Link, useNavigate } from 'react-router-dom'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LuLoader } from 'react-icons/lu';

export default function Register() {
  const [errorMsg , setErrorMsg] = useState(null);
  const [isLoading , setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues ={
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
  }

 async function handleRegister(data){
    console.log(data);
    setIsLoading(true);
    
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , data).then((response) => {
      console.log(response);
      setErrorMsg(null);
      setIsLoading(false);
      navigate("/login")
    }).catch((error) => {
      setErrorMsg(error.response.data.message);
      setIsLoading(false);
    })
  }

  function validateData(data){

    let errors = {};
    const nameRegex = /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const phoneRegex = /^01[0-2,5][0-9]{8}$/

    if(data.name === ""){
      errors.name = "Name is required";
    }else if(!nameRegex.test(data.name)){
      errors.name = "Name must start with capital letter";
    }

    if(data.email === ""){
      errors.email = "Email is required";
    }else if(!emailRegex.test(data.email)){
      errors.email = "Email is not valid";
    }

    if(data.password === ""){
      errors.password = "Password is required";
    }else if(!passwordRegex.test(data.password)){
      errors.password = "Password is not valid";
    }

    if(data.rePassword === ""){
      errors.rePassword = "rePassword is required";
    }else if(data.rePassword !== data.password){
      errors.rePassword = "rePassword does not match Password";
    }

    if(data.phone === ""){
      errors.phone = "Phone is required";
    }else if(!phoneRegex.test(data.phone)){
      errors.phone = "Phone is not valid";
    }

    return errors
  }

const formik = useFormik({
  initialValues,
  validate: validateData,
  onSubmit:handleRegister
})


  useEffect(() => {
        document.title = "Register";
      }, []);


  return (
    <>
    <div className='flex justify-center items-center'>
      <section className=" dark:bg-gray-900 w-full md:w-3/4 lg:w-1/2 bg-gray-50 p-3 ">
      <h1 className='text-3xl font-bold my-3 text-main'>Register Now:</h1>
      {errorMsg && ( <div className='bg-red-400 rounded-md my-2 p-3 text-center text-white'>{errorMsg}</div> )}
      <form onSubmit={formik.handleSubmit}>
      <div className='mb-5'>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-main dark:text-white">Your name</label>
        <input onChange={formik.handleChange} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-main  focus:ring-main  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Your Name" value={formik.values.name} onBlur={formik.handleBlur}  />
        {formik.touched.name && formik.errors.name && (<small className='text-red-600'>{formik.errors.name}</small>)}
      </div>
      <div className='mb-5'>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-main dark:text-white">Your email</label>
        <input onChange={formik.handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-main  focus:ring-main  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" value={formik.values.email} onBlur={formik.handleBlur}  />
        {formik.touched.email && formik.errors.email && (<small className='text-red-600'>{formik.errors.email}</small>)}
      </div>
      <div className='mb-5'>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-main dark:text-white">Your password</label>
        <input onChange={formik.handleChange} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-main  focus:ring-main  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Password" value={formik.values.password}  onBlur={formik.handleBlur} />
        {formik.touched.password && formik.errors.password && (<small className='text-red-600'>{formik.errors.password}</small>)}
      </div>
      <div className='mb-5'>
        <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-main dark:text-white">Your rePassword</label>
        <input onChange={formik.handleChange} type="password" name="rePassword" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-main  focus:ring-main  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your rePassword" value={formik.values.rePassword} onBlur={formik.handleBlur}  />
        {formik.touched.rePassword && formik.errors.rePassword && (<small className='text-red-600'>{formik.errors.rePassword}</small>)}
      </div>
      <div className='mb-5'>
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-main dark:text-white">Your phone</label>
        <input onChange={formik.handleChange} type="tel" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-main  focus:ring-main  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Phone" value={formik.values.phone}  onBlur={formik.handleBlur} />
        {formik.touched.phone && formik.errors.phone && (<small className='text-red-600'>{formik.errors.phone}</small>)}
      </div>
      {isLoading? (
        <button disabled className="text-white bg-main hover:bg-green-800 focus:ring-4  focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none " ><LuLoader /></button>
      ): (
        <button type="submit" className="text-white bg-main disabled:bg-green-300 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   focus:outline-none " disabled={!formik.isValid} >Register</button>
      )}
      <small>Already have account <Link to={'/login'} className='text-main hover:text-green-800 font-bold' >Login</Link></small>

      </form>
    </section>
    </div>
</>
  )
}
