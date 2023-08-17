import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import "./index.css"
import {GetQuote} from "../API/FinnhubData"
import {getCompanyInfo, getQuote} from "../search/finnhubSearch";


const LikedStocksList = (liked) => {

	// const ticker = Object.keys(liked['liked'])[0]
	console.log("Input Stock")
	console.log(liked)
	const ticker = liked.liked.stockTicker;
	// const companyName =

	const [companyName, setCompany] = useState({});
	const [quote, setQuote] = useState({});

	const fetchCompanyInfo = async () => {
		setCompany(await getCompanyInfo(ticker));
	}

	const fetchQuote = async () => {
		setQuote(await getQuote(ticker));
	}

	useEffect(() => {
		fetchCompanyInfo();
		fetchQuote();
	}, []);

	console.log("quote");
	console.log(quote)

	const stockName = companyName["name"];

	let price = quote['c'];
	price = Math.floor(price * 100)/100
	let change = quote['d'];
	change = Math.floor(change * 100)/100
	let pct = ((change/price)*100);
	pct = Math.floor(pct * 100)/100

	return(
		<li className="list-group-item">
			<div className="row">
				<div className="col-4">
					<div>
						{stockName}<br/>
						{ticker}
					</div>
				</div>
				<div className="col-8 owned_stocks_formatting">
					<div className={change >= 0 ? " gain-format" : "loss-format"}>
						${(price)}
						<br/> ${(change)} &nbsp;
						{(pct)}%  </div>
				</div>
			</div>
		</li>
	);
};

export default LikedStocksList;