import type { RouteObject } from "react-router";
import Register from "@/pages/auth/register/Register.tsx";
import Login from "@/pages/auth/login/Login.tsx";
import GuestRoutes from "@/components/GuestRoutes.tsx";
import VerifyOtp from "@/pages/auth/verify-otp/VerifyOtp.tsx";
import CreatePassword from "@/pages/auth/create-password/CreatePassword.tsx";

export const publicRoutes: RouteObject = {
    element: <GuestRoutes />,
    children: [
        {
            path: "login",
            element: <Login />
        },
        {
            path: "register",
            element: <Register />
        },
        {
            path: "verify-otp",
            element: <VerifyOtp />
        },
        {
            path: "create-password",
            element: <CreatePassword />
        },
    ],
};
