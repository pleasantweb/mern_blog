import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../reduxTool/app/hooks"
import { logoutAsync } from "../reduxTool/features/auth/authSlice"

type propType={
  isAuthenticated:boolean
}

const Header = (props:propType) => {
  const {isAuthenticated} = props

  const dispatch = useAppDispatch()

  const logout=()=>{
     dispatch(logoutAsync())
  }
  
  return (
    <header className="blog-header lh-1 py-3">
    <div className="row flex-nowrap justify-content-between align-items-center">
      <div className="col-4 pt-1">
        <a className="link-secondary" href="#">Subscribe</a>
      </div>
      <div className="col-4 text-center">
        <a className="blog-header-logo text-dark" href="#">Large</a>
      </div>
      <div className="col-4 d-flex justify-content-end align-items-center">
        <a className="link-secondary" href="#" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"/><path d="M21 21l-5.2-5.2"/></svg>
        </a>
        {isAuthenticated ? 
        <button onClick={logout} className="btn btn-sm btn-outline-secondary">Logout</button>
        :<Link  to='/auth/login' className="btn btn-sm btn-outline-secondary">Sign in</Link>
        }
        {/* <a className="btn btn-sm btn-outline-secondary" href="#">Sign up</a> */}
      </div>
    </div>
  </header>
  )
}

export default Header