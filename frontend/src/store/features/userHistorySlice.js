import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { getHistory } from "../../services/api/getHistory";

export const historySlice = createSlice({
    name:'history',
    initialState:{
        userhistory:[],
        error:null,
        loading : false
    },
    extraReducers:(builder)=>{
        builder.addCase(userHistory.pending , (state)=>{
            state.loading = true
        })
        .addCase(userHistory.fulfilled , (state , action )=>{
            state.loading = false 
            state.userhistory = action.payload.history
            
        })
        .addCase(userHistory.rejected ,(state , action)=>{
            state.loading = false 
            state.error = action.payload || action.error.message
        })
    }
})

export const userHistory = createAsyncThunk('history/comp', async(_ , {rejectWithValue}) =>{
      try {
         const res = await getHistory()
         const data = await res.json()
         
         if(!res.ok){
            rejectWithValue(data?.message)
         }
         return data
      } catch (error) {
         rejectWithValue(error.message)
      }
})

export default historySlice.reducer