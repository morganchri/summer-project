import {useEffect, useState} from "react";
import axios from "axios";

const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220";
const finnhubClient = new finnhub.DefaultApi();

export const GetQuote = (ticker) => {

	const [stockData, setStocks] = useState({});

	useEffect(() => {

		finnhubClient.quote(ticker, (error, data, response) => {
			// console.log(response)
			setStocks(data);
		});
	}, []);

	return(stockData);
}

export const GetHistorical = (ticker, res, from, to, ind = "macd") => {

	const [stockData, setStocks] = useState({});

	// useEffect(() => {
	// finnhubClient.setRequestHeader('Authorization', null);
	// finnhubClient.technicalIndicator(ticker, res, from, to, ind, {}, (error, data, response) => {
	// 		console.log("Hist Data")
	// 		console.log(data);
	// 		// setStocks(data);
	// 	});

	// To get JSON manually
	// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
	// const userAction = async () => {
	// 	const response = await fetch(`https://finnhub.io/api/v1/indicator?token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220&symbol=${ticker}&resolution=${res}&from=${from}&to=${to}&indicator=macd`);
	// 	const myJson = await response.json(); //extract JSON from the http response
	// 	console.log("Historical Response")
	// 	console.log(myJson)
	// 	setStocks(myJson);
	// }
	// userAction();

	// function getData() {
	// 	let url =  `https://finnhub.io/api/v1/indicator?token=cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220&symbol=${ticker}&resolution=${res}&from=${from}&to=${to}&indicator=macd`;
	// 	axios.get(url)
	// 		.then((res)=> {
	// 			setStocks(res.data.items);
	// 		})
	// 		.catch(err=>{console.log(err);});
	// }
	//
	// useEffect(() => {
	// 	getData()
	// },[])


	return(stockData);
}

export const CompanyProfile = (ticker) =>  {

	const [data, setData] = useState({});

	useEffect(() => {
		finnhubClient.companyProfile2({"symbol": ticker}, (error, data, response) => {
			console.log(data)
			setData(data)
			// return(data);
		});
	}, []);

	return (data);
};