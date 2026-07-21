import type { RouteObject } from "react-router";
import MainLayout from "../components/layouts/mainLayout";
import Home from "../pages/home/Home";
import ProtectedRoutes from "../components/ProtectedRoutes";

export const protectedRoutes: RouteObject =
{
    element: <ProtectedRoutes />,
    children: [
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
            ]
        }
    ]
}