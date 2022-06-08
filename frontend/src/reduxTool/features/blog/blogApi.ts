import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { blogData } from "../../../types";
const { REACT_APP_BACKEND_URL } = process.env;

export const blogApi = createApi({
    reducerPath:'blogApi',
    baseQuery:fetchBaseQuery({baseUrl:`${REACT_APP_BACKEND_URL}/blog`}),
    endpoints:(builder)=>({
        allBlog:builder.query<blogData & {_id:string},string>({
            query:()=>({
                url:'/',
                method:"GET"
            })
        }),
        blogCreate:builder.mutation<blogData & {_id:string},blogData>({
            query:(body)=>({
                url:'/',
                method:"POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                  },
                body: body,
                credentials: "include",
            })
        })
    })

});

export const {useAllBlogQuery,useBlogCreateMutation} = blogApi;