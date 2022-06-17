import React, { useEffect, useState } from "react";
// import { useUserRegisterMutation } from "../../reduxTool/features/auth/authApi";
import { useRegisterMutation } from "../../reduxTool/query/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();
    
    
    const [registerUser,setRegisterUser] = useState({
        first_name:'',
        last_name:'',
        email:'',
        password:''
    })
    const {first_name,last_name,email,password} = registerUser

    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
       setRegisterUser(prev=>({
           ...prev,[e.target.name]:e.target.value
       }))
    }
    const [createUser,res] = useRegisterMutation()
    const {isLoading,isError,isSuccess,data} = res
  
    
    const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
       e.preventDefault()
       await createUser(registerUser)
      
    }

    useEffect(()=>{
        
      if(isSuccess){
          navigate('/auth/activation')
      }
    },[isSuccess])

  return (
    <div className="container">
        <h1 className="text-center">Sign Up</h1>
      <form  className="m-4" onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputFirstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputFirstName"
            onChange={onChange}
            name='first_name'
            value={first_name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputLastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputLastName"
            onChange={onChange}
            name='last_name'
            value={last_name}
          />
        </div>
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
  );
};

export default Register;
