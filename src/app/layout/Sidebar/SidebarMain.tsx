import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link } from "react-router-dom";
import { DataSide } from "./SidebarItems/SideBarItems";
import { AuthService } from "../../../Services/AuthServices/AuthServices";
import { useAuth } from "../../createContextAuth/createContex";

const SideBarItems = () => {
  const [auth] = useAuth()

  const token = AuthService.getToken();
  console.log("Token:", token);


  return (
    <div>
      {
        auth.Organization === "User" 
    ? (
      <>
       {DataSide.map((path, index) => (
        <Link key={index} to={path.navigate} className="activeClicked">
          <CDBSidebarMenuItem icon={path.icon}>{path.title}</CDBSidebarMenuItem>
        </Link>
      ))}
      </>
    )
    : auth.Organization === "Admin"  
    ? (
      <>
       {DataSide.map((path, index) => (
        <Link key={index} to={path.navigate} className="activeClicked">
          <CDBSidebarMenuItem icon={path.icon}>{path.title}</CDBSidebarMenuItem>
        </Link>
      ))}
      </>
      )
    : auth.Organization === "Department"  
    ? (
      <>
       {DataSide.map((path, index) => (
        <Link key={index} to={path.navigate} className="activeClicked">
          <CDBSidebarMenuItem icon={path.icon}>{path.title}</CDBSidebarMenuItem>
        </Link>
      ))}
      </>
      )
    :""
    }
    </div>
  );
};
const Sidebar = () => {
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar
        className="my-sidebar" // Example class name
        textColor="#fff" // Example text color
        backgroundColor="#333" // Example background color
        breakpoint={768} // Example breakpoint
        toggled={false}
        minWidth={"70px"}
        maxWidth={"300px"}
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Sidebar
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content ">
          <CDBSidebarMenu className="bg-dark">{SideBarItems()}</CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter>
          <div style={{ padding: "20px 5px" }}>Sidebar Footer</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
