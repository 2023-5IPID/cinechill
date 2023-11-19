import Axios from 'axios';
import Cookies from 'js-cookie';
// Axios est une bibliothèque client HTTP populaire permettant d'effectuer des requêtes AJAX à partir d'applications JavaScript.
const axios = Axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

axios.interceptors.request.use(
    async (config) => {
      const csrfToken = Cookies.get('XSRF-TOKEN');
      if (!csrfToken && config.url !== 'http://localhost:8000/sanctum/csrf-cookie')
        await axios.get('http://localhost:8000/sanctum/csrf-cookie');
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default axios;