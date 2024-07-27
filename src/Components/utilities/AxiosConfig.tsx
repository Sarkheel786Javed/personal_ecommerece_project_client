import axios from "axios";
import {AuthService} from "../../Services/AuthServices/AuthServices";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await AuthService.regenerateToken(token);
          AuthService.logout(); // Clear old token and set new token
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          localStorage.setItem("token", response.data.token);
          return axios(originalRequest);
        } catch (err) {
          AuthService.logout();
          window.location.href = "/login"; // Redirect to login page
        }
      } else {
        AuthService.logout();
        window.location.href = "/login"; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
