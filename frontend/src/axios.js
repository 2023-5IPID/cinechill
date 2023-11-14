import Axios from 'axios';
// Axios est une bibliothèque client HTTP populaire permettant d'effectuer des requêtes AJAX à partir d'applications JavaScript.
const axios = Axios.create({
    baseURL: "http://127.0.0.1:8000",
    // withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `${token}`;
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

export default axios;