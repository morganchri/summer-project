import React, {useEffect, useState} from "react";
import {getAllLikes} from "../search/finnhubSearch";
import {useSelector} from "react-redux";
import LikedHomePage from "./research-home-page";
import TopOwnedList from "./top-owned-list";
import TopLikedList from "./top-liked-list";
import * as finnhubSearch from "../search/finnhubSearch";

const LikeHomePage = () => {

	const { currentUser } = useSelector((state) => state.user);

	// const [liked, setLikedList] = useState([])
	const [likedArray, setLiked] = useState({});
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


	const getLiked = async () => {
		console.log("User ID");
		console.log(currentUser._id)
		const liked = await getAllLikes(currentUser._id);
		console.log("Liked");
		console.log(liked);
		setLiked(liked);
	}

	useEffect(() => {
		getLiked();
	}, []);

	console.log("liked stocks")
	console.log(likedArray)

	let liked = [];

	if ((likedArray !== null)) {
		for (let i = 0; i < likedArray.length; i++) {
			if (likedArray[i].user === currentUser._id) {
				liked.push({stockTicker: likedArray[i].stockTicker});
			}
		}
		console.log("All Liked")
		console.log(liked);
		return(
			<div className={"text-center research-header-formatting"}>
				<h1>Hi {currentUser.firstName}! Here is your current research info.</h1>
				<div>
					{liked.map(ticker => <LikedHomePage key={ticker.key} liked={ticker}/>)}
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
		)
	} else {
		return(
		<div>
			<h1>Like A Stock To See More Info</h1>
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
		)
	}

}

export default LikeHomePage;