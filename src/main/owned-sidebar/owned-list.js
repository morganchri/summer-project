import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import "./index.css"
import {GetQuote, CompanyProfile, GetHistorical} from "../API/FinnhubData"
import { useSelector } from "react-redux";


const OwnedStocksList = (owned) => {

	const { currentUser } = useSelector((state) => state.user);

	const ticker = Object.keys(owned['owned'])[0]
	const companyName = CompanyProfile(ticker);
	// console.log("COMPANY NAME");
	// console.log(companyName);
	const stockName = companyName["name"];
	// console.log("COMPANY NAME");
	// console.log(stockName);
	// stockName = stockName.split(' ')[0];

	const quote = GetQuote(ticker);

	// console.log("QUOTE");
	// console.log(quote)

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

export default OwnedStocksList;