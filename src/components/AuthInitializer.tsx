import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setUser, clearUser, setInitializing } from "@/components/profile/profileSlice";
import { userServices } from "@/api/services/userServices";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const isInitializing = useAppSelector((state) => state.profile.isInitializing);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await userServices.getMe();
                dispatch(setUser(res.data.user));
            } catch {
                dispatch(clearUser());
            } finally {
                dispatch(setInitializing(false));
            }
        };

        void initAuth();
    }, [dispatch]);

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

    return <>{children}</>;
}
