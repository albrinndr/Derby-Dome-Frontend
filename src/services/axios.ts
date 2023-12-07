import axios from "axios";
const BASE_URL = 'https://derbydome.website/api'

const Api = axios.create({ baseURL: BASE_URL, withCredentials: true });

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
