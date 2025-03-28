import axios from 'axios'
import styles from './ProductDetails.module.css'
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 1000
}

export default function ProductDetails() {

  const { productId } = useParams();
  const [details, setDetails] = useState([])
  const { addToCart, setCartId, setNumOfCartItems } = useContext(CartContext)
  const { addToWishlist } = useContext(WishlistContext)

  async function getProductDetails() {
    await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`).then((response) => {
      setDetails(response.data.data);
      console.log(response.data.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  async function addProduct(id) {
    let response = await addToCart(id);
    if (response.status === 'success') {
      toast.success(response.message)
      setNumOfCartItems(response.numOfCartItems)
      setCartId(response.cartId)
    } else {
      toast.error('failed to add to cart')
    }
  }

  async function addProductToWishlist(id) {
    let res = await addToWishlist(id);
    if (res.status === 'success') {
      toast.success(res.message)
      console.log(res);
    } else {
      toast.error('failed to add to Wishlist')
    }
  }


  useEffect(() => {
    getProductDetails();
  }, [])

  useEffect(() => {
    document.title = details.title;
  }, [details])



  return (
    <div className='flex flex-wrap my-12 items-center'>
      <div className="w-full md:w-1/4">
        {details.images > 1 ? (
          <Slider {...settings} className='mb-4'>
            {details.images?.map((img, i) => (
              <img src={img} key={i} alt={details.category?.name} />
            ))}
          </Slider>
        ) : (
          <img
            src={details.imageCover}
            alt="Product"
            className="w-full"
          />
        )}
      </div>
      <div className='w-full md:w-3/4'>
        <h2 className='text-2xl font-bold mb-3 text-main'>{details.title}</h2>
        <p className='text-gray-700  my-4'>{details.description}</p>
        <small className='font-bold mb-4 text-main'>{details.category?.name}</small>
        <div className='flex justify-between my-4'>
          <p>{details.price}EGP</p>
          <div className='flex items-center'>
            <FaStar className='text-yellow-300 mx-1' />
            {details.ratingsAverage}
          </div>
        </div>
        <button onClick={() => { addProduct(details.id) }} className='w-full bg-main text-center p-2 hover:bg-green-700 text-white rounded-md'>Add to Cart</button>
        <button onClick={() => { addProductToWishlist(details.id) }} className='w-full mt-3 bg-main text-center p-2 hover:bg-green-700 text-white rounded-md'>Add to Wishlist</button>
      </div>
    </div>
  )
}
