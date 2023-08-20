import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import "./index.css"
import * as userCalls from "./userInfo/userAPICalls"
import {Link} from "react-router-dom";

const FollowingList = (follower) => {

	const [user, setUser] = useState({});

	console.log("Follower to find user")
	console.log(follower);
	console.log(follower.follower);
	console.log(follower.follower.followed);
	console.log(follower.follower.follower);

	const getUser = async () => {
		const user = await userCalls.getUser(follower.follower.followed);
		console.log("User From User Call");
		console.log(user)
		setUser(user);
	}

	useEffect(() => {
		getUser();
	}, [follower]);

	console.log("User For List");
	console.log(user);
	console.log(user);

	return(
		<li className="list-group-item">
			<div className="row">
				<div>
					<Link to={`/profile/${follower.follower.followed}`}>
						Username: {user.username}<br/>
						Role: {user.role}
					</Link>
				</div>
			</div>
		</li>
	);
};

export default FollowingList;