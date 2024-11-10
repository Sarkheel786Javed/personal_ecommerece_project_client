import axios from "axios";
import { ForgetModel, LoginModel, SignupModel } from "../../Model/AuthModel/AuthModel";
import axiosInstance from "../../Components/Httpintercepter/Httpintercepter";

// const baseUrl = "https://my-personal-ecommerece-project.vercel.app/api/";
const baseUrl = "http://localhost:7000/api";
const AuthService = {
  SignupAuth: (data: SignupModel) => {
    return axiosInstance.post(`${baseUrl}/user/register`, data);
  },
  Login:  (data: LoginModel) => {
    return  axiosInstance.post(`${baseUrl}/user/login`, data);
  },
  regenerateToken: (token: string) => {
    return axiosInstance.post(`${baseUrl}/user/regenerate-token`, { token });
  },
  getUser: (userId: string, token: string) => {
    return axiosInstance.get(`${baseUrl}/user/user/${userId}`, {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });
  },
  getDepartment: (organization:String) => {
    return axiosInstance.get(`${baseUrl}/user/getalldepartment/${organization}`)
    },
  getToken: (): string | null => {
    return localStorage.getItem("token");
  },
  logout: () => {
    localStorage.removeItem("token");
  },
  Forget: (data: ForgetModel) => {
    return axiosInstance.post(`${baseUrl}/user/forget`, data);
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
