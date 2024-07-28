import { ReactNode, useEffect, useState } from "react";
import { AuthService } from "../../Services/AuthServices/AuthServices";
import { Outlet, useNavigate } from "react-router";
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    const checkToken = async () => {
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

    checkToken();

    const interval = setInterval(() => {
      checkToken();
    }, 60 * 1000); // Check token every 1 minute

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div>
      {isTokenValid ? (
        <>
          {children}
          <Outlet />
        </>
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

export default RegeneratenAuthToken;
