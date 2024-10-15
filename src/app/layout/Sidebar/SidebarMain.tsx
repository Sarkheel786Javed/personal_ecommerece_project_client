import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  // CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link } from "react-router-dom";
import './Sidebar.scss'
// import { DataSide } from "./SidebarItems/SideBarItems";
import { useAuth } from "../../createContextAuth/createContex";
import { sidebarAuth } from "../../createContextAuth/CreateSidebarContext";

const SideBarItems = () => {
  const [auth] = useAuth();
  const [sidebarOpen]= sidebarAuth()

  return (
    <div>
      {auth.Organization === "User" ? (
        <>
          <Link to="/" className={`border border-light text-light ${location.pathname === "/" ? "activeClicked" : ""}`}
          >
            <CDBSidebarMenuItem
              className={`border border-light text-light mx-1 rounded-2 ${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} my-2 shadow`}
              icon="bi bi-menu-button-wide "
              active={location.pathname === "/auth/dashboard" ? true : false}
            >
              User Dashboard
            </CDBSidebarMenuItem>
          </Link>
        </>
      ) : auth.Organization === "Admin" ? (
        <>
          <Link to="/auth/dashboard" className={`border border-light text-light ${location.pathname === "/auth/dashboard" ? "activeClicked" : ""}`}
          >
            <CDBSidebarMenuItem
              className={`border border-light text-light mx-1 rounded-2 ${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} my-2 shadow`}
              icon="bi bi-menu-button-wide "
              active={location.pathname === "/auth/dashboard" ? true : false}
            >
              Admin Dashboard
            </CDBSidebarMenuItem>
          </Link>
          <Link to="/auth/dashboard" className={location.pathname === "/auth/dashboard" ? "activeClicked" : ""}
          >
            <CDBSidebarMenuItem
              className={`border border-light text-light mx-1 rounded-2 ${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} my-2 shadow`}
              icon="bi bi-menu-button-wide "
              active={location.pathname === "/auth/dashboard" ? true : false}
            >
              Collections
            </CDBSidebarMenuItem>
          </Link>
          <Link to="/auth/dashboard" className={location.pathname === "/auth/dashboard" ? "activeClicked" : ""}
          >
            <CDBSidebarMenuItem
              className={`border border-light text-light mx-1 rounded-2 ${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} my-2 shadow`}
              icon="bi bi-menu-button-wide "
              active={location.pathname === "/auth/dashboard" ? true : false}
            >
              Analytics
            </CDBSidebarMenuItem>
          </Link>
          <Link to="/auth/dashboard" className={location.pathname === "/auth/dashboard" ? "activeClicked" : ""}
          >
            <CDBSidebarMenuItem
              className={`border border-light text-light mx-1 rounded-2 ${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} my-2 shadow`}
              icon="bi bi-menu-button-wide "
              active={location.pathname === "/auth/dashboard" ? true : false}
            >
              Admin Dashboard
            </CDBSidebarMenuItem>
          </Link>
          <Link to="/auth/dashboard" className={location.pathname === "/auth/dashboard" ? "activeClicked" : ""}
          >
            <CDBSidebarMenuItem
              className={`border border-light text-light mx-1 rounded-2 ${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} my-2 shadow`}
              icon="bi bi-menu-button-wide "
              active={location.pathname === "/auth/dashboard" ? true : false}
            >
              Admin Dashboard
            </CDBSidebarMenuItem>
          </Link>
        </>
      ) : auth.Organization === "Department" ? (
        <>
          <Link to="/auth/dashboard" className={location.pathname === "/auth/dashboard" ? "activeClicked" : ""}
          >
            <CDBSidebarMenuItem
              className={`border border-light text-light mx-1 rounded-2 ${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} my-2 shadow`}
              icon="bi bi-menu-button-wide "
              active={location.pathname === "/auth/dashboard" ? true : false}
            >
              Department Dashboard
            </CDBSidebarMenuItem>
          </Link>
          <Link to="/auth/manage-product" className={location.pathname === "/auth/manage-product" ? "activeClicked" : ""}
          >
            <CDBSidebarMenuItem
              className={`border border-light text-light mx-1 rounded-2 ${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} my-2 shadow`}
              icon="bi bi-menu-button-wide "
              active={location.pathname === "/auth/manage-product" ? true : false}
            >
              Manage Products
            </CDBSidebarMenuItem>
          </Link>
          <Link to="/auth/manage-product-category" className={location.pathname === "/auth/manage-product-category" ? "activeClicked" : ""}
          >
            <CDBSidebarMenuItem
              className={`border border-light text-light mx-1 rounded-2 ${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} my-2 shadow`}
              icon="bi bi-menu-button-wide "
              active={location.pathname === "/auth/manage-product-category" ? true : false}
            >
              Manage Products
            </CDBSidebarMenuItem>
          </Link>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
const Sidebar = () => {
  const [sidebarOpen]= sidebarAuth()

  return (
    <div
      style={{
        borderTop:"1px solid lightgrey",
        display: "flex",
        minHeight: "100vh",
        overflow: "scroll initial",
      }}
    >
      <CDBSidebar
        className="my-sidebar"
        textColor="white" 
        backgroundColor="#1976d2"
        breakpoint={768}
        toggled={false}
        minWidth={sidebarOpen.open === "250px" ? "70px": "250px"}
        maxWidth={sidebarOpen.open === "75px" ? "250px": "70px" }
        
      >
        
        <CDBSidebarContent className="sidebar-content ">
          <CDBSidebarMenu className="p-0">{SideBarItems()}</CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter>
          <div style={{ padding: "20px 5px" }}>Sidebar Footer</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
