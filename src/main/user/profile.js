import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk }
	from "../services/auth-thunks";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import jQuery from "jquery";
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

	// https://stackoverflow.com/questions/34338411/how-to-import-jquery-using-es6-syntax
	jQuery(document).ready(function(){
		let radio1 = document.getElementById("contactChoice1");
		let radio2 = document.getElementById("contactChoice2");
		let radio3 = document.getElementById("contactChoice3");

		if (profile.role){
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


	return (<div>
		<h1>Profile Screen</h1>
		<br/>
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