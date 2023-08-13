import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk }
	from "../services/auth-thunks";
import "./index.css";

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
	return (<div>
		<h1>Profile Screen</h1>
		{profile && (<div>
				<div>
					<label>First Name</label> &nbsp;
					<input
						type="text" value = {profile.firstName}
						onChange={(event) => {
							const newProfile = {
								...profile, firstName: event.target.value,
							};
							setProfile(newProfile);
						}}/>
				</div>
				<div>
					<label>Last Name</label> &nbsp;
					<input
						type="text" value = {profile.lastName}
						onChange={(event) => {
							const newProfile = {
								...profile, lastName: event.target.value,
							};
							setProfile(newProfile);
						}}/>
				</div>
				<div>
					<label>Last Name</label> &nbsp;
					<input
						type="text" value = {profile.lastName}
						onChange={(event) => {
							const newProfile = {
								...profile, lastName: event.target.value,
							};
							setProfile(newProfile);
						}}/>
				</div>
				<h2>Role</h2>
				<div>
					<label htmlFor="contactChoice1">Casual</label>
					<input type="radio" id="contactChoice1" name="contact" value="casual" onChange={(event) => {
						const newProfile = {
							...profile, role: event.target.value,
						};
						setProfile(newProfile);
					}}/>

					<label htmlFor="contactChoice2">Professional</label>
					<input type="radio" id="contactChoice2" name="contact" value="professional" onChange={(event) => {
						const newProfile = {
							...profile, role: event.target.value,
						};
						setProfile(newProfile);
					}}/>

					<label htmlFor="contactChoice3">Researcher</label>
					<input type="radio" id="contactChoice3" name="contact" value="researcher" onChange={(event) => {
						const newProfile = {
							...profile, role: event.target.value,
						};
						setProfile(newProfile);
					}}/>
				</div>
			</div>
		)}
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