import {useEffect, useState} from "react";

function GetHistorical(ticker, res, from, to, ind = "sma") {

	const [stockData, setStocks] = useState({});
	const finnhub = require('finnhub');

	const api_key = finnhub.ApiClient.instance.authentications['api_key'];
	api_key.apiKey = "cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220"
	const finnhubClient = new finnhub.DefaultApi()

	useEffect(() => {
		finnhubClient.technicalIndicator(ticker, res, from, to,
										 {}, (error, data, response) => {
				// console.log(data);
				setStocks(data);
			});
	}, []);
	// console.log(stockData);
	return(stockData);
}

export default GetHistorical;