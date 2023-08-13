// Need to install finnhub using npm install finnhub
import {useEffect, useState} from "react";
// import React from "react";
// import axios from "axios";

const GetQuote = (ticker) => {

    const [stockData, setStocks] = useState({});

    const finnhub = require('finnhub');

    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "cj4io81r01qq6hgdl21gcj4io81r01qq6hgdl220";
    const finnhubClient = new finnhub.DefaultApi();

    useEffect(() => {

        finnhubClient.quote(ticker, (error, data, response) => {
            setStocks(data);
        });
    }, []);

    return(stockData);
}

export default GetQuote;