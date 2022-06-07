import { userData } from "../../../types";

const { REACT_APP_BACKEND_URL } = process.env;

export const userLogout =async()=>{
    const res = await fetch(`${REACT_APP_BACKEND_URL}/auth/logout`,{
      method:"GET",
      credentials:'include'
    })
    console.log('logout res',res);
    
    if(res.status === 200){
      return true
    }else{
      return false
    }
  }

export const getAuthUser =async () => {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/auth/login/success`,{
        method:"GET",
        credentials:'include'
    })
    const data:userData = await res.json()
   
    if(res.status === 200){
        return data
    }else{
        return null
    }
    
    
}