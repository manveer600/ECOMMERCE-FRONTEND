import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUser, updateUser } from "./userApi";
import { useSelector } from "react-redux";


const initialState = {
    userOrders:[],
    status:'idle',
    userInfo:null,
}



export const updateUserAsync = createAsyncThunk('user/updateUser', async(updatedData) => {
    console.log('data to be updated', updatedData);
    const response  = await updateUser(updatedData);
    return response.data;
})

export const fetchLoggedInUserAsync = createAsyncThunk('user/fetchLoggedInUser', async() => {
    const response  = await fetchLoggedInUser();
    return response.data;
})



export const userSlice = createSlice({
    name:'user',
    initialState,
    extraReducers:(builder) => {
        builder
        .addCase(updateUserAsync.pending ,(state) => {
            state.status = 'loading';
        })
        .addCase(updateUserAsync.fulfilled , (state,action) => {
            state.status = 'idle';
            console.log('action.payload', action.payload.user);
        })
        .addCase(fetchLoggedInUserAsync.pending ,(state) => {
            state.status = 'loading';
        })
        .addCase(fetchLoggedInUserAsync.fulfilled , (state,action) => {
            state.status = 'idle';
            console.log('payload', action.payload);
            state.userInfo = action.payload.user;
        })

    }
})


export default userSlice.reducer;