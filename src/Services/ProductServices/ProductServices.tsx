import axios from "axios";

// const baseUrl = "https://my-personal-ecommerece-project.vercel.app/api/";
const baseUrl = "http://localhost:7000/api/";
const ProductService = {
  addProduct: (data: any) => {
    return axios.post(`${baseUrl}product/add-product`, data);
  },
  getProduct: (data:any) => {
    return axios.get(`${baseUrl}product/get-products` ,data);
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
