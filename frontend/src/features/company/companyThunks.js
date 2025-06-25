import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientCreateCompany, clientGetCompany, clientUpdateCompany } from "../../api/company";

export const createCompany = createAsyncThunk(
    'company/createCompany',
    async ({userId, company}, thunkAPI) => {
      
        try{
            const response = await clientCreateCompany(userId,company);
            return response.data;

        }catch(error){
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }    
)

export const updateCompany = createAsyncThunk(
    'company/updateCompany',
    async ({userId, updatedCompany}, thunkAPI) => {
        console.log(userId, updatedCompany);
        try{
            const response = await clientUpdateCompany(userId,updatedCompany);
            return response.data;

        }catch(error){
            console.error(error);
            return thunkAPI.rejectWithValue(error)
        }
    }

            
);

export const getMyCompany = createAsyncThunk(
    'company/getMyCompany',
    async (userId, thunkAPI) => {
        try{
            const response = await clientGetCompany(userId);
       
            return response;

        }catch(error){
            console.error(error);
            return thunkAPI.rejectWithValue(error)
        }
    }
)