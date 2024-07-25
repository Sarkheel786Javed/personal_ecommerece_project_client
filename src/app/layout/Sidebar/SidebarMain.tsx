import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Link } from 'react-router-dom';
import DataSide from './SidebarItems/SideBarItems';

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar
        className="my-sidebar" // Example class name
        textColor="#fff" // Example text color
        backgroundColor="#333" // Example background color
        breakpoint={768} // Example breakpoint
        toggled={false} minWidth={'70px'} maxWidth={'300px'}      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content ">
          <CDBSidebarMenu className='bg-dark'>
            {DataSide.map((path, index) => (
              <Link key={index} to={path.navigate} className="activeClicked">
                <CDBSidebarMenuItem icon={path.icon}>{path.title}</CDBSidebarMenuItem>
              </Link>
            ))}
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter>
          <div style={{ padding: '20px 5px' }}>
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
