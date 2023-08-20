import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk }
	from "../services/auth-thunks";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import jQuery from "jquery";
import * as followersCalls from "../followers/followersAPICalls";
import * as userCalls from "./userInfo/userAPICalls";
import LikedStocksList from "../liked-sidebar/liked-list";
import WhoToFollowList from "./who-to-follow-list";
import FollowingList from "./following-list";
import FollowerList from "./follower-list";
import OwnedStocksList from "../owned-sidebar/owned-list";
import * as apiCalls from "../search/finnhubSearch";
window.$ = window.jQuery = jQuery;


function ProfileScreen() {
	const { currentUser } = useSelector((state) => state.user);
	const [ profile, setProfile ] = useState(currentUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const save = () => dispatch(updateUserThunk(profile));
	useEffect( () => {
		const loadProfile = async () => {
			const { payload } = await dispatch(profileThunk());
			setProfile(payload);
		};
		loadProfile()
	}, []);

	console.log("Current User ID")
	console.log(profile);
	console.log(currentUser);

	const [followers, setFollowers] = useState([]);
	const [following, setFollowing] = useState([]);
	const [users, setUsers] = useState([]);
	const [likedArray, setLikes] = useState([]);
	const [ownedArray, setOwned] = useState([]);

	const getFollowers = async () => {
		const followers = await followersCalls.getFollowers(currentUser._id);
		setFollowers(followers);
	}

	const getFollowing = async () => {
		const following = await followersCalls.getFollowing(currentUser._id);
		setFollowing(following);
	}

	const getAllUsers = async () => {
		const users = await userCalls.getAllUsers();
		console.log("Filtering out the current user")
		console.log(users.filter(user =>  user.username !== currentUser.username))
		setUsers(users.filter(user =>  user.username !== currentUser.username));
	}

	const getLiked = async () => {
		const liked = await apiCalls.getAllLikes(currentUser._id);
		setLikes(liked);
	}

	const getOwned = async () => {
		const owned = await apiCalls.getOwnedStocks(currentUser._id);
		setOwned(owned)
	}

	useEffect(() => {
		getAllUsers();
		getLiked();
		getOwned();

	}, []);

	console.log("All Users");
	console.log(users)

	useEffect(() => {
		getFollowers();
		getFollowing();
	}, [profile]);

	// https://stackoverflow.com/questions/34338411/how-to-import-jquery-using-es6-syntax
	jQuery(document).ready(function(){
		let radio1 = document.getElementById("contactChoice1");
		let radio2 = document.getElementById("contactChoice2");
		let radio3 = document.getElementById("contactChoice3");

		if (profile && profile.role){
			if (profile.role === "casual") {
				radio1.checked = true;
			}
			if (profile.role === "professional") {
				radio2.checked = true;
			}
			if (profile.role === "researcher") {
				radio3.checked = true;
			}
		}
	});

	let owned = [];

	if ((ownedArray !== null)) {
		for (let key in ownedArray.owned) {
			let pair = {}
			pair[key] = ownedArray.owned[key]
			if (pair[key] !== 0) {
				owned.push(pair)
			}
		}
	}

	let liked = []

	if ((likedArray !== null)) {
		for (let i=0; i < likedArray.length; i++) {
			if (likedArray[i].user === currentUser._id) {
				liked.push({stockTicker: likedArray[i].stockTicker});
			}
		}
	}

	return (<div>
		<h1>Profile Screen</h1>
		<br/>
		<div className={"row"}>
			<div className={"col-4"}>
				<ul className="list-group">
					<li className="list-group-item">
						<h3>
							Users to follow
						</h3>
					</li>
					{
						users.map(user =>
									  <WhoToFollowList
										  key={user.key}
										  user={user}/>
						)
					}
				</ul>

			</div>
			<div className={"col-4"}>
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
			<div className={"col-4"}>
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
		</div>
		{profile && (<div>
				<h2>First and Last Name</h2>
				<div className="input-group">
					<span className="input-group-text">First Name</span>
					<input className="form-control"
						type="text" value = {profile.firstName}
						onChange={(event) => {
							const newProfile = {
								...profile, firstName: event.target.value,
							};
							setProfile(newProfile);
						}}/>
					<span className="input-group-text">Last Name</span>
					<input className="form-control"
						type="text" value = {profile.lastName}
						onChange={(event) => {
							const newProfile = {
								...profile, lastName: event.target.value,
							};
							setProfile(newProfile);
						}}/>
				</div>
				<br/>
				<h2>Role</h2>
				<div>
					<div className="form-check">
						<label className="form-check-label" htmlFor="contactChoice1">Casual</label>
						<input className="form-check-input" type="radio" id="contactChoice1" name="contact" value="casual" onChange={(event) => {
							const newProfile = {
								...profile, role: event.target.value,
							};
							setProfile(newProfile);
						}} />
					</div>
					<div className="form-check">
						<label className="form-check-label" htmlFor="contactChoice2">Professional</label>
						<input className="form-check-input" type="radio" id="contactChoice2" name="contact" value="professional" onChange={(event) => {
							const newProfile = {
								...profile, role: event.target.value,
							};
							setProfile(newProfile);
						}}/>
					</div>
					<div className="form-check">
						<label className="form-check-label" htmlFor="contactChoice3">Researcher</label>
						<input className="form-check-input" type="radio" id="contactChoice3" name="contact" value="researcher" onChange={(event) => {
							const newProfile = {
								...profile, role: event.target.value,
							};
							setProfile(newProfile);
						}}/>
					</div>
				</div>
			</div>
		)}
		<br/>
		<button
			className="text-capitalize login-button-format"
			onClick={() => {
				dispatch(logoutThunk());
				navigate("/login");
			}}>Logout
		</button>
		<button
			className="text-capitalize login-button-format"
			onClick={() => {
				save();
				navigate("/home");
			}}>Save
		</button>
	</div>);
}
export default ProfileScreen;