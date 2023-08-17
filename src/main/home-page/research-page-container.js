import {useEffect, useState} from "react";
import {getAllLikes} from "../search/finnhubSearch";

const ResearchPageContainer = (currentUser) => {

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
	}, [currentUser]);

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

	return (liked)
}

export default ResearchPageContainer;