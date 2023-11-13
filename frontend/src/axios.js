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

export default axios;