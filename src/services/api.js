import axios from "axios";
import { getToken } from "../utils/auth";

const Api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true // <--- Yeh line add karna zaroori hai!
});

Api.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default Api;