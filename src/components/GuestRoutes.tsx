import { Navigate, Outlet } from "react-router";

export default function GuestRoutes() {
    const isAuthenticated = localStorage.getItem("focusFlowToken") ? true : false;

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
