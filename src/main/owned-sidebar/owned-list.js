import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import "./index.css"
// import {GetQuote, CompanyProfile} from "../API/FinnhubData"
import {Link} from "react-router-dom";
import {getCompanyInfo, getQuote} from "../search/finnhubSearch";


const OwnedStocksList = (owned) => {

	const ticker = Object.keys(owned['owned'])[0]

	const [companyName, setCompany] = useState({});
	const [quote, setQuote] = useState({});

	const fetchCompany = async () => {
		const company = await getCompanyInfo(ticker);
		setCompany(company);
	}

	const fetchQuote = async () => {
		const quote = await getQuote(ticker);
		setQuote(quote);
	}


	useEffect(() => {
		fetchCompany();
		fetchQuote()
	}, []);

	// const companyName = CompanyProfile(ticker);


	// const quote = GetQuote(ticker);

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
						<Link to={`/details/${ticker}`}>
							{stockName}<br/>
							{ticker}
						</Link>
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