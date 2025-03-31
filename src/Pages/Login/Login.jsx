import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { LuLoader } from 'react-icons/lu';
import { tokenContext } from '../../Context/TokenContext';

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(tokenContext)

  const initialValues = {
    email: "",
    password: "",
  }

  async function handleLogin(data) {
    console.log(data);
    setIsLoading(true);

    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", data).then((response) => {
      console.log(response);
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setErrorMsg(null);
      setIsLoading(false);
      navigate("/")
    }).catch((error) => {
      setErrorMsg(error.response.data.message);
      setIsLoading(false);
    })
  }

  function validateData(data) {
    let errors = {};
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

    if (data.email === "") {
      errors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Email is not valid";
    }

    if (data.password === "") {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      errors.password = "Password is not valid";
    }

    return errors
  }

  const formik = useFormik({
    initialValues,
    validate: validateData,
    onSubmit: handleLogin
  })

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      <div className='flex justify-center items-center'>
        <section className=" dark:bg-gray-900 w-full md:w-3/4 lg:w-1/2 bg-gray-50 p-3 ">
          <h1 className='text-3xl font-bold my-3 text-main'>Login Now:</h1>
          {errorMsg && (<div className='bg-red-400 rounded-md my-2 p-3 text-center text-white'>{errorMsg}</div>)}
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-5'>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-main dark:text-white">Your email</label>
              <input onChange={formik.handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-main  focus:ring-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" value={formik.values.email} onBlur={formik.handleBlur} />
              {formik.touched.email && formik.errors.email && (<small className='text-red-600'>{formik.errors.email}</small>)}
            </div>
            <div className='mb-5'>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-main dark:text-white">Your password</label>
              <input onChange={formik.handleChange} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-main  focus:ring-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Password" value={formik.values.password} onBlur={formik.handleBlur} />
              {formik.touched.password && formik.errors.password && (<small className='text-red-600'>{formik.errors.password}</small>)}
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
              <small>
                Create new Account{" "}
                <Link
                  to="/register"
                  className="text-green-400 font-bold hover:text-main"
                >
                  Register
                </Link>
              </small>
              <small>
                <Link
                  to="/forgetPassword"
                  className="text-green-400 font-bold hover:text-main"
                >
                  Forget a Password?
                </Link>
              </small>
            </div>
            {isLoading ? (
              <button disabled className="text-white mt-1 bg-main hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" ><LuLoader /></button>
            ) : (
              <button type="submit" className="text-white mt-1 bg-main disabled:bg-green-300 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" disabled={!formik.isValid} >Login</button>
            )}
          </form>
        </section>
      </div>
    </>
  )
}
