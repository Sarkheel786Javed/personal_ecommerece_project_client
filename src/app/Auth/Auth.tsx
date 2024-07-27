import { ReactNode, useEffect, useState } from "react";
import { AuthService } from "../../Services/AuthServices/AuthServices";
import { Outlet, useNavigate } from "react-router";

// interface jwtDecodeToken {
//   _id?: string;
// }
interface PrivateRoutesProps {
  children: ReactNode;
}
const regeneratenAuthToken: React.FC<PrivateRoutesProps> = ({ children }) => {
  const [isToken, setIstokenExpire] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("1+1");
    refreshToken();
  });
  const refreshToken = async () => {
    const LocalStorageToken = AuthService.getToken();
    try {
      await AuthService.regenerateToken(LocalStorageToken).then((res) => {
        if (res.data.success === true) {
          setIstokenExpire(false);
          navigate("/login");
        }
      });

      // await axiosInstance.get(`/user/getUser/${userId}`).then((res)=>{
      // setLogoutTimer(5 * 60 * 1000); // Reset logout timer
      // const decodedToken = jwtDecode<jwtDecodeToken>(token);
      //    console.log("Decoded Token:", decodedToken);
      //     const userId = decodedToken?._id;
      //     console.log("User ID:", userId);
    } catch (err) {}
  };

  return (
    <div>
      {isToken === true ? (
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

export default regeneratenAuthToken;
