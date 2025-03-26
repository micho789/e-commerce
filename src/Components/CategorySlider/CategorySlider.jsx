import { useEffect, useState } from 'react';
import styles from './CategorySlider.module.css'
import axios from 'axios';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

export default function CategorySlider() {

  const [categories, setCategories] = useState([]);

  async function getCategories(){
    await axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((response)=>{
      setCategories(response.data.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(() => {
    getCategories();
  }, [])
  

  return (
    <div className='my-9 mx-9'>
      <Slider {...settings}>
      {categories.map((category)=> (
       <div key={category._id}>
          <img src={category.image} className='w-full h-[300px]' alt={category.name}/>
          <h5 className='m-3 font-semibold text-main'>{category.name}</h5>
       </div>
      ))}
    </Slider>
    </div>
  )
}

