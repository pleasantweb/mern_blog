import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const { REACT_APP_BACKEND_URL } = process.env;


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${REACT_APP_BACKEND_URL}/auth/` }),
  keepUnusedDataFor:5,
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
    
  }),
});

export const {
  useUserRegisterMutation,
  useUserActivationMutation,
  useUserLoginMutation,
 
} = authApi;

