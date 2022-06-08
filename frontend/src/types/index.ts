export type authUser ={
    first_name:string,
    last_name:string,
    email:string,
    password:string
}
export type userData = {
    email: string
    roles: Object
    user_id: string
    username: string
}
export type payLoadUser = {
 
        data: userData;
        isAuthenticated: boolean;
   
}

export type blogData = {
    title:string,
    blogImage:string,
    category:string,
    content :string
}