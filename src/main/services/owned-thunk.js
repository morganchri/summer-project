import { createAsyncThunk } from "@reduxjs/toolkit";
import {getOwners, getOwnedStocks, userSellsStock, userBuysStock} from "../search/finnhubSearch";

export const buyThunk = createAsyncThunk(
	"user/buy", async (stockTicker) => {
		return await userBuysStock(stockTicker);
	});

export const sellThunk = createAsyncThunk(
	"user/sell", async (stockTicker) => {
		return await userSellsStock(stockTicker);
	});

export const getOwnedStocksThunk = createAsyncThunk(
	"user/getOwned", async (userID) => {
		return await getOwnedStocks(userID);
	});

export const getOwnersThunk = createAsyncThunk(
	"stocks/getOwners", async (ticker) => {
		return await getOwners(ticker);
	});

