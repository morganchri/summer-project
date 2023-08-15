import React from ".";
import OwnedStocksList from "./owned-list";
import {useSelector} from "react-redux";

const OwnedStocks = () => {

	const ownedArray = useSelector((state) => state.owned);

	let owned = [];
	// Object.keys(ownedArray).length > 0 &&
	if (ownedArray !== undefined) {
		for (let key in ownedArray[0].owned) {
			let pair = {}
			pair[key] = ownedArray[0].owned[key]
			owned.push(pair)
		}

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