import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, createUser, signOut, forgotPassword, resetPassword, checkAuth, updateUser } from './authApi';
const initialState = {
    loggedInUserToken: null,
    userInfo: null,
    status: 'idle',
    loginError: null,
    signUpError: null
};

export const createUserAsync = createAsyncThunk('user/createUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await createUser(userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
}
);

export const signOutAsync = createAsyncThunk('user/signOut', async () => {
    const response = await signOut();
    return response.data;
}
);

export const updateUserAsync = createAsyncThunk('user/updateUser', async (updatedData) => {
    const response = await updateUser(updatedData);
    return response.data;
}
);

export const loginUserAsync = createAsyncThunk('user/loginUser', async (loginData, { rejectWithValue }) => {
    try {
        const response = await loginUser(loginData);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
}
);

export const checkAuthAsync = createAsyncThunk('user/checkAuth', async () => {
    try {
        const response = await checkAuth();
        return response.data;
    }
    catch (error) {
        return error;
    }
}
);

export const forgotPasswordAsync = createAsyncThunk('user/forgotPassword', async (data) => {
    try {
        const response = await forgotPassword(data);
        return response;
    }
    catch (error) {
        return error;
    }
}
);

export const resetPasswordAsync = createAsyncThunk('user/resetPassword', async (data) => {
    try {
        const response = await resetPassword(data);
        return response.data1;
    }
    catch (error) {
        return error;
    }
}
);

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearSignUpError: (state) => {
            state.signUpError = null;
        },
        clearLoginError: (state) => {
            state.loginError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserToken = action.payload.token;
                state.userInfo = action.payload.user;
                localStorage.setItem('OTP', action.payload.OTP);
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.signUpError = action.payload;
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
                state.status = 'rejected';
                state.loginError = action.payload;
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = 'updating user';
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userInfo = action.payload.user
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

export const { clearSignUpError,clearLoginError } = authSlice.actions;
export const loggedInUserToken = (state) => state?.auth?.loggedInUserToken;
export const userInfo = (state) => state?.auth?.userInfo;

export default authSlice.reducer;
