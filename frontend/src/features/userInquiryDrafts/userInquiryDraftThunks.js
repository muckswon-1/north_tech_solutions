import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientClearDraftInquiries, clientCreateInquiryDraft, clientDeleteInquiryDraft, clientGetAllUserInquiryDrafts, clientGetInquiryDraftById, clientUpdateInquiryDraft } from "../../api/userInquiryDraft";
import { clientCreateInquiry } from "../../api/inquiry";


export const fetchUserInquiryDrafts = createAsyncThunk(
    'userInquiryDrafts/fetchUserInquiryDrafts',
    async (userId, thunkAPI) => {
        try {
            const response = await clientGetAllUserInquiryDrafts(userId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
    
);

export const fetchUserInquiryDraftById = createAsyncThunk(
    'userInquiryDrafts/fetchUserInquiryDraftById',
    async (inquiryDraftId, thunkAPI) => {
        try {
            const response = await clientGetInquiryDraftById(inquiryDraftId);
            return response;
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
          
)

export const updateInquiryDraftQuantity = createAsyncThunk(
    'userInquiryDrafts/updateInquiryDraftQuantity',
    async (payload, thunkAPI) => {
        try {
          
            const response = await clientUpdateInquiryDraft(payload);
             return response;
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
    
)

export const createInquiryDraft = createAsyncThunk(
    'userInquiryDrafts/createInquiryDraft',
    async (payload, thunkAPI) => {
        try {
          
            const response = await clientCreateInquiryDraft(payload);
            return response;
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteInquiryDraft = createAsyncThunk(
    'userInquiryDrafts/deleteInquiryDraft',
    async(payload, thunkAPI) => {
        try {
       
            const response = await clientDeleteInquiryDraft(payload);
            const inquiryDraftId = response.inquiryDraftId;
           
            return inquiryDraftId;
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }

    }
)

export const clearDraftInquiries = createAsyncThunk(
    'userInquiryDrafts/clearDraftInquiries',
    async (userId, thunkAPI) => {
    
        try {
            const response = await clientClearDraftInquiries(userId);
            return response;
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }

)


/**
 * 
 * A METHOD TO SUBMIT THE ACTUAL INQUIRY AFTER AN INQUIRY DRAFT IS COMPLETE
 */

export const submitInquiry = createAsyncThunk(
    'inquiry/submitInquiry',
   async (payload, thunkApi)  => {
   
    try {
       const response = await clientCreateInquiry(payload);

      if(response.status === 201){
        return response.data.inquiryId; 
       }
    } catch (error) {
     
      return thunkApi.rejectWithValue(error.message);
    }
   }
  );