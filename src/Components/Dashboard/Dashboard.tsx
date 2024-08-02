import { useAuth } from "../../app/createContextAuth/createContex";
import DepartmentDashboard from "../departmentManagement/DepartmentDashboard/DepartmentDashboard";
function Dashboard() {
  const [auth] = useAuth();

  return (
    <div>
      {auth.Organization === "User" ? (
        <>

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
  )
}

export default Dashboard;
