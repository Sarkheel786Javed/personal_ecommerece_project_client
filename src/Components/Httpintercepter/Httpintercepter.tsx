import axios from 'axios';

// Create an instance of Axios with default configuration
const axiosInstance = axios.create();
  
// Add a request interceptor to attach the    token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the authentication token from wherever you store it (e.g., local storage, cookies, Redux store)
    // const authToken = localStorage.getItem('authToken');
    const authToken = localStorage.getItem('token');

    // If an authentication token exists, add it to the request headers
    if (authToken) {
      config.headers!.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
