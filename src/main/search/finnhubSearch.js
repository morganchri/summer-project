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

export const userLikesStock = async (userid, stockTicker) => {
	const response = await request.post(`${SERVER_URL}/likes/${stockTicker}/like`, {userid, stockTicker});
	return response.data;
};

export const userBuysStock = async (userID, stockTicker) => {
	const response  = await request.post(`${SERVER_URL}/owned/${stockTicker}/buy`, {userID, stockTicker});
	return response.data;
}

export const userSellsStock = async (userID, stockTicker) => {
	const response  = await request.post(`${SERVER_URL}/owned/${stockTicker}/sell`, {userID, stockTicker});
	return response.data;
}

export const getOwnedStocks = async (userID) => {
	console.log("Sent ID")
	console.log(userID)
	console.log("URL");
	console.log(`${SERVER_URL}/owned/${userID}/get`)
	console.log(await axios.get(`${SERVER_URL}/owned/${userID}/get`))
	const response  = await axios.get(`${SERVER_URL}/owned/${userID}/get`);
	console.log("Data");
	console.log(response.data);
	return response.data;
}

export const getAllLikes = async (userID) => {
	const response  = await axios.get(`${SERVER_URL}/likes/${userID}/get`);
	return response.data;
}