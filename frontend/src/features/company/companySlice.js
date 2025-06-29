
import { createSlice } from "@reduxjs/toolkit";
import { createCompany, getMyCompany, updateCompany, verifyCompanyEmail } from "./companyThunks";



const  initialState = {
    company:  null,
    isLoading: false,
    verifiedEmail: false,
    verifiedPhone: false,
    companyProfileComplete: false,
    error: null
}

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCurrentCompany: (state, action) => {
            state.company = action.payload;
        },
        updateCompanyField: (state, action) => {
            const { field, value } = action.payload;
            state.company[field] = value;
        },
        setVerifiedEmail: (state, action) => {
            state.company.verifiedEmail = action.payload;
        },
        setVerifiedPhone: (state, action) => {
            state.company.verifiedPhone = action.payload;
        },
        setCompanyProfileComplete:(state, action) => {
            if(!state.company || !state.company.verifiedEmail || !state.company.verifiedPhone){
                state.companyProfileComplete = false;
            }else{
                state.companyProfileComplete = true;
            }
        }
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(createCompany.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createCompany.fulfilled, (state, action) => {
            state.isLoading = false;
            state.company = action.payload;
        })
        .addCase(createCompany.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        .addCase(updateCompany.pending, (state) => {
            state.isLoading = true;
        }
        )
        .addCase(updateCompany.fulfilled,(state, action) => {
            state.isLoading = false;
            state.company = action.payload;
        })
        .addCase(updateCompany.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        .addCase(getMyCompany.pending, (state) => {
            state.isLoading = true;
    })
    .addCase(getMyCompany.fulfilled,(state, action) => {
        state.isLoading = false;
        state.company = action.payload;
    })
    .addCase(getMyCompany.rejected,(state,action) => {
        state.isLoading = false;
        state.error = action.payload;
    })

    .addCase(verifyCompanyEmail.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(verifyCompanyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company = action.payload;
    })
    .addCase(verifyCompanyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    })
   
    }
        
    
})

export default companySlice.reducer;

export const { setCurrentCompany, updateCompanyField, setVerifiedEmail, setVerifiedPhone, setCompanyProfileComplete} = companySlice.actions;


export const selectCompanyIsLoading = (state) => state.company.isLoading;
export const selectCompany = (state) => state.company.company;
export const selectCompanyError = (state) => state.company.error;
export const selectCompanyVerifiedEmail = (state) => state.company.company?.verifiedEmail;
export const selectCompanyVerifiedPhone = (state) => state.company.company?.verifiedPhone;
export const selectCompanyProfileComplete = (state) => state.company?.companyProfileComplete;