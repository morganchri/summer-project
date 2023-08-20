import axios from "axios";

const request = axios.create({
								 withCredentials: true,
							 });

const SERVER_URL = `http://localhost:4000/api`;

export const followUser = async (followed) => {
	const response = await request.post(`${SERVER_URL}/follow/${followed}`);
	return response.data;
}

export const getFollowers = async (follower) => {
	const response = await request.get(`${SERVER_URL}/users/${follower}/followers`);
	return response.data;
}

export const getFollowing = async (followed) => {
	const response = await request.get(`${SERVER_URL}/users/${followed}/following`);
	return response.data;
}

export const getFollow = async (userID) => {
	const response = await request.get(`${SERVER_URL}/users/${userID}/follows`);
	return response.data;
}