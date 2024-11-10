import axiosInstance from "../../Components/Httpintercepter/Httpintercepter";

// const baseUrl = "https://my-personal-ecommerece-project.vercel.app/api/";
const baseUrl = "http://localhost:7000/api/";
const DepartmentServices = {
  userDepartmentRequest: (departmentRequest: boolean) => {
    return axiosInstance.post(
      `${baseUrl}departmentrequest/department/${departmentRequest}`
    );
  },
  adminGetRequestDepartment: () => {
    return axiosInstance.get(
      `${baseUrl}departmentrequest/adminGetRequestDepartment`
    );
  },
  updateUserDepartments: (userId:any) => {
    return axiosInstance.post(
      `${baseUrl}user/update-user-departments/${userId}`
    );
  },
};

export { DepartmentServices };
