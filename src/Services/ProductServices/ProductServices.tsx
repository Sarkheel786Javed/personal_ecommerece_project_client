import axios from "axios";
import axiosInstance from "../../Components/Httpintercepter/Httpintercepter";

// const baseUrl = "https://my-personal-ecommerece-project.vercel.app/api/";
const baseUrl = "http://localhost:7000/api/";
const ProductService = {
  addProduct: (data: any) => {
    return axiosInstance.post(`${baseUrl}product/add-product`, data);
  },
  getProduct: (data: any) => {
    return axiosInstance.get(`${baseUrl}product/get-products`, data);
  },
  deleteProduct: (productId: string) => {
    return axiosInstance.delete(`${baseUrl}product/delete-product/${productId}`);
  },
  //  categoryName, userId
  createCategories: (data: any) => {
    return axiosInstance.post(`${baseUrl}product/category/add-category`, data);
  },
  getCategories: (data: any) => {
    return axiosInstance.get(`${baseUrl}product/category/get-category`, data);
  },
 DeleteCategories: (CategoryId: any) => {
    return axiosInstance.delete(`${baseUrl}product/category/delete-category/${CategoryId}`);
  },
};

// let logoutTimer: NodeJS.Timeout;

// const setLogoutTimer = (duration: number) => {
//   clearLogoutTimer();
//   console.log("================", duration);
//   logoutTimer = setTimeout(() => {
//     ProductService.logout();
//     window.location.href = "/login"; // Redirect to login page
//   }, duration);
// };

// const clearLogoutTimer = () => {
//   if (logoutTimer) {
//     clearTimeout(logoutTimer);
//   }
// };

export { ProductService };
