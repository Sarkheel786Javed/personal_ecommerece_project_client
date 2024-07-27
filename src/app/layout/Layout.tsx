import React, { ReactNode } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  return (
    <div className="d-flex m-0">
      <div className="d-block w-100">
        {location.pathname === "/login" ||
        location.pathname === "/signup" ? null : (
          <Navbar />
        )}
        <div className="" style={{ minHeight: "80vh" }}>
          {children}
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
