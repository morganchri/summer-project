import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import "./index.css"
import * as userCalls from "../user/userInfo/userAPICalls"
import {Link} from "react-router-dom";

const OwnersList = (owner) => {

	// console.log("PARAMETER FOR OWNERS LIST");
	// console.log(owner.owner);

	const [user, setUser] = useState({});

	const fetchUser = async () => {
		const user = await userCalls.getUser(owner.owner);
		setUser(user);
	}

	useEffect(() => {
		fetchUser();
	}, [owner]);

	// console.log("USER FOR OWNERS LIST");
	// console.log(user);

	if (user) {
		return(
			<li className="list-group-item">
				<Link to={`/profile/${owner.owner}`}>
					<div className="row">
						<div className={"col-5"}>
							<h3><b>Username:</b> {user.username}</h3>
						</div>
						<div className={"col-4"}>
							<h3><b>Name:</b> {user.firstName}</h3>
						</div>
						<div className={"col-3 text-capitalize"}>
							<h3><b>Role: </b> {user.role}</h3>
						</div>
					</div>
				</Link>
			</li>
		);
	} else {
		return(
			<h3>
				No One Owns This Stock Yet!
			</h3>
		);
	}

};

export default OwnersList;