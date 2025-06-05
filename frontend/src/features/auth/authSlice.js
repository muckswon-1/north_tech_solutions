// Async thunk for login

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientLogin, clientRegister, fetchCurrentUser, clientLogout } from "../../api/user";

export const loginUser = createAsyncThunk(
    'userPasswordAuth/loginUser',
    async (userCredentials, thunkAPI) => {
        try {
            
             const response = await clientLogin(userCredentials);
            
             return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
    'userPasswordAuth/registerUser',
    async (user, thunkAPI) => {
       
        try {
            const response = await clientRegister(user);

            return response;

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const checkAuthStatus = createAsyncThunk(
    'userPasswordAuth/checkAuthStatus',
    async (_, thunkAPI) => {
        try {
            const response = await fetchCurrentUser();
            return response;
            
            // Contains { user: ... }
        } catch (error) {
            // This is expected if no valid cookie is found (e.g., 401 error)
            // The reducer will handle clearing user state.
            return thunkAPI.rejectWithValue(error.response?.data || { message: 'Not authenticated' });
        }
    }
);

export const logoutUser = createAsyncThunk(
    'userPasswordAuth/logoutUser',
    async (_, thunkAPI) => {
        try {
            await clientLogout(); // Call backend to clear httpOnly cookie
            return; // No specific payload needed on success
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || { message: 'Logout failed' });
        }
    }
);


const initialState = {
   // accessToken: /*JSON.parse(localStorage.getItem('accessToken')) || */null,
    user: /*JSON.parse(localStorage.getItem('user')) || */ null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

}

const userAuthSlice = createSlice({
    name: 'userPasswordAuth',
    initialState,
    reducers: {
        // setCredentials: (state, action) => {
        //     state.accessToken = action.payload.accessToken;
        //     state.user = action.payload.user;
        // },
        // Synchronous logout reducer is replaced by logoutUser async thunk
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
           //state.accessToken = action.payload. accessToken;
            //state.user = action.payload.user;
            //localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            //localStorage.setItem('user', JSON.stringify(action.payload.user));

        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;

        })
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = null; 
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = action.null;
            state.user = action.payload;
            //state.accessToken = action.payload.accessToken;
            //localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
            //localStorage.setItem('user', JSON.stringify(action.payload.user));
            
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(checkAuthStatus.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(checkAuthStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
        })
        .addCase(checkAuthStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload.message;
            // No need to set accessToken, it's httpOnly
            // state.error = action.payload.message; // Optional: set error if needed
        })
        .addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
            state.isAuthenticated = false;
            //localStorage.removeItem('accessToken');
            //localStorage.removeItem('user');
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.message || 'Logout failed';
        
        });
        
    }
});

export default userAuthSlice.reducer;
