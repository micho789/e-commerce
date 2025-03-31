import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../../Components/Loader/Loader';

export default function Brands() {
  const [brands, setBrands] = useState([])

  async function getAllBrands() {
    await axios.get("https://ecommerce.routemisr.com/api/v1/brands").then((response) => {
      setBrands(response.data.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getAllBrands();
  }, [])

  useEffect(() => {
      document.title = "Brands";
    }, []);


  return (
    <>
      <h2 className='text-4xl text-main justify-center items-center flex mb-2 font-black'>All BRANDS:</h2>
      <div className='flex flex-wrap'>
        {brands.length > 0 ? (brands.map((brand) =>
          <div className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5  ' key={brand.id}>
            <div className='p-2  rounded-md  hover:border-main border-4 hover:shadow-2xl cursor-pointer'>
              <img src={brand.image} className='w-full'></img>
              <h5 className='font-bold text-xl text-center text-main my-2'>{brand.name}</h5>
            </div>
          </div>
        )) : (
          <div className="w-full flex justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
    </>
  )
}
