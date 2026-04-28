 

import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { UseAppData } from '../context/AppContext';

const ProtectedRoute = () => {
    const { isAuth, user, loading } = UseAppData();

    if (loading) return null;
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role === null && location.pathname !== "/select-role") {
        return <Navigate to="/select-role" replace />;
    }
    
      if (user?.role! == null && location.pathname === "/select-role") {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}

export default ProtectedRoute;
