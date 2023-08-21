import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as finnhubSearch from "./finnhubSearch";
import 'bootstrap/dist/css/bootstrap.min.css';
import LineChart from "../home-page/line-chart";
import Chart from "chart.js/auto";
import {useDispatch, useSelector} from "react-redux";
import "./index.css"
import jQuery from "jquery";
import FollowerList from "../user/follower-list";
import {getOwners, userSellsStock} from "./finnhubSearch";
import OwnersList from "./owners-list";
import {buyThunk, getOwnedStocksThunk, getOwnersThunk, sellThunk} from "../services/owned-thunk";
import {getLikesThunk, likeThunk} from "../services/likes-thunk";

function Details () {

	const { currentUser } = useSelector((state) => state.user);
	const { ownedStocks } = useSelector((state) => state.ownedStocks);
	const { stockOwners } = useSelector((state) => state.stockOwners);
	const { allLikes } = useSelector((state) => state.allLikes);
	const { userlikes }  = useSelector((state) => state.likes);

	const dispatch = useDispatch();

	// const userID = currentUser._id;

	const { id } = useParams();

	let owners = [...new Set(stockOwners)];
	owners = owners.filter(e => e !== undefined);

	useEffect(() => {
		dispatch(getOwnersThunk(id));
	}, []);

	console.log("STOCK OWNERS FROM THUNK CALL")
	console.log(stockOwners);

	const [quote, setQuote] = useState({});
	const [info, setInfo] = useState({});
	const [chart, setChart] = useState();
	const [active, setActive] = useState("1d");
	const [cVol, setVol] = useState(0);
	const [news, setNews] = useState("");
	const [peers, setPeers] = useState([]);
	const [owned, setOwned] = useState(null);
	const [likes, setLikes] = useState([]);
	// const [owners, setOwners] = useState({});

	const fetchQuote = async () => {
		const quote = await finnhubSearch.getQuote(id);
		setQuote(quote);
	}

	const fetchInfo = async () => {
		const info = await finnhubSearch.getCompanyInfo(id);
		setInfo(info);
	}

	const fetchVolume = async () => {
		let to = (new Date());
		let from = (new Date());
		let dateOffset = 2;
		from.setDate(to.getDate() - dateOffset);
		to.setHours(23,59,59,0);
		from.setHours(0,0,0,0);
		to = new Date(to).getTime();
		from = new Date(from).getTime();
		const vol  = await finnhubSearch.getHistorical(id, from, to);
		setVol(vol.v[vol.v.length - 1]);
	}

	const fetchNews = async () => {
		const headline = await finnhubSearch.getCompanyNews(id);
		setNews(headline[0]);
	}

	const fetchPeers = async () => {
		const peers = await finnhubSearch.getPeers(id);
		setPeers(peers);
	}

	const fetchOwned = async () => {
		if (currentUser._id) {
			const owned = await finnhubSearch.getOwnedStocks(currentUser);
			setOwned(owned);
		}
	}

	const fetchLikes = async () => {
		if (currentUser._id) {
			const likes = await finnhubSearch.getAllLikes(currentUser);
			setLikes(likes);
		}
	}

	// const fetchOwners = async () => {
	// 	const owners = await finnhubSearch.getOwners(id);
	// 	console.log("ALL OWNERS");
	// 	console.log(owners);
	// 	setOwners(owners);
	// }

	useEffect(() => {
		fetchQuote();
		fetchInfo();
		fetchVolume();
		fetchNews();
		fetchPeers();
		if (currentUser) {
			fetchOwned();
			fetchLikes();
		}
		// fetchOwners();
		setChart(<LineChart/>);
	}, [id]);

	useEffect(() => {
		// https://stackoverflow.com/questions/34338411/how-to-import-jquery-using-es6-syntax
		jQuery(document).ready(function(){
			let to = (new Date());
			let from = (new Date());
			let dateOffset = 2;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			userAction(id, from, to, dateOffset);
		});
	}, [chart]);

	const userAction = async (id, from, to, dateOffset) => {
		if (chart) {
			const ctx = Chart.getChart("myChart")
			let lineData = [];
			const hist = await finnhubSearch.getHistorical(id, from, to)
			if (lineData.length === 0) {
				lineData = hist.c;
				// console.log("Data")
				// console.log(lineData)
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
			ctx.data.labels = Array(lineData.length).fill(null).map((_, i) => i);
			ctx.data.datasets[0].data = lineData;
			ctx.update();
		}
	}

	const ctx = Chart.getChart("myChart")

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
			// getData(userInfo, dateOffset, res)
			userAction(id, from, to, dateOffset);
		}
		if (currentActive === "5d") {
			let dateOffset = 5;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			// getData(userInfo, dateOffset, res)
			userAction(id, from, to, dateOffset);
		}
		if (currentActive === "7d") {
			let dateOffset = 7;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			// getData(userInfo, dateOffset, res)
			userAction(id, from, to, dateOffset);
		}
		if (currentActive === "2w") {
			let dateOffset = 14;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			// getData(userInfo, dateOffset, res)
			userAction(id, from, to, dateOffset);
		}
		if (currentActive === "1m") {
			let dateOffset = 30;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			// getData(userInfo, dateOffset, res)
			userAction(id, from, to, dateOffset);
		}
		if (currentActive === "3m") {
			let dateOffset = 90;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			// getData(userInfo, dateOffset, res)
			userAction(id, from, to, dateOffset);
		}
		if (currentActive === "6m") {
			let dateOffset = 180;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23,59,59,0);
			from.setHours(0,0,0,0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			// getData(userInfo, dateOffset, res)
			userAction(id, from, to, dateOffset);
		}
		if (currentActive === "1y") {
			let dateOffset = 365;
			from.setDate(to.getDate() - dateOffset);
			to.setHours(23, 59, 59, 0);
			from.setHours(0, 0, 0, 0);
			to = new Date(to).getTime();
			from = new Date(from).getTime();
			// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
			// getData(userInfo, dateOffset, res)
			userAction(id, from, to, dateOffset);
		}
	}

	const checkDisabled = () => {
		// console.log("Likes");
		// console.log(likes);
		// console.log("Owned");
		// console.log(owned);
		const userLikes = likes.filter(like => like.user === currentUser._id)
		// console.log("User Likes");
		// console.log(userLikes);
		if (owned) {
			const userOwned = owned.owned[id];
			// console.log("User Owned");
			// console.log(userOwned);
			if (userOwned === 0) {
				document.getElementById("sellButton").disabled = true;
			}
			if (userOwned !== 0) {
				document.getElementById("sellButton").disabled = false;
			}
		}
		if (userLikes[id]) {
			document.getElementById("likeButton").disabled = true;
		} else {
			document.getElementById("likeButton").disabled = false;
		}
	}

	useEffect(() => {
		if(currentUser) {
			checkDisabled();
			dispatch(getLikesThunk(currentUser._id));
		}
		}, [owned, likes, ownedStocks, userlikes]);

	return (
		<div>
			<div className="details-formatting">
				<h2 className={(change >= 0) ? "positive" : "negative"}>
					<img src={info.logo} alt={info.name} className="rounded" /> {info.name} &nbsp; {id} &nbsp;
					${quote.c} (${quote.d}) {quote.dp}%
				</h2>
				<canvas id="myChart"></canvas>
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
				{(currentUser && currentUser.role === "professional") && <div>
					<table className="table">
						<thead>
						<tr>
							<th scope="col">Market Cap</th>
							<th scope="col">Company Website</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>${(Math.round(info.marketCapitalization)
								   / 1000).toLocaleString()} Billion
							</td>
							<td>{info.weburl}</td>
						</tr>
						</tbody>
					</table>
				</div>}
				{(currentUser && currentUser.role === "professional") && <div>
					<table className="table">
						<thead>
						<tr>
							<th scope="col">Current Volume</th>
							<th scope="col">Top Headline</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>{cVol.toLocaleString()}</td>
							<td>{news.headline}</td>
						</tr>
						</tbody>
					</table>
				</div>}
				{(currentUser && currentUser.role === "professional") && <div>
					<table className="table">
						<thead>
						<tr>
							<th scope="col">Peers</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>{peers.join(', ')}</td>
						</tr>
						</tbody>
					</table>
				</div>}
			</div>
			<div>
				{currentUser && <button id={"likeButton"}
					onClick={() => {
						// jQuery.ajax({
						// 				url:finnhubSearch.userLikesStock(currentUser._id, id),
						// 				success:function(){
						// 					// fetchOwned();
						// 					checkDisabled();
						// 				}
						// 			})
						dispatch(likeThunk(id));
						checkDisabled();
						if (currentUser) {
							dispatch(getLikesThunk(currentUser._id));
						}
					}}
					className="btn btn-success float-end button-hover-format">
					Like
				</button>}
				{(currentUser && (currentUser.role !== "researcher")) && <button id={"buyButton"}
					onClick = {async () => {
						// jQuery.ajax({
						// 		   url:await finnhubSearch.userBuysStock(currentUser._id, id),
						// 		   success:function(){
						// 			   // fetchOwned();
						// 			   checkDisabled();
						// 		   }
						// 	   })
						// finnhubSearch.userBuysStock(currentUser._id, id);
						// fetchOwned();
						dispatch(buyThunk(id));
						checkDisabled();
						if (currentUser) {
							dispatch(getOwnedStocksThunk(currentUser._id));
						}
						dispatch(getOwnersThunk(id));

					}}
					className="btn buy-button-format btn-success button-hover-format">
					Buy
				</button>}
				{(currentUser && (currentUser.role !== "researcher")) && <button id={"sellButton"}
					onClick = {async () => {
					// 	jQuery.ajax({
					// 					url:await finnhubSearch.userSellsStock(currentUser._id, id),
					// 					success:function(){
					// 						// fetchOwned();
					// 						checkDisabled();
					// 					}
					// 				})
						dispatch(sellThunk(id));
						checkDisabled();
						if (currentUser) {
							dispatch(getOwnedStocksThunk(currentUser._id));
						}
						dispatch(getOwnersThunk(id));
					}}
					className="btn sell-button-format btn-success button-hover-format">
					Sell
				</button>}
			</div>
			<div className={"owned-list-formatting"}>
				<ul className="list-group">
					<li className="list-group-item">
						<h3>
							Who Owns This Stock:
						</h3>
					</li>
					{(owners.length > 0) && owners.map(owner =>
																 <OwnersList
																	 // key={owner.key}
																	 owner={owner}/>
					)}
					{(owners.length === 0) && <h5 className={"text-center"}>No Owners Yet</h5>}
				</ul>
			</div>
		</div>
	)
}

export default Details;