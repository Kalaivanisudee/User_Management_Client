import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialValues = {
  users: [],
  loading: true,
};

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const response = await axios.get("https://user-management-server-nytl.onrender.com/api/v1/users");
  return response.data;
});

const userSlice = createSlice({
    name: 'userslice',
    initialState: initialValues,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllUsers.pending, (state) => {
          state.loading = true;
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
          state.users = action.payload;
          state.loading = false;
        })
        .addCase(getAllUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default userSlice.reducer;
