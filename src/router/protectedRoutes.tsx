/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router";
import MainLayout from "../components/layouts/MainLayout";
import ProtectedRoutes from "../components/ProtectedRoutes";
import PageFallback from "@/components/common/PageFallback";

const Home = lazy(() => import("../pages/home/Home"));
const FocusMode = lazy(() => import("../pages/focusMode/FocusMode"));
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));

export const protectedRoutes: RouteObject = {
  element: <ProtectedRoutes />,
  children: [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<PageFallback />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "focus-mode",
          element: (
            <Suspense fallback={<PageFallback />}>
              <FocusMode />
            </Suspense>
          ),
        },
        {
          path: "profile",
          element: (
            <Suspense fallback={<PageFallback />}>
              <ProfilePage />
            </Suspense>
          ),
        },
      ],
    },
  ],
};
