import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { blogData, fullBlogData } from "../../../types";
const { REACT_APP_BACKEND_URL } = process.env;

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${REACT_APP_BACKEND_URL}/blog` }),
    tagTypes: ['BlogData'],
    endpoints: (builder) => ({
        allBlog: builder.query<(fullBlogData)[], string>({
            query: () => ({
                url: "/",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ['BlogData']
        }),

        currentAuthorBlog: builder.query<(fullBlogData)[], string>({
            query: (userId) => ({
                url: `/author_blogs/${userId}`,
                credentials: "include",
            }),
            providesTags: ['BlogData']
        }),

        blogCreate: builder.mutation<
            fullBlogData,
            Omit<blogData, "datePosted">
        >({
            query: (body) => ({
                url: "/",
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: body,
                credentials: "include",
            }),
            invalidatesTags: ['BlogData']
        }),

        blogUpdate:builder.mutation<fullBlogData,Omit<fullBlogData, "datePosted">>({
            query:(body)=>{
               let {_id} = body
               return {
                url:`${_id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: body,
                credentials: "include",
            }},
            invalidatesTags: ['BlogData']
        }),

        blogDelete: builder.mutation({
            query: (blogId) => ({
                url: `${blogId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ['BlogData']
        }),
    }),
});

export const {
    useAllBlogQuery,
    useBlogCreateMutation,
    useCurrentAuthorBlogQuery,
    useBlogUpdateMutation,
    useBlogDeleteMutation
} = blogApi;
