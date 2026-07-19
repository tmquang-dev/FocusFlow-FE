import type { RouteObject } from "react-router";
import MainLayout from "../components/layouts/mainLayout";
import Home from "../pages/home/Home";
import ProtectedRoute from "../components/ProtectedRoute";

export const protectedRoutes: RouteObject =
{
    element: <ProtectedRoute />,
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