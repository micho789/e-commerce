import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.css'
import Navbar from './../../Components/Navbar/Navbar'
import Footer from './../../Components/Footer/Footer'

export default function MainLayout() {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Navbar/>
      <div className="container mx-auto">
      <Outlet/>
      </div>
      <Footer/>

    </div>
  )
}
