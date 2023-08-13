import React from ".";
import OwnedStocksList from "./owned-list";
import ownedArray from "./owned.json"

const OwnedStocks = () => {

	// const whoArray = useSelector((state) => state.who);

	console.log("Owned");
	console.log(ownedArray[0].owned);

	let owned = [];
	//
	for(let key in ownedArray[0].owned){
		let pair = {}
		pair[key] = ownedArray[0].owned[key]
		owned.push(pair)
	}

	console.log("Owned list");
	console.log(owned);

	return(
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
};
export default OwnedStocks;