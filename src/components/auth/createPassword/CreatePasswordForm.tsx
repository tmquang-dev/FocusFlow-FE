import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import AlertMessage from "@/components/common/AlertMessage";

import { createPasswordSchema, type CreatePasswordSchema } from "./CreatePasswordForm.schema";
import type { IResponseMessage } from "./CreatePasswordForm.type";
import type { IApiCompleteRegisterError } from "@/api/services/authServices.type";
import { authServices } from "@/api/services/authServices";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/components/profile/profileSlice";

function CreatePasswordForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [responseMessage, setResponseMessage] = useState<IResponseMessage | null>(null);
    const token = sessionStorage.getItem("registration_token") ?? "";

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreatePasswordSchema>({
        resolver: zodResolver(createPasswordSchema),
        mode: "onBlur",
    });

    useEffect(() => {
        if (!token) {
            void navigate("/register");
        }
    }, [token, navigate]);

    const onSubmit = async (data: CreatePasswordSchema) => {
        if (!token) return;

        try {
            const res = await authServices.completeRegister(
                {
                    password: data.password,
                    confirm_password: data.confirmPassword,
                },
                token
            );

            localStorage.setItem("focusFlowToken", res.data.access_token);
            dispatch(setUser(res.data.user));
            setResponseMessage({ message: "Account created successfully", type: "success" });

            setTimeout(() => {
                void navigate("/");
                sessionStorage.removeItem("registration_token");
            }, 1000);
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
                type="password"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register("password")}
            />

            {/* Confirm Password field */}
            <InputField
                label="Confirm Password"
                id="input-confirm-password"
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
            />

            {/* Submit button */}
            <Button isloading={isSubmitting} variant="primary" type="submit" className="w-full">
                Create account
            </Button>
        </form>
    );
}

export default CreatePasswordForm;
