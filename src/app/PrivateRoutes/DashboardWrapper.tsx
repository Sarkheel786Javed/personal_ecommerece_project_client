import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar/SidebarMain";
import AdminNavbar from "../layout/Navbar/AdminNavbar";
import { useEffect } from "react";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="w-100">
      <AdminNavbar />
      <div className="d-flex justify-content-start  w-100">
      <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateRoute;
