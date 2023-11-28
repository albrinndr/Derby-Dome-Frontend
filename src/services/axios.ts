import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL as string;

const Api = axios.create({ baseURL: 'http://localhost:3000/api', withCredentials: true });
// const Api = axios.create({ baseURL: BASE_URL });


Api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            const { data } = error.response;
            console.log(data.message);

        } else {
            console.log(error);
        }
        return Promise.reject(error);
    }
);

export default Api;
