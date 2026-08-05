import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setUser, clearUser, setInitializing } from "@/components/profile/profileSlice";
import { userServices } from "@/api/services/userServices";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

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

    return <>{children}</>;
}

