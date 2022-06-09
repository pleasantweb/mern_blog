import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice'
import blogReducer from '../features/blog/blogSlice'
import { blogApi } from '../features/blog/blogApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth:authReducer,
    blog:blogReducer,
    [authApi.reducerPath] : authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,blogApi.middleware),
    // getDefaultMiddleware().concat(blogApi.middleware)
  // )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
