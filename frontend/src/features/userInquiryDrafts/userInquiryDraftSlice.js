import { createSlice } from "@reduxjs/toolkit"
import { clearDraftInquiries, createInquiryDraft, deleteInquiryDraft, fetchUserInquiryDraftById, fetchUserInquiryDrafts } from "./userInquiryDraftThunks"

const initialState = {
    userInquiryDrafts: [],
    isLoading: false,
    error: null

}

const userInquiryDraftSlice = createSlice({
    name: 'userInquiryDrafts',
    initialState,
    reducers:{
        setUserInquiryDrafts: (state, action) => {
            state.userInquiryDrafts = action.payload
        },
        removeAllDraftInquiries: (state) => {
            state.userInquiryDrafts = []
        }

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserInquiryDrafts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchUserInquiryDrafts.fulfilled, (state, action) => {
            state.isLoading = false
            state.userInquiryDrafts = action.payload
        })
        .addCase(fetchUserInquiryDrafts.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })

        .addCase(fetchUserInquiryDraftById.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchUserInquiryDraftById.fulfilled, (state, action) => {
            state.isLoading = false
            state.userInquiryDrafts.map((draft) => {
                if(draft.id === action.payload.id){
                    draft = action.payload
                }
            })
        })
        .addCase(fetchUserInquiryDraftById.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        
        })

        .addCase(createInquiryDraft.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createInquiryDraft.fulfilled, (state, action) => {
            state.isLoading = false
            state.userInquiryDrafts.push(action.payload)
        })
        .addCase(createInquiryDraft.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })

        .addCase(deleteInquiryDraft.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteInquiryDraft.fulfilled, (state, action) => {
            state.isLoading = false
            state.userInquiryDrafts = state.userInquiryDrafts.filter((draft) => draft.id !== action.payload)
        })
        .addCase(deleteInquiryDraft.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })

        .addCase(clearDraftInquiries.pending, (state) => {
            state.isLoading = true
        })
        .addCase(clearDraftInquiries.fulfilled, (state, action) => {
            state.isLoading = false
            state.userInquiryDrafts = []
        })
        .addCase(clearDraftInquiries.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
  
    }
    
});

export const { setUserInquiryDrafts, removeAllDraftInquiries } = userInquiryDraftSlice.actions

export const selectUserInquiryDrafts = (state) => state.userInquiryDrafts.userInquiryDrafts

export default userInquiryDraftSlice.reducer;