// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchLoggedInUser, updateUser } from "./userApi";

// //IS SLICE KI KOI JROORAT NHI HAI
// const initialState = {
//     userOrders:[],
//     status:'idle',
//     userInfo:null,
// }



// // export const updateUserAsync = createAsyncThunk('user/updateUser', async(updatedData) => {
// //     const response  = await updateUser(updatedData);
// //     return response.data;
// //     //TODO:SUCCESS PE KYA KRNA CHAHTE HO
// // })

// export const fetchLoggedInUserAsync = createAsyncThunk('user/fetchLoggedInUser', async() => {
//     const response  = await fetchLoggedInUser();
//     return response.data;
// })



// export const userSlice = createSlice({
//     name:'user',
//     initialState,
//     extraReducers:(builder) => {
//         builder
//         .addCase(updateUserAsync.pending ,(state) => {
//             state.status = 'loading';
//         })
//         .addCase(updateUserAsync.fulfilled , (state,action) => {
//             state.status = 'idle';
//         })
//         .addCase(fetchLoggedInUserAsync.pending ,(state) => {
//             state.status = 'loading';
//         })
//         .addCase(fetchLoggedInUserAsync.fulfilled , (state,action) => {
//             state.status = 'idle';
//             state.userInfo = action.payload.user;
//         })

//     }
// })


// export default userSlice.reducer;