import React from ".";
import OwnedStocksList from "./owned-list";
import {useDispatch, useSelector} from "react-redux";
import {getOwnedStocks} from "../search/finnhubSearch";
import {useEffect, useState} from "react";
import {getOwnedStocksThunk} from "../services/owned-thunk";

const OwnedStocks = () => {

	const { currentUser } = useSelector((state) => state.user);
	const { ownedStocks } = useSelector((state) => state.ownedStocks);

	const dispatch = useDispatch();

	const ownedArray = ownedStocks;

	console.log("OWNED STOCKS FROM THUNK")
	console.log(ownedStocks);
	console.log(ownedArray);

	console.log("CURRENT USER")
	console.log(currentUser);

	useEffect(() => {
		dispatch(getOwnedStocksThunk(currentUser._id))
	}, []);

	let owned = [];

	console.log("OwnedArray")
	console.log(ownedArray);

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