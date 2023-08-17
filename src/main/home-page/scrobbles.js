import React, {useEffect, useState} from "react";
import {getAllLikes} from "../search/finnhubSearch";
import {useSelector} from "react-redux";
import LikedHomePage from "./research-home-page";

const Scrobbles = () => {

	const { currentUser } = useSelector((state) => state.user);


	console.log("Current User")
	console.log(currentUser)

	// const [liked, setLikedList] = useState([])
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
		for (let i = 0; i < likedArray.length; i++) {
			if (likedArray[i].user === currentUser._id) {
				liked.push({stockTicker: likedArray[i].stockTicker});
			}
		}
		console.log("All Liked")
		console.log(liked);
	}

	return(
		<div>
			{liked.map(ticker => <LikedHomePage key={ticker.key} liked={ticker}/>)}
		</div>
	)
}

export default Scrobbles;