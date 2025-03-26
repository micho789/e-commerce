import axios from 'axios'
import styles from './UpdatedProducts.module.css'
import { useContext, useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import Loader from '../Loader/Loader';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';

export default function UpdatedProducts() {
  const [products, setProducts] = useState([])
  const {addToCart ,setNumOfCartItems ,setCartId} = useContext(CartContext)
  const {addToWishlist, setCount} = useContext(WishlistContext)
  
  async function getAllProducts(){
    await axios.get("https://ecommerce.routemisr.com/api/v1/products").then((response)=>{
      setProducts(response.data.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(() => {
    getAllProducts();
  }, [])

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
  
  async function addProductToWishlist(id){
    let res = await addToWishlist(id);
    if (res.status === 'success'){
      setCount(res.count)
      toast.success(res.message)
    }else{
      toast.error('failed to add to Wishlist')
    }
  }

  return(
    <div className='flex flex-wrap'>
      {products.length > 0 ? ( products.map((product) =>
      <div className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6' key={product.id}>
          <ProductItem product={product} addProduct={addProduct}  addProductToWishlist={addProductToWishlist} />
      </div>
    )):(
    <div className="w-full flex justify-center items-center">
      <Loader />
    </div>
  )}
    </div>
    )
}
