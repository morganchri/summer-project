import React, {useEffect, useState} from "react";
import {getAllLikes} from "../search/finnhubSearch";
import {useSelector} from "react-redux";
import LikedHomePage from "./research-home-page";

const LikeHomePage = () => {

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
		return(
			<div className={"text-center research-header-formatting"}>
				<h1>Hi {currentUser.firstName}! Here is your current research info.</h1>
			<div>
				{liked.map(ticker => <LikedHomePage key={ticker.key} liked={ticker}/>)}
			</div>
			</div>
		)
	} else {
		return(
		<div>
			<h1>Like A Stock To See More Info</h1>
		</div>
		)
	}

}

export default LikeHomePage;