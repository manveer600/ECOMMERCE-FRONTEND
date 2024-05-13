import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, createUser, signOut } from './authApi';
import { updateUser } from '../user/userApi';
import { checkAuth } from './authApi';
const initialState = {
    loggedInUserToken: null,
    userInfo: null,
    status: 'idle',
    error: null
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
    const response = await updateUser(update);
    return response.data;
}
);


export const loginUserAsync = createAsyncThunk('user/loginUser', async (loginData, { rejectWithValue }) => {
    try {
        const response = await loginUser(loginData);
        return response.data;
    }
    catch (error) {
        console.log('rejecting with an error', error);
        return rejectWithValue(error);
    }
}
);

export const checkAuthAsync = createAsyncThunk('user/checkAuth', async () => {
    try {
        const response = await checkAuth();
        console.log("response.data", response);
        return response.data;
    }
    catch (error) {
        console.log('rejecting with an error', error);
        return error;
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
            .addCase(loginUserAsync.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserToken = action.payload.token;
                state.userInfo = action.payload.user
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.status = 'idle';
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
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserToken = action.payload.token;
                state.userInfo = action.payload.user;
            })
    },
});


export const loggedInUserToken = (state) => state?.auth?.loggedInUserToken;
export const userInfo = (state) => state?.auth?.userInfo;

export default authSlice.reducer;
