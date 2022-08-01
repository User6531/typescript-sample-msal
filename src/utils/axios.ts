import axios, { AxiosRequestConfig } from "axios";
import { refreshAccessToken } from "./refreshAccessToken";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    accept: "text/plain",
  },
});

instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (config.headers === undefined) {
      config.headers = {};
    }

    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = accessToken || "";

    return config;
  },
  (error) => error
);

export default instance;

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      (async () => refreshAccessToken())();

      return instance.request(error.config);
    }
    return error;
  }
);
