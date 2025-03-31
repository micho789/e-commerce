import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function ForgetPassword(){

  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();


  async function handleForgotPassword(){
    setErrorMsg("");
    setSuccessMsg("");
  
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email })
      .then((response) => {
        setSuccessMsg(response.data.message)
        setStep(2);
      })
      .catch((err) => {
        setErrorMsg("Something went wrong.");
      });
  };
  

  async function handleVerifyCode(){
    setErrorMsg("");
    setSuccessMsg("");
  
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", { resetCode })
      .then((res) => {
        setSuccessMsg("Code verified. You can now reset your password.");
        setStep(3);
      })
      .catch((err) => {
        setErrorMsg("Invalid reset code.");
      });
  };
  
  async function handleResetPassword(){
    setErrorMsg("");
    setSuccessMsg("");

    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", { email, newPassword })
      .then((res) => {
        setSuccessMsg("Password has been reset successfully.");
        setStep(4);
      })
      .catch((err) => {
        setErrorMsg("Failed to reset password.");
        });
  };
  


  return (
    <div className='flex justify-center items-center'>
      <section className=" dark:bg-gray-900 w-full md:w-3/4 lg:w-1/2 bg-gray-50 p-3 ">
      {step === 1 && (
        <>
          <h1 className='text-3xl font-bold my-3 text-main'>Forget Password:</h1>
          {errorMsg && (<div className='bg-red-400 rounded-md my-2 p-3 text-center text-white'>{errorMsg}</div>)}
          {successMsg && (<div className='bg-main rounded-md my-2 p-3 text-center text-white'>{successMsg}</div>)}
            <div className='mb-5'>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-main dark:text-white">Your email</label>
              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-main  focus:ring-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" />
            </div>
            <div className="flex justify-between">
            <button className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => navigate("/login")}>Cancel</button>
            <button className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleForgotPassword}>Send Reset Code</button>
            </div>
        </>
      )}
      {step === 2 && (
        <>
          <h1 className='text-3xl font-bold my-3 text-main'>Verify Code:</h1>
            {errorMsg && (<div className='bg-red-400 rounded-md my-2 p-3 text-center text-white'>{errorMsg}</div>)}
            {successMsg && (<div className='bg-main rounded-md my-2 p-3 text-center text-white'>{successMsg}</div>)}
            <div className='mb-5'>
              <label htmlFor="text" className="block mb-2 text-sm font-medium text-main dark:text-white">Code</label>
              <input type="text" name="text" id="text" value={resetCode} onChange={(e) => setResetCode(e.target.value)} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-main  focus:ring-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter reset code" />
            </div>
            <div className="flex justify-end">
            <button className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleVerifyCode}>Verify</button>
            </div>
        </>
      )}
      {step === 3 && (
        <>
          <h1 className='text-3xl font-bold my-3 text-main'>Create New Password:</h1>
            {errorMsg && (<div className='bg-red-400 rounded-md my-2 p-3 text-center text-white'>{errorMsg}</div>)}
            {successMsg && (<div className='bg-main rounded-md my-2 p-3 text-center text-white'>{successMsg}</div>)}
            <div className='mb-5'>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-main dark:text-white">Your Password</label>
              <input type="password" name="password" id="password" onChange={(e) => setNewPassword(e.target.value)} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-main  focus:ring-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter new password" />
            </div>
            <div className="flex justify-end">
            <button className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleResetPassword}>Create</button>
            </div>
        </>
      )}
      {step === 4 &&(
        <p className="text-green-400 font-semibold text-center text-md lg:text-2xl sm:text-lg md:text-lg px-4">
        Password successfully changed. You can now{" "}
        <Link
          to="/login"
          className="text-green-400 font-bold underline hover:text-main"
        >
          login.
        </Link>
      </p>
        )}
      </section>
    </div>
  );
};
      