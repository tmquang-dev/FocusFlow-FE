import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "@/app/hooks";

export default function ProtectedRoutes() {
    const location = useLocation();
    const user = useAppSelector((state) => state.profile.user);

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}
