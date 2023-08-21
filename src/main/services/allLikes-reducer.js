import {getLikesThunk} from "./likes-thunk"
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	allLikes: [],
	loading: false
}

const allLikesSlice = createSlice({
								   name: "allLikes",
								   initialState,
								   reducers: {},
								   extraReducers: {
									   [getLikesThunk.fulfilled] : (state, {payload}) => {
										   state.loading = false;
										   state.allLikes = payload;
									   },
								   }
							   });

export default allLikesSlice.reducer;