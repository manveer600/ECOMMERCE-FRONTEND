import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from './authApi';
import { updateUser } from '../user/userApi';

const initialState = {
   loggedInUserToken:null,
   userInfo:null,
   status:'idle',
   error:null
};

export const createUserAsync = createAsyncThunk('user/createUser', async (userData) => {
    const response = await createUser(userData);
    return response.data;
}
);


export const signOutAsync = createAsyncThunk('user/signOut', async () => {
    const response = await signOut();
    return response.data;
}
);


export const updateUserAsync = createAsyncThunk('user/updateUser', async (update) => {
    console.log('item to update ', update);
    const response = await updateUser(update);
    return response.data;
}
);


export const checkUserAsync = createAsyncThunk('user/checkUser', async (loginData, {rejectWithValue}) => {
    try{
        const response = await checkUser(loginData);
        console.log('response',response);
        return response.data;
    }
    catch(error){
        return rejectWithValue(error);
    }
}
);


export const authSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                console.log('payload', action.payload);
                state.loggedInUserToken = action.payload.token;
                state.userInfo = action.payload.user;
            })
            .addCase(checkUserAsync.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(checkUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserToken = action.payload.token;
                state.userInfo = action.payload.user
            })
            .addCase(checkUserAsync.rejected, (state, action) => {
                state.status = 'idle';
                console.log('login rejected');
                console.log('action.payload is this');
                console.log(action.payload);
                state.error = action.payload;
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserToken = action.payload.token;
            })
            .addCase(signOutAsync.pending, (state) => {
                state.status = 'loggingOut';
            })
            .addCase(signOutAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserToken = null;
                state.userInfo = null;
            })
    },
});


export const loggedInUserToken = (state) => state?.auth?.loggedInUserToken ;
export const userInfo = (state) => state?.auth?.userInfo;

export default authSlice.reducer;
