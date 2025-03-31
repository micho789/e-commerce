import React, { useEffect } from 'react'
import UpdatedProducts from '../../Components/UpdatedProducts/UpdatedProducts'
import MainSlider from '../../Components/MainSlider/MainSlider'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
export default function Home() {
  
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div>
      <MainSlider/>
      <CategorySlider/>
      <UpdatedProducts/>
    </div>
  )
}
