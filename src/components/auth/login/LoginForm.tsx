import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link, useNavigate } from "react-router";

import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import AlertMessage from "@/components/common/AlertMessage";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/components/profile/profileSlice";
import SocialsAuth from "../socialAuth/SocialAuth";

import { EyeIcon, EyeOffIcon } from "@/components/common/Icons";
import { loginSchema, type LoginSchema } from "./LoginForm.shema";
import type { IResponseLogin } from "./LoginForm.type";
import { authServices } from "@/api/services/authServices";
import { type IApiLoginError } from "@/api/services/authServices.type";
function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [responseMessage, setResponseMessage] = useState<IResponseLogin | null>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur'
    });

    const onSubmit = async (data: LoginSchema) => {
        try {
            const res = await authServices.login(data);
            localStorage.setItem("focusFlowToken", res.data.access_token);
            dispatch(setUser(res.data.user));
            setResponseMessage({ message: "Login success, redirecting to home...", type: res.status });
            setTimeout(() => {
                void navigate("/");
            }, 1500);
        } catch (error) {
            if (axios.isAxiosError<IApiLoginError>(error)) {
                const responseData = error.response?.data;
                const message = responseData?.message ?? "An unknown error occurred";
                const status = responseData?.status ?? "error";
                setResponseMessage({
                    message,
                    type: status
                });
            } else {
                setResponseMessage({ message: "An unexpected error occurred", type: "error" });
            }
        }
    };


    return (
        <form onSubmit={(e) => { void handleSubmit(onSubmit)(e); }} className="flex flex-col gap-3 items-center w-full">
            {responseMessage && (
                <AlertMessage
                    description={responseMessage.message}
                    type={responseMessage.type}
                />
            )}
            {/* Email field */}
            <InputField
                label="Email"
                id="input-1"
                placeholder="name@example.com"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
            />

            {/* Password field */}
            <InputField
                label="Password"
                id="input-2"
                placeholder="••••••••"
                type={isPasswordVisible ? "text" : "password"}
                autoComplete="current-password"
                error={errors.password?.message}
                {...register("password")}
                rightIcon={
                    <button
                        type="button"
                        onClick={() => { setIsPasswordVisible(!isPasswordVisible); }}
                        className="text-text-secondary hover:text-text-main transition-colors cursor-pointer flex items-center justify-center border-none bg-transparent focus:outline-none"
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    >
                        {isPasswordVisible ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                }
            />

            {/* Submit button */}
            <Button variant="primary" type="submit" className="w-full" isloading={isSubmitting}>
                Log In
            </Button>

            {/* Forgot password */}
            <div className="flex justify-end w-full">
                <Link
                    to="/forgot-password"
                    className="text-primary-600 font-text-medium hover:underline cursor-pointer"
                >
                    Forgot password?
                </Link>
            </div>

            {/* Separator */}
            <div className="flex items-center w-full gap-0 py-2.5">
                <div className="flex-1 h-px bg-border" />
                <span className="px-3 text-xs leading-4 text-text-placeholder">Or</span>
                <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social auth */}
            <SocialsAuth />

            {/* Sign up link */}
            <div className="flex items-center justify-center gap-1 py-0.5 w-full">
                <span className="text-text-secondary font-text-medium">New FocusFlow account?</span>
                <Link
                    to="/register"
                    className="text-primary-600 font-text-medium hover:underline cursor-pointer"
                >
                    Create an account
                </Link>
            </div>
        </form>
    )
}

export default LoginForm