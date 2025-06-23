export const loginAdmin = createAsyncThunk(
    'userPasswordAuth/loginAdmin',
    async (userCredentials, thunkAPI) => {
      try {
        const response = await clientAdminLogin(userCredentials);
        toast.success('Logged in successfully.')
        return response;
      } catch (error) {
        console.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    },
  );