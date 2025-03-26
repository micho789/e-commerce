import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { WishlistContext } from '../../Context/WishlistContext'
import Loader from '../../Components/Loader/Loader'
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa6'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'



export default function WishList() {
    
    const {getLoggedUserWishlist , removeWishlistItem , setCount} = useContext(WishlistContext)
    const {addToCart , setCartId , setNumOfCartItems} = useContext(CartContext)
    const [wishListData, setWishListData ] = useState(0)

    async function getData(){
      let data =  await getLoggedUserWishlist()
      setWishListData(data.data)
      console.log(data.data)
    }
  
    async function deleteProduct(id){
      let response =  await removeWishlistItem(id)
      // setWishListData(response.data)
      setCount(response.count)
      console.log(response)
      getData()
    }

    async function addProduct(id){
      let response = await addToCart(id);
      if (response.status === 'success'){
        setNumOfCartItems(response.numOfCartItems)
        setCartId(response.cartId)
        toast.success(response.message)
      }else{
        toast.error('failed to add to cart')
      }
    }

    useEffect(() => {
        getData()
      }, [])

  return (
    <>
      <div>
        <Helmet>
          <title>Wishlist</title>
        </Helmet>
        {wishListData.length > 0 ? (
         wishListData.map((item) => (
    <div key={item.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <Link>
                      <img className="rounded-t-lg" src={item.imageCover} alt={item.category?.name} />
                      <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title?.split(" ").slice(0, 3).join(" ")}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description?.split(" ").slice(0, 3).join(" ")}</p>
                        <small className='font-bold mb-1 text-main'>{item.category?.name}</small>
                        <div className='flex justify-between my-4'>
                          <p>{item.price}EGP</p>
                          <div className='flex items-center'>
                            <FaStar className='text-yellow-300 mx-1' />
                            {item.ratingsAverage}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className='flex flex-col sm:flex-row gap-2 w-full'>
                      <button
                        onClick={() => deleteProduct(item.id)}
                        className='w-full sm:w-auto flex-1 bg-red-600 text-center p-2 hover:bg-red-900 text-white rounded-md'>
                        Remove
                      </button>
                      <button
                        onClick={() => addProduct(item.id)}
                        className='w-full sm:w-auto flex-1 bg-main text-center p-2 hover:bg-green-700 text-white rounded-md'>
                        Add To Cart
                      </button>
                    </div>
    </div>
  ))
) : (
  // <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
  <Loader />
)}
      </div>
    </>


  )
}

        {/* {wishListData ? (
          <>
            <h2 className='text-4xl text-main mb-2 font-black'>WISHLIST:</h2>
            {wishListData.length > 0 ?
              wishListData.map((item) =>
                  <div key={item.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700" >
                    <Link>
                      <img className="rounded-t-lg" src={item.imageCover} alt={item.category?.name} />
                      <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title?.split(" ").slice(0, 3).join(" ")}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description?.split(" ").slice(0, 3).join(" ")}</p>
                        <small className='font-bold mb-1 text-main'>{item.category?.name}</small>
                        <div className='flex justify-between my-4'>
                          <p>{item.price}EGP</p>
                          <div className='flex items-center'>
                            <FaStar className='text-yellow-300 mx-1' />
                            {item.ratingsAverage}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className='flex flex-col sm:flex-row gap-2 w-full'>
                      <button
                        onClick={() => deleteProduct(item.id)}
                        className='w-full sm:w-auto flex-1 bg-red-600 text-center p-2 hover:bg-red-900 text-white rounded-md'>
                        Remove
                      </button>
                      <button
                        onClick={() => addProduct(item.id)}
                        className='w-full sm:w-auto flex-1 bg-main text-center p-2 hover:bg-green-700 text-white rounded-md'>
                        Add To Cart
                      </button>
                    </div>
                  </div>

              ) : <Loader />
            }
          </>
        ) : <Loader />} */}
        
