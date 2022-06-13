import { userData } from "../../../types";
import {fullBlogData} from '../../../types/index'

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

export const getLikedArticles = async()=>{
    const res = await fetch(`${REACT_APP_BACKEND_URL}/auth/liked_articles`,{
      method:"GET",
      credentials:'include'
  })
  const data:string[] = await res.json()
console.log(data);

  if(res.status === 200){
      return data
  }else{
      return null
  }
}
export const getSavedArticles = async()=>{
  const res = await fetch(`${REACT_APP_BACKEND_URL}/auth/saved_articles`,{
    method:"GET",
    credentials:'include'
})
const data:string[] = await res.json()
console.log(data);

if(res.status === 200){
    return data
}else{
    return null
}
}

export const getLikedArticlesData =async () => {
  const res = await fetch(`${REACT_APP_BACKEND_URL}/auth/liked_articles_data`,{
    method:"GET",
    credentials:'include'
})
const data:fullBlogData[] = await res.json()
console.log(data);

if(res.status === 200){
    return data
}else{
    return null
}
}
export const getSavedArticlesData =async () => {
  const res = await fetch(`${REACT_APP_BACKEND_URL}/auth/saved_articles_data`,{
    method:"GET",
    credentials:'include'
})
const data:fullBlogData[] = await res.json()
console.log(data);

if(res.status === 200){
    return data
}else{
    return null
}
}