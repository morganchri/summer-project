import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import * as followersCalls from "../followers/followersAPICalls";
import * as userCalls from "./userInfo/userAPICalls";
import FollowerList from "./follower-list";
import FollowingList from "./following-list";
import * as apiCalls from "../search/finnhubSearch"
import OwnedStocksList from "../owned-sidebar/owned-list";
import LikedStocksList from "../liked-sidebar/liked-list";

function PublicProfile() {

	const {uid} = useParams();

	const [followers, setFollowers] = useState([]);
	const [following, setFollowing] = useState([]);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);
	const [likedArray, setLikes] = useState([]);
	const [ownedArray, setOwned] = useState([]);

	const getFollowers = async () => {
		const followers = await followersCalls.getFollowers(uid);
		setFollowers(followers);
	}

	const getFollowing = async () => {
		const following = await followersCalls.getFollowing(uid);
		setFollowing(following);
	}

	const getUser = async () => {
		const user = await userCalls.getUser(uid);
		setUser(user)
	}

	const getAllUsers = async () => {
		const users = await userCalls.getAllUsers();
		setUsers(users.filter(person =>  person.username !== user.username));
	}

	const getLiked = async () => {
		const liked = await apiCalls.getAllLikes(uid);
		setLikes(liked);
	}

	const getOwned = async () => {
		const owned = await apiCalls.getOwnedStocks(uid);
		setOwned(owned)
	}

	useEffect(() => {
		getAllUsers();
		getUser();
		getFollowers();
		getFollowing();
		getLiked();
		getOwned();

	}, []);

	let owned = [];

	if ((ownedArray !== null)) {
		for (let key in ownedArray.owned) {
			let pair = {}
			pair[key] = ownedArray.owned[key]
			owned.push(pair)
		}
	}

	let liked = []

	if ((likedArray !== null)) {
		for (let i=0; i < likedArray.length; i++) {
			if (likedArray[i].user === uid) {
				liked.push({stockTicker: likedArray[i].stockTicker});
			}
		}
	}

	return (
		<div>
			<h1>{user.username}</h1>
			<h2 className={"text-capitalize"}>{user.firstName}, {user.role}</h2>
			<div className={"row"}>
				<div className={"col-6"}>
					<ul className="list-group">
						<li className="list-group-item">
							<h3>
								Followers
							</h3>
						</li>
						{(followers.length > 0) && followers.map(user =>
																	 <FollowerList
																		 key={user.key}
																		 follower={user}/>
						)}
						{(followers.length === 0) && <h5 className={"text-center"}>No Followers Yet</h5>}
					</ul>
				</div>
				<div className={"col-6"}>
					<ul className="list-group">
						<li className="list-group-item">
							<h3>
								Following
							</h3>
						</li>
						{(following.length > 0) && following.map(user =>
																	 <FollowingList
																		 key={user.key}
																		 follower={user}/>
						)}
						{(following.length === 0) && <h5 className={"text-center"}>Not Following Anyone</h5>}
					</ul>
				</div>
			</div>
			<div className={"liked-and-owned-format"}>
				<div className={"row"}>
					<div className={"col-6"}>
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
					</div>
					<div className={"col-6"}>
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
					</div>
				</div>
			</div>
		</div>);
}
export default PublicProfile;