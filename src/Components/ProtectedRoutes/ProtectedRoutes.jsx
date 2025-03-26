import { Navigate } from 'react-router-dom'
import styles from './ProtectedRoutes.module.css'

export default function ProtectedRoutes({children}) {
  
  if(localStorage.getItem("token")){
    return children
  }else{
    return <Navigate to={'/login'}/>
  }
}
