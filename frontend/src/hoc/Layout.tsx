import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import { useAppDispatch, useAppSelector } from "../reduxTool/app/hooks"
import { useGetUserDataQuery } from "../reduxTool/features/auth/authApi"
import { setCurrentUser } from "../reduxTool/features/auth/authSlice"
import '../styles/blog.css'

const Layout = () => {
  const isAuthenticated = useAppSelector(state=>state.auth.isAuthenticated)
  const {isSuccess,data} =useGetUserDataQuery('')
  const dispatch = useAppDispatch()
  useEffect(()=>{
    if(!isAuthenticated){
      if(data){
        const obj = {data,isAuthenticated:true}
        console.log(isSuccess,data,obj);
      dispatch(setCurrentUser(obj))
      }
      console.log(isSuccess,data);
      
    }
  },[isAuthenticated,data])
  return (
    <div className="site_container">
        <div className="container">
            <Header isAuthenticated={isAuthenticated} />
            <Navbar />
        </div>
          <Outlet />

          <Footer />
    </div>
  )
}

export default Layout