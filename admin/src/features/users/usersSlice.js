export const adminResetPassword = createAsyncThunk(
    'users/adminResetPassword',
    async (id, thunkAPI) => {
      try {
        
        const response = await clientAdminResetUserPassword(id);
        if(response === true){
          toast.success('Password reset successfully');
          return response;
        }
      
      } catch (error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  )

  export const deleteUser = createAsyncThunk(
    'users/deleteuser',
    async (id, thunkAPI) => {
        try {
            const response = await clientDeleteUser(id);
            return response
        } catch (error) {
            console.error('Error deleting  user: ', error)
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const addNewUser = createAsyncThunk(
    'users/addNewUser',
    async (user,thunkAPI) => {
      try {
        const response = await clientCreateUser(user);
  
        return  response.data;
  
      } catch (error) {
        console.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  )

  export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, thunkAPI) => {
        try {
            const response  = await clientGetAllUsers();
            return response

        } catch (error) {
            console.error('Error fetching users: ',error)
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)