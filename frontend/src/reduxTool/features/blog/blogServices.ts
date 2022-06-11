const { REACT_APP_BACKEND_URL } = process.env;

export const isLiked = async()=>{
    const res = await fetch(`${REACT_APP_BACKEND_URL}/blog/is_liked`,{
        method:"GET",
        credentials:'include'
      })
      const data = await res.json()
      console.log(data);
      
      if(res.status === 200){
        return true
      }else{
        return false
      }
}