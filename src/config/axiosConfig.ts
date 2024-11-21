import axios from "axios";
import { store } from "../store/store";
import { authStateAction } from "../store/slices/authSlice";

// Determine the base URL based on the environment
const BASE_URL = "http://139.59.20.111:4013/";
// const BASE_URL = "http://10.0.2.2:4013/";

// Create an instance of axios with the base URL
const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5 * 60 * 1000, // 5 minutes
  withCredentials: false,
});

// Request interceptor to handle requests before they are sent
axiosClient.interceptors.request.use(
  async (config: any) => {
    // the data from redux store
    const state = store.getState();
    const { bearerToken } = state.auth;
    console.log("bearerToken-1", bearerToken);

    try {
      const token = bearerToken;
      // console.log("token", response.data);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error in request interceptor:", error);
    }
    return config;
  },
  (error: any) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses

axiosClient.interceptors.response.use(
  async (response: any) => {
    // Modify response data if needed
    return response;
  },
  async (error: any) => {
    const state = store.getState();
    const originalRequest = error.config;
    // Handle response errors
    if (error.response) {
      // Server responded with a status other than 2xx
      if (error.response.status === 401) {
        originalRequest._retry = true;
        const { refreshToken } = state.auth;
        if (refreshToken) {
          try {
            const response = await axios.post(
              `${BASE_URL}myid/api/v1/auth/refresh-token`,
              {
                refreshToken: refreshToken,
              }
            );
            // don't use axious instance that already configured for refresh token api call
            const newAccessToken = response.data.data.accessToken;
            console.log("newAccessToken", newAccessToken);
            store.dispatch(
              authStateAction.setNewBearerTokenAction(newAccessToken)
            );
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest); //recall Api with new token
          } catch (error) {
            // Handle token refresh failure
            // mostly logout the user and re-authenticate by login again
            store.dispatch(authStateAction.setNewBearerTokenAction(null));
            store.dispatch(authStateAction.setNewRefreshTokenAction(null));
          }
        }
        // Handle unauthorized access
      }
    } else if (error.request) {
      // No response received from server
      console.error("No response received:", error.request);
    } else {
      // Something else caused an error
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
