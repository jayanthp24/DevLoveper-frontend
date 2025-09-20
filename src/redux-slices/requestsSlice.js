import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
	name: "requests",
	initialState: null,
	reducers: {
		addRequests: (state, action) => action.payload,
		removeRequest: (state, action) => {
			const newState = state.filter((req) => req._id != action.payload);
			return newState;
		},
		removeRequests: (state, action) => null
	},
});

export const { addRequests, removeRequest, removeRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
