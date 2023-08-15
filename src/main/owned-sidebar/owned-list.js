import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import "./index.css"
import {GetQuote, CompanyProfile} from "../API/FinnhubData"


const OwnedStocksList = (owned) => {

	const ticker = Object.keys(owned['owned'])[0]
	const companyName = CompanyProfile(ticker);
	const stockName = companyName["name"];

	const quote = GetQuote(ticker);

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