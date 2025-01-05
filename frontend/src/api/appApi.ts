import axios from "axios";
import { getEnvVariables } from "../config/config";

const { VITE_API_URL } = getEnvVariables();

const appApi = axios.create({
  baseURL: VITE_API_URL,
});

// appApi.interceptors.request.use((config) => {
//   config.headers = {
//     ...config.headers,
//     "x-token": localStorage.getItem("token"),
//   };
//   return config;
// });

export default appApi;
