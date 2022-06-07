import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../reduxTool/app/hooks"
import { logoutAsync } from "../reduxTool/features/auth/authAsync"

type propType={
  isAuthenticated:boolean
}

const Header = (props:propType) => {
  const {isAuthenticated} = props

  const dispatch = useAppDispatch()
  const username = useAppSelector(state=>state.auth.username)
  const userid = useAppSelector(state=>state.auth.user_id)

  
  return (
    <header className="blog-header lh-1 py-3">
    <div className="row flex-nowrap justify-content-between align-items-center">
      <div className="col-4 pt-1">
        {username !== '' ?
        <Link className="link-secondary text-capitalize" to={`/profile/${userid}`}>{username}</Link>
        : <a className="link-secondary" href="#">Guest</a>
        }
      </div>
      <div className="col-4 text-center">
        <Link className="blog-header-logo text-dark" to="/">Large</Link>
      </div>
      <div className="col-4 d-flex justify-content-end align-items-center">
        <a className="link-secondary" href="#" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"/><path d="M21 21l-5.2-5.2"/></svg>
        </a>
        {isAuthenticated ? 
        <button onClick={()=>dispatch(logoutAsync())} className="btn btn-sm btn-outline-secondary">Logout</button>
        :<Link  to='/auth/login' className="btn btn-sm btn-outline-secondary">Sign in</Link>
        }
        
      </div>
    </div>
  </header>
  )
}

export default Header