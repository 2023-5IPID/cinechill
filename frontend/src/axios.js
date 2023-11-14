import Axios from 'axios';
// Axios est une bibliothèque client HTTP populaire permettant d'effectuer des requêtes AJAX à partir d'applications JavaScript.
const axios = Axios.create({
    baseURL: "http://localhost:8000/api",
    // withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

export default axios;