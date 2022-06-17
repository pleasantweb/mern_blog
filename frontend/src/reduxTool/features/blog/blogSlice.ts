import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { allCategories, blogInitalState } from "../../../types";




const initialState:blogInitalState ={
    
    category:'all'
  
}

export const blogSlice = createSlice({
    name:'blog',
    initialState,
    reducers:{
        
        setHomeCategory:(state,action:PayloadAction<allCategories>)=>{
            console.log(action.payload);
            state.category = action.payload
            
        },
        
    },
    
})

export const {setHomeCategory} = blogSlice.actions
export default blogSlice.reducer