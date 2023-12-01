import { useLocation, Navigate, Outlet } from 'react-router-dom';

function RequireAuth() {
  const location = useLocation();
  const getToken = JSON.parse(localStorage.getItem('Token')) || '';

  return getToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
