import React from ".";
import OwnedStocksList from "./owned-list";
import {useSelector} from "react-redux";
import {getOwnedStocks} from "../search/finnhubSearch";
import {useEffect, useState} from "react";
import companyProfile from "../API/CompanyProfile";

const OwnedStocks = () => {

	const { currentUser } = useSelector((state) => state.user);

	let [ownedArray, setOwned] = useState({});

	const getOwned = async () => {
		const owned = await getOwnedStocks(currentUser._id);
		setOwned(owned);
	}

	useEffect(() => {
		getOwned();
	}, []);

	let owned = [];

	console.log("OwnedArray")
	console.log(ownedArray);

	// for(let i in ownedArray.owned) {
	// 	if (ownedArray.owned[i] !== 0) {
	// 		console.log("NOT ZERO");
	// 		console.log(i)
	// 	} else {
	// 		console.log("ZERO");
	// 		console.log(i)
	// 	}
	// }

	// for (let key in ownedArray.owned) {
	// 	let pair = {}
	// 	pair[key] = ownedArray.owned[key]
	// 	console.log(pair)
	// 	owned.push(pair)
	// }
	//
	// for (let i=0; i < owned.length; i++) {
	// 	console.log("Owned list by index")
	// 	console.log(owned)
	// 	for (let key in owned[i]) {
	// 		// console.log(key)
	// 		// console.log(owned)
	// 		if (owned[i][key] === 0) {
	// 			owned.splice(i, 1);
	// 			// console.log("SHOULD BE EMPTY")
	// 			// console.log(owned);
	// 		}
	// 	}
	// }

	if ((ownedArray !== null)) {
		for (let key in ownedArray.owned) {
			let pair = {}
			pair[key] = ownedArray.owned[key]
			if (pair[key] !== 0) {
				owned.push(pair)
			}
		}
	}

	if ((ownedArray !== null || owned.length > 0)) {
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