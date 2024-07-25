// // services/authService.js
// import axiosInstance from '../utils/axiosInstance';

// const refreshAccessToken = async () => {
//   try {
//     const refreshToken = localStorage.getItem('refreshToken');
//     const response = await axiosInstance.post('/refresh-token', { token: refreshToken });
//     const { token } = response.data;

//     localStorage.setItem('accessToken', token);

//     return token;
//   } catch (error) {
//     throw new Error('Token refresh failed');
//   }
// };

// export { refreshAccessToken };
