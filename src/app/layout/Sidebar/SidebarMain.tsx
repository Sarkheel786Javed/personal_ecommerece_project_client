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
          <Link to="/" className="activeClicked text-light"
          >
            <CDBSidebarMenuItem
              className={`${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} text-light bg-warning rounded px-1 my-2 shadow`}
              icon="bi bi-menu-button-wide "
            >
              User Dashboard
            </CDBSidebarMenuItem>
          </Link>
        </>
      ) : auth.Organization === "Admin" ? (
        <>
          <Link to="/auth/dashboard" className="activeClicked text-light"
          >
            <CDBSidebarMenuItem
              className={`${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} text-light bg-warning rounded px-1 my-2 shadow`}
              icon="bi bi-menu-button-wide "
            >
              Admin Dashboard
            </CDBSidebarMenuItem>
          </Link>
          <Link to="/auth/dashboard" className="activeClicked text-light"
          >
            <CDBSidebarMenuItem
              className={`${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} text-light bg-warning rounded px-1 my-2 shadow`}
              icon="bi bi-menu-button-wide "
            >
              Collections
            </CDBSidebarMenuItem>
          </Link>
          <Link to="/auth/dashboard" className="activeClicked text-light"
          >
            <CDBSidebarMenuItem
              className={`${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} text-light bg-warning rounded px-1 my-2 shadow`}
              icon="bi bi-menu-button-wide "
            >
              Analytics
            </CDBSidebarMenuItem>
          </Link>
          <Link to="/auth/dashboard" className="activeClicked text-light"
          >
            <CDBSidebarMenuItem
              className={`${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} text-light bg-warning rounded px-1 my-2 shadow`}
              icon="bi bi-menu-button-wide "
            >
              Admin Dashboard
            </CDBSidebarMenuItem>
          </Link>
          <Link to="/auth/dashboard" className="activeClicked text-light"
          >
            <CDBSidebarMenuItem
              className={`${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} text-light bg-warning rounded px-1 my-2 shadow`}
              icon="bi bi-menu-button-wide "
            >
              Admin Dashboard
            </CDBSidebarMenuItem>
          </Link>
        </>
      ) : auth.Organization === "Department" ? (
        <>
          <Link to="/" className="activeClicked text-light"
          >
            <CDBSidebarMenuItem
              className={`${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} text-light bg-warning rounded px-1 my-2 shadow`}
              icon="bi bi-menu-button-wide "
            >
              Department Dashboard
            </CDBSidebarMenuItem>
          </Link>
          <Link to="/auth/manage-product" className="activeClicked text-light"
          >
            <CDBSidebarMenuItem
              className={`${sidebarOpen.open === "75px" ? "mx-0" : "mx-2"} text-light bg-warning rounded px-1 my-2 shadow`}
              icon="bi bi-menu-button-wide "
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
        className="my-sidebar" // Example class name
        textColor="#ffff" // Example text color
        backgroundColor="#ffc107" // Example background color
        breakpoint={768} // Example breakpoint
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
