import axios from "axios";

const request = axios.create({
								 withCredentials: true,
							 });

const SERVER_URL = `http://localhost:4000/api`;

export const getUser = async (userID) => {
	const response = await request.get(`${SERVER_URL}/users/${userID}`);
	return response.data;
}

export const getAllUsers = async () => {
	const response = await request.get(`${SERVER_URL}/users`);
	return response.data;
}

