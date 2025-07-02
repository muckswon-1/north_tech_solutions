import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientUpload } from "../../api/upload";


export const uploadImage = createAsyncThunk(
    'uploads/uploadImage',
    async (imageFile, thunkAPI) => {
       
        try {
           
            const response = await clientUpload(imageFile)
            return response;

        } catch (error) {
            thunkAPI.rejectWithValue('An error occured uploading image')
        }
    }
)


const initialState = {
    isLoading: false,
    uploadedImageUrl: null,
    error: null,
};

const uploadSlice = createSlice({
    name: 'uploads',
    initialState,
    reducers: {
        resetUploadState: (state) => {
            state.isLoading = false;
            state.uploadedImageUrl = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(uploadImage.pending,(state, action) => {
            state.isLoading = true;
          
        })
        .addCase(uploadImage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.uploadedImageUrl = action.payload;
    
        })
        .addCase(uploadImage.rejected,(state,action) => {
            state.isLoading = false;
            state.error = action.payload
        })
    }
})

export const {resetUploadState} = uploadSlice.actions;


export const selectUploadsImageUrl = (state) => state.uploads.uploadedImageUrl;
export const selectUploadsIsLoading = (state) => state.uploads.isLoading;
export const selectUploadsError = (state) => state.uploads.error;


export default uploadSlice.reducer;