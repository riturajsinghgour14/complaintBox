import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const adminSlice = createSlice({
    name : 'admin',
    initialState: {
        users :[],
        complaints:[] ,
        isLoading : false,
        isError : false,
        isSuccess : false,
        message : "",
    },
    reducers : {},
    extraReducers: (builder) => {
      builder
      .addCase(getUsers.pending, (state,action) =>{
        state.isLoading = true; 
        state.isSuccess = false;
        state.isError = false; 
      })
      .addCase(getUsers.fulfilled, (state,action) =>{
        state.isLoading = false; 
        state.isSuccess = true;
        state.isError = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state,action) =>{
        state.isLoading = false; 
        state.isSuccess = false;
        state.isError = true; 
        state.message = action.payload;
        state.users = [];
      })

      .addCase(getComplaints.pending, (state,action) =>{
        state.isLoading = true; 
        state.isSuccess = false;
        state.isError = false; 
      })
      .addCase(getComplaints.fulfilled, (state,action) =>{
        state.isLoading = false; 
        state.isSuccess = true;
        state.isError = false;
        state.complaints = action.payload;
      })
      .addCase(getComplaints.rejected, (state,action) =>{
        state.isLoading = false; 
        state.isSuccess = false;
        state.isError = true; 
        state.message = action.payload;

      })
    }
});

// GetComplaints
export const getUsers = createAsyncThunk("FETCH/USERS", async(_,thunkAPI)=> {
const token = thunkAPI.getState().auth.user.token; 
    try {
         return await adminService.fetchUsers(token);
     } catch (error) {
        const message= error.response.data.err;
        return thunkAPI.rejectWithValue(message);
     }
})

// Fetch Complaints
export const getComplaints = createAsyncThunk("FETCH/COMPLAINTS", async(_,thunkAPI)=> {
  const token = thunkAPI.getState().auth.user.token; 
      try {
           return await adminService.fetchComplaints(token);
       } catch (error) {
          const message= error.response.data.err;
          return thunkAPI.rejectWithValue(message);
       }
  })



export default adminSlice.reducer;