// Async thunk for login

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  clientLogin,
  clientRegister,
  fetchCurrentUser,
  clientLogout,
  clientHandleRefreshToken,
} from '../../api/passwordAuth';
import toast from 'react-hot-toast';

export const loginUser = createAsyncThunk(
  'userPasswordAuth/loginUser',
  async (userCredentials, thunkAPI) => {
    try {
      const response = await clientLogin(userCredentials);
      toast.success('Logged in successfully.')
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  },
);



// Async thunk for registration
export const registerUser = createAsyncThunk(
  'userPasswordAuth/registerUser',
  async (user, thunkAPI) => {
    try {
      const response = await clientRegister(user);
    
      return response;
    } catch (error) {

      return thunkAPI.rejectWithValue(error?.message || 'Registration failed');
    }
  },
);

export const checkAuthStatus = createAsyncThunk(
  'userPasswordAuth/checkAuthStatus',
  async (_, thunkAPI) => {
    try {
      const data = await fetchCurrentUser(); // Now returns { user: ... } or { user: null } if 401 occurred

      if (data && data.user) {
        // Check if user object exists in the response
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
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to check auth status',
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  'userPasswordAuth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await clientLogout(); // Call backend to clear httpOnly cookie
      toast.error('Logged out');
      return; // No specific payload needed on success
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: 'Logout failed' },
      );
    }
  },
);

export const newAccessToken = createAsyncThunk(
    'userPasswordAuth/newAccessToken',
    async(_, thunkAPI) => {
      try {
         await clientHandleRefreshToken();
         return
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data || { message: 'Issuing new access token failed.' },
        );
      }
    }
  )