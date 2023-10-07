import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
  },
  reducers: {
    login:(state,action)=>{
        state.user = action.payload;
        localStorage.setItem("user",JSON.stringify(state.user));
      }
      ,
      logout:(state)=>{
        state.user= null;
        localStorage.setItem("user",null);
    }
    
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state)=> state.user;
export default userSlice.reducer;
