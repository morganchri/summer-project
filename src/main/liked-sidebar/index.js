import React from ".";
import {useSelector} from "react-redux";
import {getAllLikes} from "../search/finnhubSearch";
import {useEffect, useState} from "react";
import LikedStocksList from "./liked-list";

const LikedStocks = () => {

	const { currentUser } = useSelector((state) => state.user);

	const [likedArray, setLiked] = useState({});

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
		for (let i=0; i < likedArray.length; i++) {
			if (likedArray[i].user === currentUser._id) {
				liked.push({stockTicker: likedArray[i].stockTicker});
			}
		}
		console.log("All Liked")
		console.log(liked);
		return (
			<ul className="list-group">
				<li className="list-group-item">
					<h3>Liked Stocks</h3>
				</li>
				{
					liked.map(ticker =>
								  <LikedStocksList
									  key={ticker.key}
									  liked={ticker}/>
					)
				}
			</ul>
		);
	} else {
		return (
			<div>
				<h3>No Liked Stocks</h3>
			</div>
		)
	}
};
export default LikedStocks;