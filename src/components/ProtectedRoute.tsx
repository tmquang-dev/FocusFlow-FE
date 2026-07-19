import { Navigate, Outlet, useLocation } from "react-router";

export default function ProtectedRoute() {
    const location = useLocation();

    const isAuthenticated = localStorage.getItem("token") ? true : false;

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <Outlet />;
}
