import axios from "axios";
import { useNavigate } from "react-router";
import Button from "./Button";
import { LogOutIcon, UserIcon } from "./Icons";
import { authServices } from "@/api/services/authServices";
import type { IApiLoginError } from "@/api/services/authServices.type";
import { useAppDispatch } from "@/app/hooks";
import { clearUser } from "@/components/profile/profileSlice";

function Menu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogOut = async () => {
        try {
            await authServices.logout();
            dispatch(clearUser());
            onClose();
            void navigate("/login");
        } catch (error) {
            if (axios.isAxiosError<IApiLoginError>(error)) {
                const responseData = error.response?.data;
                const message = responseData?.message ?? "An unknown error occurred";
                console.error("Logout error:", message);
            } else {
                console.error("An unexpected error occurred during logout");
            }
            dispatch(clearUser());
            onClose();
            void navigate("/login");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="absolute -left-29 -bottom-17 w-40 flex flex-col justify-center items-start bg-background-secondary-0 rounded-sm border border-border shadow-custom-gray overflow-hidden z-50">
            <Button to="/profile" onClick={onClose} leftIcon={<UserIcon className="text-text-main" />} variant="outlined" className="text-text-main py-2 px-4 rounded-none w-full justify-start font-text-default">
                Profile
            </Button>
            <Button onClick={() => { void handleLogOut(); }} leftIcon={<LogOutIcon className="text-text-main" />} variant="outlined" className="text-text-main py-2 px-4 rounded-none w-full justify-start font-text-default">
                Log out
            </Button>
        </div>
    );
}

export default Menu;