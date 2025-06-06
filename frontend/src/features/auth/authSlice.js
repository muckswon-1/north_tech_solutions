// Async thunk for login

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientLogin, clientRegister, fetchCurrentUser, clientLogout } from "../../api/user";
import toast from "react-hot-toast";

export const loginUser = createAsyncThunk(
    'userPasswordAuth/loginUser',
    async (userCredentials, thunkAPI) => {
        try {
            
             const response = await clientLogin(userCredentials);
         
             return response;
        } catch (error) {
            
            return thunkAPI.rejectWithValue(error?.message);
        }
    }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
    'userPasswordAuth/registerUser',
    async (user, thunkAPI) => {
       
        try {
            const response = await clientRegister(user);
            toast.success('Registration successful');
            return response;
            
        }catch(error){
            
            return thunkAPI.rejectWithValue(error?.message || 'Registration failed');
        }
    }
)

export const checkAuthStatus = createAsyncThunk(
    'userPasswordAuth/checkAuthStatus',
    async (_, thunkAPI) => {
        try {
            const data = await fetchCurrentUser(); // Now returns { user: ... } or { user: null } if 401 occurred
            
            if (data && data.user) { // Check if user object exists in the response
                return {
                    user: data.user,
                    isAuthenticated: true,
                };
            } else {
                // This case handles when fetchCurrentUser returned { user: null } (due to 401)
                // or if the response structure was unexpected but not an error.
                return {
                    user: null,
                    isAuthenticated: false,
                };
            }
        } catch (error) {
            // This catch block now only handles unexpected errors (non-401 from fetchCurrentUser)
            // such as network errors or server-side issues other than 401.
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || 'Failed to check auth status');
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
    user: JSON.parse(localStorage.getItem('user')) ||  null,
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
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
        clearAuthError: (state) => {
            state.error = null;
        },


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
            localStorage.setItem('isAuthenticated',true);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            state.user = action.payload.user;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            localStorage.setItem('isAuthenticated',false);
            state.user = null;
            localStorage.removeItem('user');

        })
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = null; 
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = action.null;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
            
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
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            state.isAuthenticated = action.payload.isAuthenticated;
            localStorage.setItem('isAuthenticated',action.payload.isAuthenticated);
            state.error = null;
        })
        .addCase(checkAuthStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false
            localStorage.setItem('isAuthenticated',false);
            localStorage.setItem('user',null);
            state.user = null;
            state.error = action.payload;
           
        })
        .addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
            state.isAuthenticated = false;
            localStorage.setItem('isAuthenticated',false);
            localStorage.removeItem('user');
            
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
            state.user = null;
            state.error = action.payload?.message || 'Logout failed';
            
        
        });
        
    }
});

export const { clearAuthError} = userAuthSlice.actions;



export default userAuthSlice.reducer;
