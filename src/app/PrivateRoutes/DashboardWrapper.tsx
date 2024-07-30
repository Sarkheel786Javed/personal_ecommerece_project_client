import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar/SidebarMain";
import AdminNavbar from "../layout/Navbar/AdminNavbar";

const PrivateRoute = () => {

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
