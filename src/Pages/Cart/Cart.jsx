import styles from './Cart.module.css'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import Loader from './../../Components/Loader/Loader'
import { FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'


export default function Cart() {
  const {getLoggedUserCart , removeCartItem , updateProductQuantity ,clearCart , setCartId , setNumOfCartItems} = useContext(CartContext)
  const [cartData, setCartData] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  async function getData(){
    let data =  await getLoggedUserCart()
    setLoading(false)
    setCartData(data.data)
  }

  async function deleteProduct(id){
    let response =  await removeCartItem(id)
    setCartData(response.data)
    setNumOfCartItems(response.numOfCartItems)
    setCartId(response.cartId)
  }

  async function updateProduct(id , count){
    const data =  await updateProductQuantity(id , count)
    setCartData(data.data);
  }

  async function clearData(){
    await clearCart()
    setCartData([])
    setNumOfCartItems(0)
    setCartId(null)
    navigate('/')
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
      document.title = "Cart";
    }, []);

  return (
 <>
  {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : cartData && cartData.products?.length > 0 ? (
      <>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <h2 className="text-main font-bold text-2xl mb-2 md:mb-0">Shopping Cart:</h2>
          <h4 className="text-lg">
            <span className="font-semibold text-main">Total Price:</span> {cartData.totalCartPrice ? cartData.totalCartPrice : "0"} EGP
          </h4>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-main font-semibold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center">
                <th scope="col" className="px-4 py-3">Image</th>
                <th scope="col" className="px-4 py-3">Product</th>
                <th scope="col" className="px-4 py-3">Qty</th>
                <th scope="col" className="px-4 py-3">Price</th>
                <th scope="col" className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartData.products.map((product) => (
                <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
                  <td className="p-2 text-center">
                    <img src={product.product?.imageCover} className="w-12 md:w-24 max-w-full max-h-full" alt={product.product?.title} />
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">{product.product?.title}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center">
                      <button disabled={product.count === 1} onClick={() => updateProduct(product.product.id, product.count - 1)}
                        className="disabled:cursor-not-allowed p-1 h-6 w-6 text-gray-500 bg-white border rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button onClick={() => updateProduct(product.product.id, product.count + 1)}
                        className="p-1 h-6 w-6 text-gray-500 bg-white border rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">{product.price}</td>
                  <td className="px-4 py-4 text-center">
                    <button onClick={() => deleteProduct(product.product?.id)} className="text-2xl text-red-400 hover:text-red-600">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-4">
          <button onClick={() => navigate("/checkout")} disabled={cartData.products?.length === 0}
            className="bg-main disabled:bg-green-300 text-white hover:bg-green-800 w-full md:w-1/4 rounded p-3 font-bold mb-2 md:mb-0">
            CheckOut
          </button>
          <button onClick={() => clearData()} disabled={cartData.products?.length === 0}
            className="bg-main disabled:bg-green-300 text-white hover:bg-green-800 w-full md:w-1/4 rounded p-3 font-bold">
            Clear
          </button>
        </div>
      </>
    ): (
      <p className="text-main text-lg sm:text-xl md:text-2xl font-bold flex justify-center items-center h-24 sm:h-28 md:h-32 text-center px-4">
        Your cart is empty! Start shopping now and add some amazing products to your cart.
      </p>
    )}
</> 
  )
}
