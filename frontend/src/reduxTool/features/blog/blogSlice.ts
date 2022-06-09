import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { allCategories, blogData, blogInitalState } from "../../../types";



const initialState:blogInitalState ={
    allBlogs:[],
    category:'all',
    authorBlogs:[]
}

export const blogSlice = createSlice({
    name:'blog',
    initialState,
    reducers:{
        setBlogData:(state,action:PayloadAction<(blogData & {_id:string})[]>)=>{
            console.log(action.payload);
            
           state.allBlogs = action.payload
        },
        setHomeCategory:(state,action:PayloadAction<allCategories>)=>{
            console.log(action.payload);
            state.category = action.payload
            
        },
        setAuthorData:(state,action:PayloadAction<(blogData & {_id:string})[]>)=>{
           state.authorBlogs = action.payload
        }
    }
})

export const {setBlogData,setHomeCategory,setAuthorData} = blogSlice.actions
export default blogSlice.reducer