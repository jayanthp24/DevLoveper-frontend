import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
	name: "connections",
	initialState: null,
	reducers: {
		addConnections: (state, actions) => actions.payload,
        removeConnections: (state, actions) => null
	},
});

export const { addConnections, removeConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
