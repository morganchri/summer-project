import axios from "axios";

// From Homework Assignments, with some modifications, notably to the register user function
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/users`;

const api = axios.create({ withCredentials: true });

export const login = async ({ username, password }) => {
	const response = await api.post(`${USERS_URL}/login`, { username, password });
	return response.data;
};

export const logout = async () => {
	const response = await api.post(`${USERS_URL}/logout`);
	return response.data;
};

export const profile = async () => {
	return await api.post(`${USERS_URL}/profile`);
};

export const updateUser = async (user) => {
	const response = await api.put(`${USERS_URL}/${user._id}`, user);
	return response.data;
};

export const registerUser = async ({ username, password,role}) => {
	const response = await api.post(`${USERS_URL}/register`, {username, password, role});
	return response.data;
};