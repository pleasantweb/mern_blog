import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userData } from "../../../types";
const { REACT_APP_BACKEND_URL } = process.env;
console.log(REACT_APP_BACKEND_URL);

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${REACT_APP_BACKEND_URL}/auth/` }),
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (body) => ({
        url: "register",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: body,
        credentials: "include",
      }),
    }),
    userActivation: builder.mutation({
      query: (activationCode) => ({
        url: "activate",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: { activationCode: activationCode },
        credentials: "include",
      }),
    }),
    userLogin: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: data,
        credentials: "include",
      }),
    }),
    getUserData: builder.query<userData,string>({
      query: () => ({
        url: "login/success",
        method: "GET",
        credentials:'include'
      }),
    }),
    // logoutUser:builder.query({
    //   query:()=>({
    //     url:'logout',
    //     method:"GET",
    //     credentials:'include'
    //   })
    // })
  }),
});

export const {
  useUserRegisterMutation,
  useUserActivationMutation,
  useUserLoginMutation,
  useGetUserDataQuery,
  // useLogoutUserQuery
} = authApi;

export const userLogout =async()=>{
  const res = await fetch(`${REACT_APP_BACKEND_URL}/auth/logout`,{
    method:"GET",
    credentials:'include'
  })
  if(res.status === 200){
    return true
  }else{
    return false
  }
}