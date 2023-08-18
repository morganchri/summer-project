import React, { useState, useEffect } from "react";
import * as finnhubSearch from "../search/finnhubSearch";
import 'bootstrap/dist/css/bootstrap.min.css';
import LineChart from "../home-page/line-chart";
import Chart from "chart.js/auto";
// import {useSelector} from "react-redux";
import "./index.css"
import ResearchLineChart from "./research-line-chart";
import jQuery from "jquery";

function LikedHomePage (liked) {

	let ticker = liked.liked.stockTicker;

	console.log("Ticker")
	console.log(ticker)

	// const { currentUser } = useSelector((state) => state.user);

	const [quote, setQuote] = useState({});
	const [info, setInfo] = useState({});
	const [chart, setChart] = useState();
	const [active, setActive] = useState("1d");

	const fetchQuote = async () => {
		const quote = await finnhubSearch.getQuote(ticker);
		setQuote(quote);
	}

	const fetchInfo = async () => {
		const info = await finnhubSearch.getCompanyInfo(ticker);
		setInfo(info)
	}

	useEffect(() => {
		fetchQuote();
		fetchInfo();
		setChart(<ResearchLineChart ticker={ticker}/>);
	}, []);

	useEffect(() => {
		jQuery(document).ready(function(){
			let to = (new Date());
			let from = (new Date());
			let dateOffset = 2;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			userAction(ticker, from, to, dateOffset);
			// let e = document.getElementById("myChart");
			// e.id = ticker;
		});

		window.onload = function(){
			if(!document.location.hash){
				window.location = "#loaded";
			}
		}
	}, [chart]);

	const userAction = async (ticker, from, to, dateOffset) => {
		let lineData = [];
		const hist = await finnhubSearch.getHistorical(ticker, from, to)
		if (lineData.length === 0) {
			lineData = hist.c;
			console.log("Data")
			console.log(lineData)
			lineData = lineData.slice(-dateOffset)
		}
		if (lineData.length !== 0) {
			// https://stackoverflow.com/questions/24094466/sum-two-arrays-in-single-iteration
			let extraData = hist.c;
			extraData = extraData.slice(-dateOffset);
			lineData.map(function (num, idx) {
				return num + extraData[idx];
			});
		}
		const ctx = Chart.getChart(ticker)
		ctx.data.labels = Array(lineData.length).fill(null).map((_, i) => i);
		ctx.data.datasets[0].data = lineData;
		ctx.update();
	}

	// useEffect(() => {
	//
	// 	// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
	// 	// getData(userInfo, dateOffset, res)
	//
	// }, []);




	const ctx = Chart.getChart(ticker)
	console.log("Research Chart");
	console.log(ctx)

	let change = quote.d;

	if (change >= 0) {
		// const ctx = document.getElementById('myChart').getContext("2d")
		ctx.data.datasets[0].backgroundColor = "rgba(50, 205, 50, 0.2)"
		ctx.data.datasets[0].borderColor = "rgba(50, 205, 50, 1)"
		ctx.update()
	}
	if (change < 0) {
		// const ctx = document.getElementById('myChart').getContext("2d")
		ctx.data.datasets[0].backgroundColor = "rgba(255,99,132,0.2)"
		ctx.data.datasets[0].borderColor = "rgba(255,99,132,1)"
		ctx.update()
	}

	const pillClickHandler = async (elem) => {
		await setActive(elem.target.id);
		const currentActive = elem.target.id;
		chartChangeClicker(currentActive);
	}

	const chartChangeClicker = (currentActive) => {
		let to = (new Date());
		let from = (new Date());
		if (currentActive === "1d") {
			let dateOffset = 2;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			userAction(ticker, from, to, dateOffset);
		}
		if (currentActive === "5d") {
			let dateOffset = 5;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			userAction(ticker, from, to, dateOffset);
		}
		if (currentActive === "7d") {
			let dateOffset = 7;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			userAction(ticker, from, to, dateOffset);
		}
		if (currentActive === "2w") {
			let dateOffset = 14;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			userAction(ticker, from, to, dateOffset);
		}
		if (currentActive === "1m") {
			let dateOffset = 30;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			userAction(ticker, from, to, dateOffset);
		}
		if (currentActive === "3m") {
			let dateOffset = 90;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			userAction(ticker, from, to, dateOffset);
		}
		if (currentActive === "6m") {
			let dateOffset = 180;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			userAction(ticker, from, to, dateOffset);
		}
		if (currentActive === "1y") {
			let dateOffset = 365;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23, 59, 59, 0);
			from.setHours(0, 0, 0, 0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			userAction(ticker, from, to, dateOffset);
		}
	}

	return (
		<div>
			<div className="details-formatting chart-margin-top">
				<h2 className={(change >= 0) ? "header-positive" : "header-negative"}>
					<img src={info.logo} alt={info.name} className="rounded" /> {info.name} &nbsp;
					${quote.c} (${quote.d}) {quote.dp}%
				</h2>
				<canvas id={ticker} className="graph-margin-bottom"></canvas>
				{chart}
				<ul className={(change >= 0) ? "nav nav-pills nav-justified pill_nav_class_positive" : "nav nav-pills nav-justified pill_nav_class_negative"}>
					<li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
						<button id='1d' className={`nav-link ${active === "1d" ? "active" : ""}`} onClick={pillClickHandler}>1 Day</button>
					</li>
					<li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
						<button id='5d' className={`nav-link ${active === "5d" ? "active" : ""}`} onClick={pillClickHandler}>5 Days</button>
					</li>
					<li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
						<button id='7d' className={`nav-link ${active === "7d" ? "active" : ""}`} onClick={pillClickHandler}>7 Days</button>
					</li>
					<li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
						<button id='2w' className={`nav-link ${active === "2w" ? "active" : ""}`} onClick={pillClickHandler}>2 Weeks</button>
					</li>
					<li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
						<button id='1m' className={`nav-link ${active === "1m" ? "active" : ""}`} onClick={pillClickHandler}>1 Month</button>
					</li>
					<li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
						<button id='3m' className={`nav-link ${active === "3m" ? "active" : ""}`} onClick={pillClickHandler}>3 Months</button>
					</li>
					<li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
						<button id='6m' className={`nav-link ${active === "6m" ? "active" : ""}`} onClick={pillClickHandler}>6 Months</button>
					</li>
					<li className={(change >= 0) ? "positive nav-item pos-color" : "negative nav-item neg-color"}>
						<button id='1y' className={`nav-link ${active === "1y" ? "active" : ""}`} onClick={pillClickHandler}>1 Year</button>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default LikedHomePage;