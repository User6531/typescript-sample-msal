import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { msalInstance } from "..";
import { refreshAccessToken } from "./refreshAccessToken";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    accept: "text/plain",
  },
});

// Request interceptor for API calls
instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: localStorage.getItem("accessToken") || "",
    },
  }),
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const accessToken = (await refreshAccessToken()) || "";
        axios.defaults.headers.common["Authorization"] = accessToken;

        return instance(originalRequest);
      } else {
        msalInstance.logoutRedirect({
          // Return false if you would like to stop navigation after local logout
          onRedirectNavigate: () => false,
        });

        return;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
