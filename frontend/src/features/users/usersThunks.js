import { createAsyncThunk } from "@reduxjs/toolkit";
import {clientGetUserById, clientUpdateUser } from "../../api/user";



export  const  fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async(id, thunkAPI) => {
      try {
        const response = await clientGetUserById(id);
        return response;

      } catch (error) {
        console.error('Error fetching user by id: ',error)
        return thunkAPI.rejectWithValue(error.message)
      }
    }
)


export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (newUserInfo, thunkAPI) => {
        try {
           console.log(newUserInfo);

            const response = await clientUpdateUser(newUserInfo);
            return response;
        } catch (error) {
            console.error('Error updating  user: ',error)
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);
