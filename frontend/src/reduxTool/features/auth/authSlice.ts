import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authState, likedArticlesByUser, payLoadUser } from "../../../types";
import { authUserAsync, likedArticlesAsync, likedArticlesDataAsync, logoutAsync, savedArticlesAsync, savedArticlesDataAsync } from "./authAsync";


const initialState :authState= {
    user_id:'',
    username:'',
    email:'',
    roles:{},
    isAuthenticated:false,
    likedArticles:[],
    savedArticles:[]
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
        
        
    },
    extraReducers:(builder)=>{
        builder.addCase(logoutAsync.fulfilled,(state,action)=>{
            
            state.isAuthenticated = false
            state.user_id = ''
            state.email = ''
            state.username = ''
            state.roles = ''
          
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
        .addCase(likedArticlesAsync.fulfilled,(state,action)=>{
            console.log(action);
            // if(action.payload){
            // state.likedArticles = action.payload
            // }
            
        })
        .addCase(savedArticlesAsync.fulfilled,(state,action)=>{
            console.log(action);
            // if(action.payload){
            //     state.savedArticles = action.payload
            // }
            
        })
        .addCase(likedArticlesDataAsync.fulfilled,(state,action)=>{
            console.log('liked articles data',action.payload);
            if(action.payload){
                state.likedArticles = action.payload
            }
            
        })
        .addCase(savedArticlesDataAsync.fulfilled,(state,action)=>{
            console.log('saved articles data',action.payload);
            if(action.payload){
                state.savedArticles = action.payload
            }
        })
    }
    
})
export const {setCurrentUser} = authSlice.actions
export default authSlice.reducer