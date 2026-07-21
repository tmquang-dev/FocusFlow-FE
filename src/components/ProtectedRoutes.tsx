import { Navigate, Outlet, useLocation } from "react-router";

export default function ProtectedRoutes() {
    const location = useLocation();

    const isAuthenticated = localStorage.getItem("focusFlowToken") ? true : false;

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <Outlet />;
}

