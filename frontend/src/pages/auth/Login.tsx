import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserLoginMutation } from '../../reduxTool/features/auth/authApi'

const Login = () => {
    const navigate = useNavigate()
    const [loginData,setLoginData] = useState({
        email:'',
        password:''
    })
    const {email,password} = loginData

    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
       setLoginData(prev=>({
           ...prev,[e.target.name]:e.target.value
       }))
    }
///////////////////////////////////////////////////////////////////////////

    const [loginUser,res] = useUserLoginMutation()
    const {isLoading,isSuccess,isError} = res
    useEffect(()=>{
       if(isSuccess){
           navigate('/')
       }
    },[isSuccess])

    const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
         await loginUser(loginData)

    }
//////////////////////////////////////////////////////////////////////////
  return (
    <div className='container'>
        <h1 className="text-center">Sign Up</h1>
      <form className="m-4" onSubmit={onSubmit}>
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            onChange={onChange}
            name='email'
            value={email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={onChange}
            name='password'
            value={password}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login