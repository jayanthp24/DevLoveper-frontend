import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux-slices/userSlice";
import feedReducer from "../redux-slices/feedSlice"
import connectionsReducer from "../redux-slices/connectionsSlice"
import requestsReducer from "../redux-slices/requestsSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionsReducer,
        requests: requestsReducer
    },
});

export default appStore;