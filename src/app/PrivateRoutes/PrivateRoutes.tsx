import { Navigate, Outlet } from "react-router-dom";
import { AuthService } from "../../Services/AuthServices/AuthServices";
import Sidebar from "../layout/Sidebar/SidebarMain";
import AdminNavbar from "../layout/Navbar/AdminNavbar";

const PrivateRoute = () => {
  const token = AuthService.getToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="d-flex justify-content-start w-100">
      <Sidebar />
      <div className="w-100">
        <AdminNavbar/>
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateRoute;
