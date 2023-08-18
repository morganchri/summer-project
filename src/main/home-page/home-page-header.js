import React, {useEffect, useState} from "react";
import {getOwnedStocks, getQuote} from "../search/finnhubSearch";
import {useSelector} from "react-redux";
import GetQuote from "../API/getQuote";

const HomePageHeader = () => {

	const { currentUser } = useSelector((state) => state.user);


	let [owned, setOwned] = useState({});

	const getOwned = async () => {
		const owned = await getOwnedStocks(currentUser._id);
		setOwned(owned);
	}

	useEffect(() => {
		getOwned();
	}, []);

	let total = 0;
	let change = 0;

	for (let key in owned.owned) {
		total += GetQuote(key).c * owned.owned[key];
		change += GetQuote(key).d * owned.owned[key];
	}

	const pct = (change/total)*100;

	return(
		<div>
			<h1 className={(change >= 0) ? "header-positive" : "header-negative"}>Hello, {currentUser.firstName}!</h1>
			<h2 className={(change >= 0) ? "header-positive" : "header-negative"}>${total.toFixed(2)} ({change.toFixed(2)}) {pct.toFixed(2)}%</h2>
		</div>
	)
}

export default HomePageHeader