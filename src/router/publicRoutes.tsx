/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router";
import GuestRoutes from "@/components/GuestRoutes.tsx";

const Register = lazy(() => import("@/pages/auth/register/Register.tsx"));
const Login = lazy(() => import("@/pages/auth/login/Login.tsx"));
const VerifyOtp = lazy(() => import("@/pages/auth/verify-otp/VerifyOtp.tsx"));
const CreatePassword = lazy(
  () => import("@/pages/auth/create-password/CreatePassword.tsx"),
);
const ForgotPassword = lazy(
  () => import("@/pages/auth/forgot-password/ForgotPassword.tsx"),
);
const GithubCallback = lazy(
  () => import("@/pages/auth/github-callback/GithubCallback.tsx"),
);

const PageFallback = (
  <div className="min-h-screen w-full bg-background-main flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

export const publicRoutes: RouteObject = {
  element: <GuestRoutes />,
  children: [
    {
      path: "login",
      element: (
        <Suspense fallback={PageFallback}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "register",
      element: (
        <Suspense fallback={PageFallback}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: "verify-otp",
      element: (
        <Suspense fallback={PageFallback}>
          <VerifyOtp />
        </Suspense>
      ),
    },
    {
      path: "create-password",
      element: (
        <Suspense fallback={PageFallback}>
          <CreatePassword />
        </Suspense>
      ),
    },
    {
      path: "forgot-password",
      element: (
        <Suspense fallback={PageFallback}>
          <ForgotPassword />
        </Suspense>
      ),
    },
    {
      path: "oauth/github/callback",
      element: (
        <Suspense fallback={PageFallback}>
          <GithubCallback />
        </Suspense>
      ),
    },
  ],
};
