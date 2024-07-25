import  { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; // Ensure you import from 'react-router-dom'
import SidebarMain from '../../app/layout/Sidebar/SidebarMain';
import { useAuth } from '../createContextAuth/createContex';
import { jwtDecode } from 'jwt-decode';

function Authorization() {
  const [auth] = useAuth();
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) {
      try {
        const decoded = jwtDecode(auth.token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      navigate("/login");
    }
  }, [auth, navigate]);

  if (!decodedToken) {
    return null; // or a loading spinner if you prefer
  }else{
    navigate("/auth/dashboard");
  }

  return (
    <div className='d-flex'>
      <SidebarMain />
      <Outlet />
    </div>
  );
}

export default Authorization;
