import Swal from "sweetalert2";
import { DepartmentServices } from "../../Services/UserDepartmentServices/UserDepartmentServices";
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
function UserDashboard() {
  // const [showDepartmentModal, setShowDepartmentModal] = React.useState<boolean>(false)
  const requestForDepartment = async (departmentRequest: boolean) => {
    try {
      await DepartmentServices.userDepartmentRequest(departmentRequest).then(
        (res) => {
          if (res.data) {
            Toast.fire({
              showCloseButton: true,
              icon: "success",
              title: res.data.message,
            });
          }
        }
      );
    } catch (error) {
      console.error("Error for request department", error);
    }
  };

  return (
    <div className="">
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary "
          onClick={() => requestForDepartment(true)}
        >
          Request Department
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
