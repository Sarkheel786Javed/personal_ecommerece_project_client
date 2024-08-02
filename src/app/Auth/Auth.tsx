import React, { useEffect, useState, ReactNode } from "react";
import {useNavigate } from "react-router-dom";
import { AuthService } from "../../Services/AuthServices/AuthServices";
import { jwtDecode } from "jwt-decode";

interface JwtDecodedToken {
  _id: string;
  updatedAt: number; // Assuming updatedAt is a Unix timestamp in seconds
}

interface AuthTokenProviderProps {
  children: ReactNode;
}

const AuthTokenProvider: React.FC<AuthTokenProviderProps> = ({ children }) => {
  const [isTokenValid, setIsTokenValid] = useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    debugger;

    const getToken = localStorage.getItem("token");
    const token = getToken ? getToken : "";
    if (!token) {
      navigate("/login");
    }
    const decodedToken = jwtDecode<JwtDecodedToken>(token);
    const updatedAt = new Date(decodedToken.updatedAt).getTime(); // Parse ISO 8601 string to milliseconds
    const currentTime = Date.now();
    const durationInMilliseconds = currentTime - updatedAt;
    const durationThreshold = 1 * 60 * 1000; // 1 minute in milliseconds

    if (durationInMilliseconds > durationThreshold) {
      getUserAndLogout(decodedToken._id, token);
      setIsTokenValid(false);
      getUserAndLogout(decodedToken._id, token);
      AuthService.logout();
      navigate("/login");
    } else {
      setIsTokenValid(true);
    }
  }, [navigate]);
  const getUserAndLogout = async (userId: string, token: string) => {
    try {
      debugger;
      await AuthService.getUser(userId, token).then((response) => {
        if (response.data.success === false) {
          localStorage.removeItem("token");
          setIsTokenValid(false);
          AuthService.logout();
          navigate("/login");
        }
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("token");
      setIsTokenValid(false);
      AuthService.logout();
      navigate("/login");
    }
  };

  return <>{isTokenValid == true && <>{children}</>}</>;
};

export default AuthTokenProvider;
