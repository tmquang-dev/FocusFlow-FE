import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "@/app/hooks";

export default function ProtectedRoutes() {
    const location = useLocation();
    const user = useAppSelector((state) => state.profile.user);
    const isInitializing = useAppSelector((state) => state.profile.isInitializing);

    if (isInitializing) {
        return (
            <div className="min-h-screen w-full bg-background-main flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-text-secondary font-medium">Loading FocusFlow...</span>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

