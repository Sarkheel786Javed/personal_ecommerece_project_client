import { Login } from "@mui/icons-material";
import HomePage from "../../Components/HomePage/HomePage";
import SignUp from "../../Components/Login/SignUp";
import ForgetPassword from "../../Components/Login/ForgetPassword";

export const LocalRoutes = [
  {
    path: "",
    Component: <HomePage />,
  },
  {
    path: "login",
    Component: <Login />,
  },
  {
    path: "signup",
    Component: <SignUp />,
  },
  {
    path: "forget",
    Component: <ForgetPassword />,
  },
];
