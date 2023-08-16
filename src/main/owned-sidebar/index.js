import React from ".";
import OwnedStocksList from "./owned-list";
import {useSelector} from "react-redux";
import {getOwnedStocks} from "../search/finnhubSearch";
import {useEffect, useState} from "react";

const OwnedStocks = () => {

	const { currentUser } = useSelector((state) => state.user);

	let [ownedArray, setOwned] = useState({});

	const getOwned = async () => {
		console.log("User ID");
		console.log(currentUser._id)
		const owned = await getOwnedStocks(currentUser._id)
		console.log("Owned");
		console.log(owned);
		setOwned(owned);
	}

	useEffect(() => {
		getOwned();
	}, []);





	let owned = [];

	if ((ownedArray !== undefined)) {
		for (let key in ownedArray.owned) {
			let pair = {}
			pair[key] = ownedArray.owned[key]
			owned.push(pair)
		}
		// owned = Object.values(owned).filter(own => own.value !== 0);
		for (let i =0; i < owned.length; i++) {
			for (let key in owned[i]) {
				// console.log(key)
				// console.log(owned)
				if (owned[i][key] === 0) {
					owned.splice(i, 1)
				}
			}
		}
		console.log("All Owned")
		console.log(owned);
		return (
			<ul className="list-group">
				<li className="list-group-item">
					<h3>Owned Stocks</h3>
				</li>
				{
					owned.map(ticker =>
								  <OwnedStocksList
									  key={ticker.key}
									  owned={ticker}/>
					)
				}
			</ul>
		);
	} else {
		return (
			<div>
				<h3>No Stocks Owned Yet</h3>
			</div>
		)
	}
};
export default OwnedStocks;