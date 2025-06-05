
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { clientCreateInquiry } from '../../api/inquiry';

export const submitInquiry = createAsyncThunk(
  'inquiry/submitInquiry',
  async (userInfo, { rejectWithValue, dispatch }) => {
    try {
      const response = await clientCreateInquiry(userInfo);
      if (!response.inquiryId) {
        throw new Error('Inquiry submission failed');
      }
      dispatch(clearInquiry());
    
      return response.inquiryId;
    } catch (error) {
      console.error(error);
     
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  inquiryItems: JSON.parse(localStorage.getItem('inquiryItems')) || [],
  isLoading: false,
  error: null,
};

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState,
  reducers: {
    addToInquiry: (state, action) => {
      const product = action.payload;
      const productExists = state.inquiryItems.find((item) => item.id === product.id);

      if (productExists) {
        productExists.quantity += product.quantity;
      } else {
        state.inquiryItems.push(product);
      }
      localStorage.setItem('inquiryItems', JSON.stringify(state.inquiryItems));
    },
    removeFromInquiry: (state, action) => {
      const productId = action.payload;
      state.inquiryItems = state.inquiryItems.filter((item) => item.id !== productId);
      localStorage.setItem('inquiryItems', JSON.stringify(state.inquiryItems));
    },
    clearInquiry: (state) => {
      state.inquiryItems = [];
      localStorage.removeItem('inquiryItems');
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(submitInquiry.pending, (state) => {
            state.isLoading = true;
      state.error = null;
    })
    .addCase(submitInquiry.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    })
    .addCase(submitInquiry.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { addToInquiry, removeFromInquiry, clearInquiry } = inquirySlice.actions;

export const selectIsInInquiry = (state, productId) => {
  return state.inquiry.inquiryItems.some((item) => item.id === productId);
};

export const selectInquiryItems = (state) => state.inquiry.inquiryItems;
export const selectInquiryLoading = (state) => state.inquiry.isLoading;
export const selectInquiryError = (state) => state.inquiry.error;


export default inquirySlice.reducer;
