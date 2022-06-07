import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import { useAppDispatch, useAppSelector } from "../reduxTool/app/hooks"
import { authUserAsync } from "../reduxTool/features/auth/authAsync"
import '../styles/blog.css'

const Layout = () => {

  const location = useLocation()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(state=>state.auth.isAuthenticated)
 
  useEffect(()=>{
     if(!isAuthenticated){
    dispatch(authUserAsync())
     }
  },[isAuthenticated,location])

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