import {  createAsyncThunk } from '@reduxjs/toolkit';

import { clientCreateInquiry } from '../../api/inquiry';

export const submitInquiry = createAsyncThunk(
    'inquiry/submitInquiry',
   async (userInfo, thunkApi)  => {
    try {
       const response = await clientCreateInquiry(userInfo);
  
       
       
       if(response.status === 201){
        return response.data.inquiryId;
       }
    } catch (error) {
     
      return thunkApi.rejectWithValue(error.message);
    }
   }
  );