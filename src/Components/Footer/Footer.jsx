import styles from './Footer.module.css'
import img1 from './../../assets/amazon.jpg'
import img2 from './../../assets/american.jpg'
import img3 from './../../assets/masterCard.jpg'
import img4 from './../../assets/paypal.jpg'
import img5 from './../../assets/appStore.jpg'
import img6 from './../../assets/googleapp.jpg'



export default function Footer() {
  return (
    
<footer className='bg-gray-100 p-6 '>
      <div className='container mx-auto px-4'>
        <h3 className='font-bold text-xl text-main mb-3'>Get the FreshCart app</h3>
        <p className='font-semibold text-sm text-gray-600 mb-3 '>
          We will send you a link, open it on your phone to download the app
        </p>
        
        <div className='flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0'>
          <input 
            type='email' 
            id='email' 
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full sm:w-3/4 p-2.5  focus:border-main  focus:ring-main' 
            placeholder='Email...' 
            required
          />
          <button className='bg-main min-w-fit text-center rounded-md px-6 py-3 text-white hover:bg-green-700 sm:ml-4'>
            Share App Link
          </button>
        </div>
        
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <h5 className='font-semibold mb-2'>Payment Partners</h5>
            <div className='flex space-x-2'>
              <img className='w-10' src={img1} alt='amazon-pay' />
              <img className='w-10' src={img2} alt='American-Express-Color' />
              <img className='w-10' src={img3} alt='mastercard' />
              <img className='w-10' src={img4} alt='paypal' />
            </div>
          </div>
          
          <div className='text-right sm:text-left'>
            <h5 className='font-semibold mb-2'>Get deliveries with FreshCart</h5>
            <div className='flex space-x-2 justify-center sm:justify-start'>
              <img className='w-20' src={img5} alt='get-apple-store' />
              <img className='w-20' src={img6} alt='get-google-play' />
            </div>
          </div>
        </div>
      </div>
    </footer>

  )
}
