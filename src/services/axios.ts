import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL as string;

const Api = axios.create({ baseURL: 'http://localhost:3000/api', withCredentials: true });
// const Api = axios.create({ baseURL: BASE_URL });

export default Api;
