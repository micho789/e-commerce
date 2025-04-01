import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { tokenContext } from '../../Context/TokenContext';
import { FaLocationDot, FaPhone } from 'react-icons/fa6';
import Loader from '../../Components/Loader/Loader';
import { MdOutlineAttachMoney, MdPayment } from 'react-icons/md';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';

export default function AllOrders() {
  const {userId} =   useContext(tokenContext)
  const [ordersData, setOrdersData ] = useState(0)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  async function getUserOrders(){
    await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`).then((response)=>{
    setOrdersData(response.data);
    setLoading(false)
  }).catch((err)=>{
    console.log(err);
  })
  }


useEffect(() => {
  if (userId) {
    getUserOrders();
  } else {
    navigate('/');
  }
}, [userId]);


useEffect(() => {
      document.title = "All Orders";
    }, []);


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
};

  return (
    <>
       {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) :ordersData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ordersData.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            >
              <div className="bg-white rounded-2xl shadow-lg p-4">
                {order.cartItems.length > 1 ? (
                  <Slider {...settings}>
                    {order.cartItems.map((item) => (
                      <div key={item._id}>
                        <img
                          src={item.product.imageCover}
                          alt="Product"
                          className="w-full h-48 object-cover rounded-xl"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <img
                    src={order.cartItems[0]?.product.imageCover}
                    alt="Product"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                )}
                <div className="mt-6 space-y-3">
                  <p className="text-gray-700 flex items-center font-semibold space-x-2">
                    <FaPhone className="text-xl text-main" />
                    <span>Phone:</span>
                    <span className='text-main'>{order.shippingAddress.phone}</span>
                  </p>
                  <p className="text-gray-700 flex items-center font-semibold space-x-2">
                    <FaLocationDot className="text-xl text-main" />
                    <span>City:</span>
                    <span className='text-main'>{order.shippingAddress.city}</span>
                  </p>
                  <p className="text-gray-700 flex items-center font-semibold space-x-2">
                    <MdOutlineAttachMoney className="text-xl text-main" />
                    <span>Total Price:</span>
                    <span className='text-main'>${order.totalOrderPrice}</span>
                  </p>
                  <p className="text-gray-700 flex items-center font-semibold space-x-2">
                    <MdPayment className="text-xl text-main" />
                    <span>Payment Method:</span>
                    <span className='text-main'>{order.paymentMethodType}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
          <p className="text-main text-lg sm:text-xl md:text-2xl font-bold flex justify-center items-center h-24 sm:h-28 md:h-32 text-center px-4">
            No orders yet. Start shopping now!
          </p>
      )}
    </>


  )
}
