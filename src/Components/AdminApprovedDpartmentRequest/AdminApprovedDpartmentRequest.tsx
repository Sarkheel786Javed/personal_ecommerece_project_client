import { useEffect, useState } from "react";
import { DepartmentServices } from "../../Services/UserDepartmentServices/UserDepartmentServices";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox } from "@mui/material";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
interface AdmindepartmentRequest {
  _id: string;
  departmentRequest: boolean;
  userId: string;
  organization: string;
  organizationUserName: string;
}

function BasicTable() {
  const [requests, setRequests] = useState<AdmindepartmentRequest[]>([]);
  const [checkedItems, setCheckedItems] = useState<AdmindepartmentRequest[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DepartmentServices.adminGetRequestDepartment();
        setRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (item: AdmindepartmentRequest) => {
    setCheckedItems((prevCheckedItems) => {
      const isSelected = prevCheckedItems.some(
        (checkedItem) => checkedItem._id === item._id
      );

      const updatedCheckedItems = isSelected
        ? prevCheckedItems.filter((checkedItem) => checkedItem._id !== item._id)
        : [...prevCheckedItems, item];

      console.log("Selected items:", updatedCheckedItems);

      return updatedCheckedItems;
    });
  };

  const handleSubmit = async () => {
    try {
      for (const item of checkedItems) {
        const response = await DepartmentServices.updateUserDepartments(
          item.userId
        );
        if (response.data) {
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      }
      console.log("All requests submitted successfully");
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ width: "100%", maxHeight: "calc(100vh - 80px)" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>_id</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell align="right">Organization User Name</TableCell>
              <TableCell align="right">Department Permission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell>{row.organizationUserName}</TableCell>
                <TableCell align="right">{row.organization}</TableCell>
                <TableCell align="right">
                  <Checkbox
                    {...label}
                    checked={checkedItems.some(
                      (checkedItem) => checkedItem._id === row._id
                    )}
                    onChange={() => handleCheckboxChange(row)}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button className="btn btn-primary mt-5 w-100" onClick={handleSubmit}>
        Approved Requests
      </button>
    </>
  );
}

function AdminApprovedDpartmentRequest() {
  return (
    <div className="container-fluid mt-3">
      <BasicTable />
    </div>
  );
}

export default AdminApprovedDpartmentRequest;
