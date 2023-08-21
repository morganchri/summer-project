import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import "./index.css"
import * as followCalls from "../followers/followersAPICalls";
import {Link} from "react-router-dom";

const WhoToFollowList = (user) => {

	const [follow , setFollow] = useState([])

	const getFollow = async () => {
		const follow = await followCalls.getFollow(user.user._id);
		setFollow(follow);
	}

	useEffect(() => {
		getFollow()
	}, []);

	const followClickHandler = () => {
		followCalls.followUser(user.user._id);
	}

	// disabled={follow.length > 0}
	const checkDisabled = () => {
		console.log("Follow");
		console.log(follow);
		if(follow.length > 0) {
			document.getElementById("followbutton").disabled = true;
		}
	}

	useEffect(() => {
		checkDisabled();
	}, [follow]);

	return(
		<li className="list-group-item">
			<div className="row">
				<div className={"row"}>
					<div className={"col-8"}>
						<Link to={`/profile/${user.user._id}`}>
							{user.user.username}<br/>
							<b>Role:</b> {user.user.role}
						</Link>
					</div>
					<div className={"col-2"}>
						<button id={"followbutton"} className="btn btn-primary rounded-pill float-none" onClick={followClickHandler}>Follow</button>
					</div>
				</div>
			</div>
		</li>
	);
};

export default WhoToFollowList;