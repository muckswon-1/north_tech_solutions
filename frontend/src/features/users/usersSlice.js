import { createSlice } from "@reduxjs/toolkit";
import { fetchUserById, updateUser } from "./usersThunks";





const initialState = {
    currentUser: null,
    isCompleteUserInfo: false,
    isLoading: false,
    error: null
}


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      setCurrentUser: (state, action) => {
        state.currentUser = action.payload;
        
      },
      updateUserInfo: (state, action) => {
        const { field, value } = action.payload;
        if (!state.currentUser) {
          state.currentUser = {};
        }

        state.currentUser[field] = value;
      },
      clearUserStatus: (state) => {
        state.userUpdated = false;
        state.error = null;
      },

      setIsCompleteUserInfo: (state) => {
        // if any fields of current user are null, set isCompleteUserInfo false
        const user = state.currentUser;
        if(!user) {
          state.isCompleteUserInfo = false;
        }

        if(!user?.firstName || !user?.lastName || !user?.email) {
          state.isCompleteUserInfo = false;
        } else {
          state.isCompleteUserInfo = true;
        }
        

      }
    },
    extraReducers: (builder) => {
      builder
        // Fetch user by ID
        .addCase(fetchUserById.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchUserById.fulfilled, (state, action) => {
          state.isLoading = false;
          state.currentUser = action.payload;
        })
        .addCase(fetchUserById.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        })


        // Update user
        .addCase(updateUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.currentUser = action.payload
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.isLoading = false;
          state.userUpdated = false;
          state.error = action.payload;
        })
    },
  });


  

  export const selectUserLoading = state => state.users.isLoading;
  export const selectIsCompleteUserInfo = state => state.users.isCompleteUserInfo;
  export const selectCurrentUser = state => state.users.currentUser;
  export const selectUserError = state => state.users.error;
 

  

  export const {clearUserStatus, updateUserInfo, setIsCompleteUserInfo, setCurrentUser } = usersSlice.actions;

  export default usersSlice.reducer;