import { Navigate, Outlet } from 'react-router-dom';
import {AuthService} from '../../Services/AuthServices/AuthServices';

const PrivateRoute = () => {
  const token = AuthService.getToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
