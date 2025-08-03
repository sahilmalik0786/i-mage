import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './features/menuSlice'
import  themeReducer  from './features/themeSlice'
import  userSlice  from './features/userSlice'

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    theme: themeReducer,
    user: userSlice,
  },
})