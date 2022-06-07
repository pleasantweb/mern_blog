import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { payLoadUser, userData } from "../../../types";
import { authUserAsync, logoutAsync } from "./authAsync";


const initialState = {
    user_id:'',
    username:'',
    email:'',
    roles:{},
    isAuthenticated:false
}


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCurrentUser:(state,action:PayloadAction<payLoadUser>)=>{
          console.log(action);
          const {data,isAuthenticated} = action.payload
          state.isAuthenticated = isAuthenticated
          state.user_id = data.user_id
          state.email = data.email
          state.username = data.username
          state.roles = data.roles
          
        },
        
        
    },
    extraReducers:(builder)=>{
        builder.addCase(logoutAsync.fulfilled,(state,action)=>{
            console.log('this is payload',action.payload);
            
            // if(action.payload){
            state.isAuthenticated = false
            state.user_id = ''
            state.email = ''
            state.username = ''
            state.roles = ''
            // }
        })
        .addCase(authUserAsync.fulfilled,(state,action)=>{
            console.log(action.payload);
            if(action.payload){
                const {user_id,username,email,roles} = action.payload
                state.isAuthenticated = true
                state.user_id = user_id
                state.username = username
                state.email = email
                state.roles = roles
            }
            
        })
    }
    
})
export const {setCurrentUser} = authSlice.actions
export default authSlice.reducer