import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerUserThunk } from "../services/auth-thunks";
import "./index.css";

// Adapted from Homework Assignments
function RegisterScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("")
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleRegister = async () => {
		try {
			await dispatch(registerUserThunk({ username, password, role }));
			navigate("/profile");
		} catch (e) {
			alert(e);
		}
	};
	return (
		<div>
			<div>
				<h1>Register Screen</h1>
				<div className="mt-2">
					<label>Username</label>
					<input className="form-control" type="text" value={username}
						   onChange={(event) => setUsername(event.target.value)}/>
				</div>
				<div className="mt-2">
					<label>Password</label>
					<input className="form-control" type="password" value={password}
						   onChange={(event) => setPassword(event.target.value)}/>
				</div>
				<h2>Role</h2>
				<div>
					<div className="form-check">
						<label className="form-check-label" htmlFor="contactChoice1">Casual</label>
						<input className="form-check-input" type="radio" id="contactChoice1" name="contact" value="casual" onChange={(event) => {
							setRole(event.target.value);
						}} />
					</div>
					<div className="form-check">
						<label className="form-check-label" htmlFor="contactChoice2">Professional</label>
						<input className="form-check-input" type="radio" id="contactChoice2" name="contact" value="professional" onChange={(event) => {
							setRole(event.target.value);
						}}/>
					</div>
					<div className="form-check">
						<label className="form-check-label" htmlFor="contactChoice3">Researcher</label>
						<input className="form-check-input" type="radio" id="contactChoice3" name="contact" value="researcher" onChange={(event) => {
							setRole(event.target.value);
						}}/>
					</div>
				</div>
				<button className="btn btn-primary mt-2"
						onClick={handleRegister}>
					Register
				</button>
			</div>

		</div>
	);
}
export default RegisterScreen;