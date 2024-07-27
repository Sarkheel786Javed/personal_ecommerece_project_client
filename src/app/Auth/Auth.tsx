import { useEffect, useState } from "react";
import axios from "axios";
import {
  AuthService,
  setLogoutTimer,
} from "../../Services/AuthServices/AuthServices";
import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router";

const useAxiosInstance = () => {
  const instance = axios.create({
    baseURL: "https://my-personal-ecommerece-project.vercel.app/api",
    headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        const token = AuthService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const token = AuthService.getToken();
          try {
            const response = await AuthService.regenerateToken(token);
            localStorage.setItem("token", response.data.token);
            setLogoutTimer(5 * 60 * 1000); // Reset logout timer
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${response.data.token}`;
            return axios(originalRequest);
          } catch (err) {
            AuthService.logout();
            window.location.href = "/login"; // Redirect to login page
            return Promise.reject(err); // Reject the promise to prevent further action
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return instance;
};

interface jwtDecodeToken {
  _id?: string;
}

const ExampleComponent = () => {
  const axiosInstance = useAxiosInstance();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        debugger;
        // Get token from localStorage
        const token = AuthService.getToken();
        console.log("Token:", token); // Debug: Log the token

        // Check if token exists
        if (!token) {
          throw new Error("No token found");
        }

        // Decode token to extract userId
        const decodedToken = jwtDecode<jwtDecodeToken>(token);
        console.log("Decoded Token:", decodedToken); // Debug: Log the decoded token

        const userId = decodedToken?._id;
        console.log("User ID:", userId); // Debug: Log the userId

        // Check if userId exists
        if (!userId) {
          throw new Error("Invalid token: userId not found");
        }

        // Fetch user data using the userId
        const response = await axiosInstance.get(`/user/getUser/${userId}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
        // Optionally handle errors like redirecting to login
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <Outlet />
      ) : (
        <h3
          className="w-100 d-flex justify-content-center align-items-center fw-bolder"
          style={{ height: "100vh" }}
        >
          Loading...
          <div className="spinner-border text-warning mx-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </h3>
      )}
    </div>
  );
};

export default ExampleComponent;
