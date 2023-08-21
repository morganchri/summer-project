import axios from "axios";
// import "dotenv/config"

const request = axios.create({
								 withCredentials: true,
							 });

const FINNHUB_API_BASE = `https://finnhub.io/api/v1`;
const TOKEN = `token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220`
const FINNHUB_SEARCH = `search?${TOKEN}`;
const FINNHUB_QUOTE = `quote?${TOKEN}`
const FINNHUB_PROFILE = `profile2?${TOKEN}`
const SERVER_URL = `http://localhost:4000/api`;

export const fullSearch = async (query) => {
	const response = await axios.get(`${FINNHUB_API_BASE}/${FINNHUB_SEARCH}&q=${query}`);
	return response.data;
};

export const getQuote = async (ticker) => {
	const response = await axios.get(`${FINNHUB_API_BASE}/${FINNHUB_QUOTE}&symbol=${ticker}`)
	return response.data;
};

export const getCompanyInfo = async (ticker) => {
	const response = await axios.get(`${FINNHUB_API_BASE}/stock/${FINNHUB_PROFILE}&symbol=${ticker}`)
	return response.data;
}

export const getHistorical = async (ticker, from, to) => {
	const response = await axios.get(`${FINNHUB_API_BASE}/stock/candle?${TOKEN}&symbol=${ticker}&resolution=D&from=${from}&to=${to}`);
	return response.data
}

export const userLikesStock = async (stockTicker) => {
	console.log("STOCK TICKER FROM LIKE STOCK CLICK")
	console.log(stockTicker);
	const response = await request.post(`${SERVER_URL}/likes/like/${stockTicker}`, {stockTicker});
	return response.data;
};

export const userBuysStock = async (stockTicker) => {
	const response  = await request.post(`${SERVER_URL}/owned/buy/${stockTicker}`, {stockTicker});
	return response.data;
}

export const userSellsStock = async (stockTicker) => {
	const response  = await request.post(`${SERVER_URL}/owned/sell/${stockTicker}`, {stockTicker});
	return response.data;
}

export const getOwnedStocks = async (userID) => {
	const response  = await axios.get(`${SERVER_URL}/owned/${userID}/get`);
	return response.data;
}

export const getAllLikes = async (userID) => {
	const response  = await axios.get(`${SERVER_URL}/likes/${userID}/get`);
	return response.data;
}

// https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2021-09-01&to=2021-09-09&token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220
export const getCompanyNews = async (ticker) => {
	const today = new Date();
	let yesterday = new Date();
	yesterday = new Date(yesterday.setDate(today.getDate() - 1));
	const date = today.toISOString().split('T')[0];
	const date2 = yesterday.toISOString().split('T')[0];
	const response = await axios.get(`${FINNHUB_API_BASE}/company-news?${TOKEN}&symbol=${ticker}&from=${date2}&to=${date}`)
	return response.data;
}

export const getPeers = async (ticker) => {
	const response = await axios.get(`${FINNHUB_API_BASE}/stock/peers?${TOKEN}&symbol=${ticker}`)
	return response.data;
}

export const getOwners = async (ticker) => {
	const response = await axios.get(`${SERVER_URL}/owned/get/${ticker}`);
	return response.data;
}