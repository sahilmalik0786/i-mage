import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : false
}

export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{
        isVisible: (state)=>{
            state.value = !state.value
        },
       
    }
})

export const {isVisible} = menuSlice.actions

export default menuSlice.reducer