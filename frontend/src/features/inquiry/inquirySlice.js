import { createSlice } from '@reduxjs/toolkit';

import toast from 'react-hot-toast';
import { submitInquiry } from './inquiriesThunk';


const initialState = {
  inquiryItems: [],
  isLoading: false,
  error: null,
};

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState,
  reducers: {
    addToInquiry: (state, action) => {
      const product = action.payload;
      const productExists = state.inquiryItems.find(
        (item) => item.id === product.id,
      );

      if (productExists) {
        productExists.quantity += product.quantity;
        toast.success('Product quantity updated in inquiry');
      } else {
        state.inquiryItems.push(product);
     
      }
      
    },
    removeFromInquiry: (state, action) => {
      const productId = action.payload;
      state.inquiryItems = state.inquiryItems.filter(
        (item) => item.id !== productId,
      );
      
    
    },
    clearInquiry: (state) => {
      state.inquiryItems = [];
      localStorage.removeItem('inquiryItems');
      toast.error('Inquiry cleared');
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
        state.inquiryItems = [];
        localStorage.removeItem('inquiryItems');
        state.error = null;
      })
      .addCase(submitInquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addToInquiry, removeFromInquiry, clearInquiry } =
  inquirySlice.actions;

export const selectIsInInquiry = (state, productId) => {
  return state.inquiry.inquiryItems.some((item) => item.id === productId);
};

export const selectInquiryItems = (state) => state.inquiry.inquiryItems;
export const selectInquiryLoading = (state) => state.inquiry.isLoading;
export const selectInquiryError = (state) => state.inquiry.error;

export default inquirySlice.reducer;
