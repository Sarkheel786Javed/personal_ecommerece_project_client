import axios from "axios";
import { ForgetModel, LoginModel, SignupModel } from "../../Model/AuthModel";

const baseUrl = "https://my-personal-ecommerece-project.vercel.app/api";
const AuthService = {
  SignupAuth: (data: SignupModel) => {
    return axios.post(`${baseUrl}/user/signup`, data);
  },
  Login: async (data: LoginModel) => {
    const res = await axios.post(`${baseUrl}/user/login`, data);
    if (res.data.success) {
      const token = res.data.token;
      localStorage.setItem("token", token);
      // setLogoutTimer(5 * 60 * 1000); // 5 minutes
    }
    return res;
  },
  regenerateToken: (token: string) => {
    return axios.post(`${baseUrl}/user/regenerate-token`, { token });
  },
  getUser: (userId: any, token: any) => {
    return axios.get(`${baseUrl}/user/getUser/${userId}/token/${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getToken: (): string | null => {
    return localStorage.getItem("token");
  },
  logout: () => {
    localStorage.removeItem("token");
    // clearLogoutTimer();
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
