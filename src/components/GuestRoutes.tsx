import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/app/hooks";

export default function GuestRoutes() {
    const user = useAppSelector((state) => state.profile.user);
    const isInitializing = useAppSelector((state) => state.profile.isInitializing);

    if (!isInitializing && user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

