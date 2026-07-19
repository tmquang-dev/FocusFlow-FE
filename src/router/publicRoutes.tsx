import type { RouteObject } from "react-router";
import Register from "../pages/auth/register/Register.tsx";
import Login from "../pages/auth/login/Login.tsx";

export const publicRoutes: RouteObject[] = [
    {
        path: "login",
        element: <Login />
    },
    {
        path: "register",
        element: <Register />
    }
]