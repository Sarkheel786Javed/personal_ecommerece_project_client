import React, { ReactNode, useEffect, useState } from "react";
import { AuthService } from "../../Services/AuthServices/AuthServices";
import { Outlet, useNavigate, useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";

interface JwtDecodedToken {
  _id: number;
  userName: string;
  updatedAt: string;
  email: string;
  addressLine1: string;
  phoneNumbber: string;
  city: string;
  country: string;
  answer: string;
  Organization: string;
}

interface PrivateRoutesProps {
  children: ReactNode;
}

const RegeneratenAuthToken: React.FC<PrivateRoutesProps> = ({ children }) => {
  const [isTokenValid, setIsTokenValid] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const checkToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    let decodedToken: JwtDecodedToken;
    try {
      decodedToken = jwtDecode<JwtDecodedToken>(token);
    } catch (err) {
      console.log("Error decoding token:", err);
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    if (!decodedToken.updatedAt) {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    const updatedAt = new Date(decodedToken.updatedAt).getTime();
    const currentTime = Date.now();
    const durationInMilliseconds = currentTime - updatedAt;

    const durationThreshold = 1 * 60 * 1000; // 1 minute in milliseconds

    if (durationInMilliseconds > durationThreshold) {
      try {
        const res = await AuthService.regenerateToken(token);
        if (res.data.success === true) {
          setIsTokenValid(true);
          localStorage.setItem("token", res.data.token);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        console.log("Error refreshing token:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      setIsTokenValid(true);
    }
  };

  const checkUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    let decodedToken: JwtDecodedToken;
    try {
      decodedToken = jwtDecode<JwtDecodedToken>(token);
    } catch (err) {
      console.log("Error decoding token:", err);
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    try {
      const res = await AuthService.getUser(decodedToken._id, token);
      if (!res.data.success) {
        localStorage.removeItem("token");
        navigate("/login");
        await checkToken(); // Try to refresh the token after logging out
      }
    } catch (err) {
      console.log("Error getting user:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  return (
    <div>
      {isTokenValid && (
        <>
          {children}
          <Outlet />
        </>
      )}
    </div>
  );
};

export default RegeneratenAuthToken;
