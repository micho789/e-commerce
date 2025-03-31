import axios from 'axios';
import styles from './Categories.module.css'
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Loader/Loader';
import { useEffect } from 'react';

export default function Categories() {

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

useEffect(() => {
    document.title = "Categories";
  }, []);


  return (
    <div className=' flex flex-wrap '>
      {isLoading && (
        <div className="w-full flex justify-center items-center">
        <Loader />
        </div>
      )}
      {data?.data?.data?.map((category, i) => (
        <div className='w-full sm:w-full md:w-1/2 lg:w-2/6 p-3 cursor-pointer ' key={i}>
          <div key={i} className="  bg-white border border-main rounded-lg shadow-sm hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg w-full h-[400px]" src={category.image} alt={category.name} />
            <div className="p-5">
              <h5 className="mb-2 text-2xl  font-bold tracking-tight text-main dark:text-white">{category.name}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
