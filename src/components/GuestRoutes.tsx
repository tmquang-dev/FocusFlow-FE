import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/app/hooks";

export default function GuestRoutes() {
    const user = useAppSelector((state) => state.profile.user);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
