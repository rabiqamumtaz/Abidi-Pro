import axios from "axios";
import { toast } from "react-toastify";
import {store} from "./Store";
import { logoutUser } from "./Store/authSlice";
import { silentRefresh } from "./Store/authSlice";

const api = axios.create({
  baseURL: "https://9d00-39-35-235-214.ngrok-free.app/api/web",
  withCredentials: true,
  timeout: 10000,
});

const hasSessionCookie = () => {
  return document.cookie.includes("refreshToken");
};

let isRefreshingToken = false;

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    if (
      config._silentRefresh ||
      config._skipAuth ||
      config._loginRequest ||
      config._verifyOtp
    ) {
      return config;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest._skipAuth ||
      originalRequest._loginRequest ||
      originalRequest._verifyOtp
    ) {
      return Promise.reject(error);
    }

    // Handle 401 errors due to access token expiry
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshingToken
    ) {
      originalRequest._retry = true;

      if (!hasSessionCookie()) {
        // No session → logout
        store.dispatch(logoutUser());
        return Promise.reject(error);
      }

      try {
        isRefreshingToken = true;

        const response = await api.get("/auth/check-session", {
          withCredentials: true,
          _silentRefresh: true,
        });

        isRefreshingToken = false;

        // ✅ Manually dispatch to update Redux auth state
        store.dispatch({
          type: silentRefresh.fulfilled.type,
          payload: response.data,
        });

        // ✅ Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshingToken = false;

        store.dispatch(logoutUser());
        toast.error("Session expired. Please login again.");

        if (!window.location.href.includes("/auth/login")) {
          window.location.href = "/auth/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
