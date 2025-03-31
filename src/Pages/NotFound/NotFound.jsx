import styles from './NotFound.module.css'
import image from './../../assets/error.svg'
import { useEffect } from 'react';

export default function NotFound() {

  useEffect(() => {
    document.title = "Not found";
  }, []);


  return (
    <div className='flex items-center justify-center'>
        <img src={image}/>
    </div>
  )
}








