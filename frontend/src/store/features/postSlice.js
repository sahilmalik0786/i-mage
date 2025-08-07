import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { upload } from "../../services/api/postApi";


export const postSlice = createSlice({
    name:'post',
    initialState:{
        res:null,
        loading:false,
        initialized:false,
        error:null
    },
    reducers:{
        setNew:(state)=>{
          state.initialized = false
        }
    },
    extraReducers: (builder) => {
         builder.addCase(generate.pending , (state)=>{
            state.loading = true
            state.initialized = true
         })
         .addCase(generate.fulfilled , (state,action)=>{
            state.res = action.payload.response
            state.loading = false
         })
         .addCase(generate.rejected ,(state,action)=>{
            state.loading = false 
            state.error =  action.payload || "Something went wrong"
            state.initialized = false
         })
    }

})

export const generate = createAsyncThunk(
  "api/post",
  async (credentials, { rejectWithValue }) => {
   
    try {
      const response = await upload(credentials);
      console.log(response)
      const data = await response.json();
      console.log(data)
      if(!response.ok){
        return rejectWithValue(data.message)
      }
      // const data = 'hello'
      return data
    } catch (error) {
      

      return rejectWithValue(error.message || 'Unexpected error');
    }
  }
);
export const {setNew} = postSlice.actions
export default postSlice.reducer