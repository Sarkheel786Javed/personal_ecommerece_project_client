import { useAuth } from "../../app/createContextAuth/createContex";
import DepartmentDashboard from "../departmentManagement/DepartmentDashboard/DepartmentDashboard";
import UserDashboard from "../UserDashboard/UserDashboard";
function Dashboard() {
  const [auth] = useAuth();

  return (
    <div>
      {auth.Organization === "User" ? (
        <>
          <UserDashboard />
        </>
      ) : auth.Organization === "Admin" ? (
        <>
        
        </>
      ) : auth.Organization === "Department" ? (
        <>
          <DepartmentDashboard />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Dashboard;
