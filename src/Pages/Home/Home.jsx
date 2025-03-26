import React from 'react'
import UpdatedProducts from '../../Components/UpdatedProducts/UpdatedProducts'
import MainSlider from '../../Components/MainSlider/MainSlider'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'
export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider/>
      <CategorySlider/>
      <UpdatedProducts/>
    </div>
  )
}
