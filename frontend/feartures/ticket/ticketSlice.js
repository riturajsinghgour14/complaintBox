import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const ticketSlice = createSlice({
    name : 'ticket',
    initialState : {
        tickets : [],
        ticket:{},
        isLoading : false,
        isError : false,
        isSuccess : false,
        message : "",
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getTickets.pending, (state,action) =>{
            state.isLoading = true; 
            state.isSuccess = false;
            state.isError = false; 
          })
          .addCase(getTickets.fulfilled, (state,action) =>{
            state.isLoading = false; 
            state.isSuccess = true;
            state.isError = false;
            state.tickets = action.payload;
          })
          .addCase(getTickets.rejected, (state,action) =>{
            state.isLoading = false; 
            state.isSuccess = false;
            state.isError = true; 
            state.message = action.payload;
          })

          .addCase(getTicket.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
          })
          .addCase(getTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.ticket = action.payload;
          })
          .addCase(getTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
          })

          .addCase(raiseTicket.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
          })
          .addCase(raiseTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.ticket = action.payload;
            state.action = [action.payload, ...state.tickets]
          })
          .addCase(raiseTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
          });
    },
        
});

export const getTickets = createAsyncThunk("FETCH/TICKETS", async(_,thunkAPI)=> {
    const token = thunkAPI.getState().auth.user.token; 
        try {
             return await ticketService.fetchTickets(token);
         } catch (error) {
            const message= error.response.data.err;
            return thunkAPI.rejectWithValue(message);
         }
    });
    
    export const getTicket = createAsyncThunk(
      "FETCH/TICKET",
      async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        try {
          return await ticketService.fetchTicket(id, token);
        } catch (error) {
          const message = error.response.data.err;
          return thunkAPI.rejectWithValue(message);
        }
      }
    );
    
    export const raiseTicket = createAsyncThunk(
      "ADD/TICKET",
      async (formData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        try {
          return await ticketService.addTicket(formData, token);
        } catch (error) {
          const message = error.response.data.err;
          return thunkAPI.rejectWithValue(message);
        }
      }
    );
        


export default ticketSlice.reducer;