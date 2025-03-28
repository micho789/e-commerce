import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { WishlistContext } from '../../Context/WishlistContext'
import { Link } from 'react-router-dom'
import { FaCartPlus, FaStar } from 'react-icons/fa6'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { FaRegTrashAlt } from 'react-icons/fa'



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
      localStorage.setItem(`liked-${id}`, false);
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
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <div className="container mx-auto px-4 py-6">
        {wishListData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishListData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
              >
                <Link to={`/productDetails/${item.id}`}>
                  <img
                    className="w-full h-48 object-cover"
                    src={item.imageCover}
                    alt={item.category?.name}
                  />
                  <div className="p-4">
                    <h5 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                      {item.title?.split(' ').slice(0, 3).join(' ')}
                    </h5>
                    <p className="text-gray-700 dark:text-gray-400 truncate">
                      {item.description?.split(' ').slice(0, 3).join(' ')}
                    </p>
                    <small className="font-bold text-main block mt-1">
                      {item.category?.name}
                    </small>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-lg font-semibold">{item.price} EGP</p>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-300 mr-1" />
                        {item.ratingsAverage}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="flex flex-col sm:flex-row gap-2 p-4">
                  <button
                    onClick={() => deleteProduct(item.id)}
                    className="w-full sm:w-auto flex-1 bg-red-600 text-center p-2 hover:bg-red-900 text-white rounded-md flex items-center justify-center"
                  >
                    <FaRegTrashAlt className="text-2xl" />
                  </button>
                  <button
                    onClick={() => addProduct(item.id)}
                    className="w-full sm:w-auto flex-1 bg-main text-center p-2 hover:bg-green-700 text-white rounded-md flex items-center justify-center"
                  >
                    <FaCartPlus className="text-2xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-main text-2xl font-bold flex justify-center items-center h-32">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </>
  )
}


