import {buyThunk, sellThunk, getOwnedStocksThunk} from "./owned-thunk";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	ownedStocks: {},
	loading: false
}


const ownedSlice = createSlice({
	name: "owned",
	initialState,
	reducers: {},
	extraReducers: {
		[buyThunk.fulfilled] : (state, {payload}) => {
			state.loading = false;
			state.ownedStocks = {...payload}
		},
		[sellThunk.fulfilled] : (state, {payload}) => {
			state.loading = false;
			state.ownedStocks = {...payload}
		},
		[getOwnedStocksThunk.fulfilled] : (state, {payload}) => {
			state.loading = false;
			state.ownedStocks = {...payload}
		},
	}
});


// export const {buy, sell} = ownedSlice.actions;
export default ownedSlice.reducer;