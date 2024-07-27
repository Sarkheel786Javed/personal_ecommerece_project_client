import { useEffect, useState } from 'react';
import axios from 'axios';
import {  AuthService, setLogoutTimer } from '../../Services/AuthServices/AuthServices';

const useAxiosInstance = () => {
  const instance = axios.create({
    baseURL: "https://my-personal-ecommerece-project.vercel.app/api",
    headers: { 'Content-Type': 'application/json' },
  });

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        const token = AuthService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const token = AuthService.getToken();
          try {
            const response = await AuthService.regenerateToken(token);
            localStorage.setItem('token', response.data.token);
            setLogoutTimer(5 * 60 * 1000); // Reset logout timer
            originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
            return axios(originalRequest);
          } catch (err) {
            AuthService.logout();
            window.location.href = '/login'; // Redirect to login page
            return Promise.reject(err); // Reject the promise to prevent further action
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return instance;
};



const ExampleComponent = () => {
  const axiosInstance = useAxiosInstance();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/some-endpoint');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  return (
    <div>
      <h2>Example Data</h2>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default ExampleComponent;
