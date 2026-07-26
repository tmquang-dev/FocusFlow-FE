import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import AlertMessage from "@/components/common/AlertMessage";

import { forgotPasswordSchema, type ForgotPasswordSchema } from "./ForgotPasswordForm.schema";
import type { IApiForgotPasswordError } from "@/api/services/authServices.type";
import type { IResponseMessage } from "./ForgotPasswordForm.type";
import { authServices } from "@/api/services/authServices";

function ForgotPasswordForm() {
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState<IResponseMessage | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: ForgotPasswordSchema) => {
        try {
            const res = await authServices.forgotPassword(data);
            const availableAt = Date.now() + 60 * 1000;
            localStorage.setItem(`otp_resend_${data.email}`, availableAt.toString());
            setResponseMessage({ message: res.message, type: "success" });

            void navigate(`/verify-otp?email=${encodeURIComponent(data.email)}&type=reset_password`);
        } catch (error) {
            if (axios.isAxiosError<IApiForgotPasswordError>(error)) {
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

            {/* Email field */}
            <InputField
                label="Email"
                id="input-email"
                placeholder="name@example.com"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
            />

            {/* Submit button */}
            <Button isloading={isSubmitting} variant="primary" type="submit" className="w-full">
                Continue
            </Button>
        </form>
    );
}

export default ForgotPasswordForm;
