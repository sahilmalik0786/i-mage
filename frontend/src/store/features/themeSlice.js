import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: false,
  },
  reducers: {
    themeToggler: (state) => {
      state.value = !state.value;
     
    },
  },
});

export const { themeToggler } = themeSlice.actions;
export default themeSlice.reducer;
