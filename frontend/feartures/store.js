import { configureStore } from "@reduxjs/toolkit";
import authReducer from"./auth/authSlice";
import adminReducer from "./admin/adminslice";
import ticketSlice from "./Ticket/TicketSlice";
const store = configureStore ({
    reducer  : {
        auth : authReducer,
        admin : adminReducer,
        ticket : ticketSlice,
    },
});

export default store;
