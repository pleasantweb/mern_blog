import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authState, payLoadUser } from "../../../types";
import { authUserAsync, logoutAsync } from "./authAsync";


const initialState :authState= {
    user_id:'',
    username:'',
    email:'',
    roles:{},
    isAuthenticated:false,
    redirectPage: ''
}


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCurrentUser:(state,action:PayloadAction<payLoadUser>)=>{
          
          const {data,isAuthenticated} = action.payload
          state.isAuthenticated = isAuthenticated
          state.user_id = data.user_id
          state.email = data.email
          state.username = data.username
          state.roles = data.roles
          
        },
        setRedirectPage:(state,action:PayloadAction<string>)=>{
          state.redirectPage = action.payload
        }
        
        
    },
    extraReducers:(builder)=>{
        builder.addCase(logoutAsync.fulfilled,(state,action)=>{
            
            state.isAuthenticated = false
            state.user_id = ''
            state.email = ''
            state.username = ''
            state.roles = ''
            state.redirectPage = ''
          
          
        })
        .addCase(authUserAsync.fulfilled,(state,action)=>{
            
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
export const {setCurrentUser,setRedirectPage} = authSlice.actions
export default authSlice.reducer