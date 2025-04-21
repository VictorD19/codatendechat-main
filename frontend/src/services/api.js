import axios from "axios";

const api = axios.create({
	baseURL: "https://sistemazapchat.com/api",
	withCredentials: true,
});
export const openApi = axios.create({
	baseURL: "https://sistemazapchat.com/api"
});

export default api;
