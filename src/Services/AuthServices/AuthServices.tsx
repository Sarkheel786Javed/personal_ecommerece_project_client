import axios from "axios";
import { ForgetModel, LoginModel, SignupModel } from "../../Model/AuthModel/AuthModel";

const baseUrl = "https://my-personal-ecommerece-project.vercel.app/api";
const AuthService = {
  SignupAuth: (data: SignupModel) => {
    return axios.post(`${baseUrl}/user/signup`, data);
  },
  Login:  (data: LoginModel) => {
    return  axios.post(`${baseUrl}/user/login`, data);
  },
  regenerateToken: (token: string) => {
    return axios.post(`${baseUrl}/user/regenerate-token`, { token });
  },
  getUser: (userId: string, token: string) => {
    return axios.get(`${baseUrl}/user/user/${userId}`, {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });
  },
  getToken: (): string | null => {
    return localStorage.getItem("token");
  },
  logout: () => {
    localStorage.removeItem("token");
  },
  Forget: (data: ForgetModel) => {
    return axios.post(`${baseUrl}/user/forget`, data);
  },
};

// let logoutTimer: NodeJS.Timeout;

// const setLogoutTimer = (duration: number) => {
//   clearLogoutTimer();
//   console.log("================", duration);
//   logoutTimer = setTimeout(() => {
//     AuthService.logout();
//     window.location.href = "/login"; // Redirect to login page
//   }, duration);
// };

// const clearLogoutTimer = () => {
//   if (logoutTimer) {
//     clearTimeout(logoutTimer);
//   }
// };

export { AuthService };
