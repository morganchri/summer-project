import axios from "axios";
// import "dotenv/config"

const request = axios.create({
								 withCredentials: true,
							 });

const API_URL = process.env.REACT_APP_SERVER_API_URL

const FINNHUB_API_BASE = `https://finnhub.io/api/v1`;
const TOKEN = `token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220`
const FINNHUB_SEARCH = `search?${TOKEN}`;
const FINNHUB_QUOTE = `quote?${TOKEN}`
const FINNHUB_PROFILE = `profile2?${TOKEN}`

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
	console.log("URL");
	console.log(`${FINNHUB_API_BASE}/stock/&symbol=${ticker}&resolution=D&from=${from}&to=${to}`)
	// const response = await axios.get(`${FINNHUB_API_BASE}/stock/&symbol=${ticker}&resolution=D&from=${from}&to=${to}`);
	// return response.data
}

export const userLikesStock = async (albumId, album) => {
	// const response = await request.post(`${API_URL}/${albumId}/likes`, album);
	// return response.data;
};