import React, {useEffect, useState} from "react";
import * as finnhubSearch from "../search/finnhubSearch";
import TopLikedList from "./top-liked-list";
import TopOwnedList from "./top-owned-list";

function AnonHomePage() {

	const [likes, setLikes] = useState([]);
	const [allOwned, setOwn] = useState([]);

	const fetchLikes = async () => {
		const likes = await finnhubSearch.getLikes();
		setLikes(likes);
	}

	const fetchAllOwned = async () => {
		const owned = await finnhubSearch.getAllOwned();
		setOwn(owned);
	}

	useEffect(() => {
		fetchLikes();
		fetchAllOwned();
	}, []);


	let likesCounts = {};

	for (let i = 0; i < likes.length; i++) {
		if (likesCounts[likes[i]["stockTicker"]]) {
			likesCounts[likes[i]["stockTicker"]] += 1;
		}
		if (!likesCounts[likes[i]["stockTicker"]]) {
			likesCounts = {...likesCounts, [likes[i]["stockTicker"]]: 1}
		}
	}

	let vals = Object.values(likesCounts)
	const max = Math.max(...vals);
	for (let key in likesCounts) {
		if (likesCounts[key] !== max) {
			delete likesCounts[key]
		}
	}

	let likesToDisplay = []
	for (let key in likesCounts) {
		likesToDisplay.push(key);
	}

	console.log("ALL OWNED ANON")
	console.log(allOwned);

	let own = {}

	for (let i=0; i<allOwned.length; i++) {
		console.log("ALL OWNED ITERATION");
		console.log(allOwned[i].owned);
		for (let key in allOwned[i].owned) {
			if (own[key]) {
				own[key] += allOwned[i].owned[key];
			}
			if (!own[key]) {
				own[key] = allOwned[i].owned[key];
			}
		}
	}

	console.log("OWN LIST FOR HOME PAGE");
	console.log(own);

	let ownVals = Object.values(own)
	const maxOwn = Math.max(...ownVals);
	for (let key in own) {
		if (own[key] !== maxOwn) {
			delete own[key]
		}
	}

	let ownToDisplay = []
	for (let key in own) {
		ownToDisplay.push(key);
	}




	return (
		<div>
			<div>
				<h1>Please log in or register</h1>
			</div>
			<div className={"most-liked-or-owned-formatting"}>
				<div className={"row"}>
					<div className={"col-6"}>
						<ul className="list-group">
							<li className="list-group-item">
								<h3>Most Owned Stocks</h3>
							</li>
							{
								ownToDisplay.map(ticker =>
													   <TopOwnedList
														   // key={ticker.key}
														   owned={ticker}/>
								)
							}
						</ul>
					</div>
					<div className={"col-6"}>
					<ul className="list-group">
						<li className="list-group-item">
							<h3>Most Liked Stocks</h3>
						</li>
						{
							likesToDisplay.map(ticker =>
										  <TopLikedList
											  // key={ticker.key}
											  liked={ticker}/>
							)
						}
					</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AnonHomePage;