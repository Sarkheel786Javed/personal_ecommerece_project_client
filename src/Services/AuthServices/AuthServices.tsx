import axios from "axios";
import { ForgetModel, LoginModel, SignupModel } from "../../Model/AuthModel";

const baseUrl = "https://my-personal-ecommerece-project.vercel.app/api"
const AuthService = {
  SignupAuth: (data: SignupModel) => {
    return axios.post(`${baseUrl}/user/signup`, data);
  },
  Login: (data:LoginModel) => {
    return axios.post(`${baseUrl}/user/login`, data);
  },
  Forget: (data:ForgetModel) => {
    return axios.post(`${baseUrl}/user/forget`, data);
  },
};

export default AuthService;
