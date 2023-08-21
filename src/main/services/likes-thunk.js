import { createAsyncThunk } from "@reduxjs/toolkit";
import {getAllLikes, userLikesStock} from "../search/finnhubSearch"

export const getLikesThunk = createAsyncThunk(
	"likes/get", async (userID) => {
		return await getAllLikes(userID);
	});

export const likeThunk = createAsyncThunk(
	"likes/like", async (ticker) => {
		return await userLikesStock(ticker);
	});