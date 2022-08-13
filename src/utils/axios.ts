import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { refreshAccessToken } from "./refreshAccessToken";

const getRequestHeaders = (accessToken: string): AxiosRequestHeaders => ({
  accept: "text/plain",
  Authorization: accessToken,
});

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: getRequestHeaders(""),
});

instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => ({
    ...config,
    headers: getRequestHeaders(localStorage.getItem("accessToken") || ""),
  }),
  (error) => error
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      return unauthorizedHandling(error);
    }
    return Promise.reject(error);
  }
);

export default instance;

const unauthorizedHandling = async (error: AxiosError) =>
  instance.request({
    ...error.config,
    headers: getRequestHeaders((await refreshAccessToken()) || ""),
  });

// msalInstance.logoutRedirect({
//   // Return false if you would like to stop navigation after local logout
//   onRedirectNavigate: () => false,
// });
