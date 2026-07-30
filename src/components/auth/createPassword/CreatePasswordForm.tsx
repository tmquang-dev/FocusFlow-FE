import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import AlertMessage from "@/components/common/AlertMessage";
import { EyeIcon, EyeOffIcon } from "@/components/common/Icons";

import { createPasswordSchema, type CreatePasswordSchema } from "./CreatePasswordForm.schema";
import type { IResponseMessage } from "./CreatePasswordForm.type";
import type { IApiCompleteRegisterError } from "@/api/services/authServices.type";
import { authServices } from "@/api/services/authServices";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/components/profile/profileSlice";

function CreatePasswordForm() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const [responseMessage, setResponseMessage] = useState<IResponseMessage | null>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const type = searchParams.get("type") ?? "register";
    const isReset = type === "reset_password";
    const token = sessionStorage.getItem(isReset ? "reset_token" : "registration_token") ?? "";

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreatePasswordSchema>({
        resolver: zodResolver(createPasswordSchema),
        mode: "onBlur",
    });

    useEffect(() => {
        if (!token) {
            void navigate(isReset ? "/forgot-password" : "/register");
        }
    }, [token, isReset, navigate]);

    const onSubmit = async (data: CreatePasswordSchema) => {
        if (!token) return;

        try {
            if (isReset) {
                const res = await authServices.resetPassword(
                    {
                        password: data.password,
                        confirm_password: data.confirmPassword,
                    },
                    token
                );
                setResponseMessage({ message: res.message, type: "success" });

                const timer = setTimeout(() => {
                    sessionStorage.removeItem("reset_token");
                    void navigate("/login");
                }, 1000);
                return () => { clearTimeout(timer) };
            } else {
                const res = await authServices.completeRegister(
                    {
                        password: data.password,
                        confirm_password: data.confirmPassword,
                    },
                    token
                );

                dispatch(setUser(res.data.user));
                setResponseMessage({ message: "Account created successfully", type: "success" });

                const timer = setTimeout(() => {
                    sessionStorage.removeItem("registration_token");
                    void navigate("/");
                }, 1000);
                return () => { clearTimeout(timer) };
            }
        } catch (error) {
            if (axios.isAxiosError<IApiCompleteRegisterError>(error)) {
                const responseData = error.response?.data;
                const message = responseData?.message ?? "An unknown error occurred";
                const status = responseData?.status ?? "error";
                setResponseMessage({
                    message,
                    type: status,
                });
            } else {
                setResponseMessage({ message: "An unexpected error occurred", type: "error" });
            }
        }
    };

    return (
        <form onSubmit={(e) => { void handleSubmit(onSubmit)(e); }} className="flex flex-col gap-3 items-center w-full">
            {/* Alert message */}
            {responseMessage && (
                <AlertMessage
                    description={responseMessage.message}
                    type={responseMessage.type}
                />
            )}

            {/* Password field */}
            <InputField
                label="Password"
                id="input-password"
                placeholder="••••••••"
                type={isPasswordVisible ? "text" : "password"}
                autoComplete="new-password"
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

            {/* Confirm Password field */}
            <InputField
                label="Confirm Password"
                id="input-confirm-password"
                placeholder="••••••••"
                type={isConfirmPasswordVisible ? "text" : "password"}
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
                rightIcon={
                    <button
                        type="button"
                        onClick={() => { setIsConfirmPasswordVisible(!isConfirmPasswordVisible); }}
                        className="text-text-secondary hover:text-text-main transition-colors cursor-pointer flex items-center justify-center border-none bg-transparent focus:outline-none"
                        aria-label={isConfirmPasswordVisible ? "Hide confirm password" : "Show confirm password"}
                    >
                        {isConfirmPasswordVisible ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                }
            />

            {/* Submit button */}
            <Button isloading={isSubmitting} variant="primary" type="submit" className="w-full">
                {isReset ? "Reset Password" : "Create account"}
            </Button>
        </form>
    );
}

export default CreatePasswordForm;
