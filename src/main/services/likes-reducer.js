import {getLikesThunk, likeThunk} from "./likes-thunk"
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	likes: {},
	loading: false
}

const likesSlice = createSlice({
	name: "likes",
	initialState,
	reducers: {},
	extraReducers: {
		[likeThunk.fulfilled] : (state, {payload}) => {
			state.loading = false;
			state.likes = {...payload}
		},
	}
});

export default likesSlice.reducer;