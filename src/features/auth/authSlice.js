import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forgotPassword, resetPassword, updateUser } from './authApi';
import toast from 'react-hot-toast';
const initialState = {
    loggedInUserToken: null,
    userInfo: {},
    status: 'idle',
    loginError: null,
    signUpError: null
};

export const createUserAsync = createAsyncThunk('user/createUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/signup`, {
            method: "POST",
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(userData),
            headers: { 'content-type': 'application/json' },
        })
        return await response.json();
    } catch (error) {
        console.log('error while signing up', error);
        return error;
    }
}
);

export const generateOTP = createAsyncThunk('user/generateOTP', async (userData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/generateOTP`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(userData),
            headers: { 'content-type': 'application/json' },
        })
        return await response.json();
    } catch (error) {
        console.log('error while generating OTP', error);
        return error;
    }
})

export const signOutAsync = createAsyncThunk('user/signOut', async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/logout`, {
            mode: "cors",
            credentials: 'include',
            method: 'GET'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error while signing out', error);
        return error;
    }
}
);

export const updateUserAsync = createAsyncThunk('user/updateUser', async (updatedData) => {
    const response = await updateUser(updatedData);
    return response.data;
}
);

export const loginUserAsync = createAsyncThunk('user/loginUser', async (loginData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/login`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(loginData),
            headers: { 'content-type': "application/json" },
        });

        return await response.json();
    } catch (e) {
        console.log('error while logging', e);
        return e;
    }

}
);

export const checkAuthAsync = createAsyncThunk('user/checkAuth', async () => {
    console.log('checking authentication');
    try {
        const start = performance.now();
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/check-auth`, {
            method: 'GET',
            mode: "cors",
            credentials: 'include',
        });
        console.log('Request took:', performance.now() - start, 'ms');
        const data = await response.json();
        console.log('data is this', data);
        return data;
    }
    catch (error) {
        console.log('error while checking authentication', error);
        return error;
    }
}
);

export const forgotPasswordAsync = createAsyncThunk('user/forgotPassword', async (data) => {
    console.log('data is this', data);
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/forgotPassword`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        return await response.json();
    } catch (error) {
        console.error("Error sending forgot password request:", error);
        return toast.error(error?.response?.data?.message, {
            id: 'forgotPasswordError',
            duration: 1000
        });
    }
}
);

export const resetPasswordAsync = createAsyncThunk('user/resetPassword', async (data) => {
    try {
        const response = await resetPassword(data);
        console.log(response);
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
                state.userInfo = action.payload.data;
                // localStorage.setItem('OTP', action.payload.OTP);
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.signUpError = action.payload;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUserToken = action.payload.token;
                state.userInfo = action.payload.data
            })
            .addCase(generateOTP.fulfilled, (state, action) => {
                localStorage.setItem('OTP', action.payload.data)
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
                state.userInfo = action.payload.data;
            })
    },
});

export const { clearSignUpError, clearLoginError } = authSlice.actions;
export const loggedInUserToken = (state) => state?.auth?.loggedInUserToken;
export const userInfo = (state) => state?.auth?.userInfo;

export default authSlice.reducer;
