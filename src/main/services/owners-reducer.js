import {getOwnersThunk} from "./owned-thunk";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	stockOwners: [],
	loading: false
}


const ownersSlice = createSlice({
								   name: "owners",
								   initialState,
								   reducers: {},
								   extraReducers: {
									   [getOwnersThunk.fulfilled] : (state, {payload}) => {
										   state.loading = false;
										   state.stockOwners.push(payload[0])
									   },

								   }
							   });


// export const {buy, sell} = ownedSlice.actions;
export default ownersSlice.reducer;