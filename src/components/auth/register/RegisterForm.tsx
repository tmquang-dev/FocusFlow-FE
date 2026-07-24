import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"

import Button from "@/components/common/Button"
import InputField from "@/components/common/InputField"
import AlertMessage from "@/components/common/AlertMessage"


import { registerSchema, type RegisterSchema } from "./RegisterForm.schema"
import { type IApiRegisterError } from "@/api/services/authServices.type"
import type { IResponseMessage } from "./RegisterForm.type"
import { authServices } from "@/api/services/authServices"
import SocialsAuth from "../socialAuth/SocialAuth"


function RegisterForm() {
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState<IResponseMessage | null>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onBlur'
    });

    const onSubmit = async (data: RegisterSchema) => {
        try {
            await authServices.register(data);
            // set timestamp to local storage
            const availableAt = Date.now() + 60 * 1000;
            localStorage.setItem(`otp_resend_${data.email}`, availableAt.toString());

            // Transfer email to URL Query String
            void navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
        } catch (error) {
            if (axios.isAxiosError<IApiRegisterError>(error)) {
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
    }

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
                id="input-1"
                placeholder="name@example.com"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
            />


            {/* Submit button */}
            <Button isloading={isSubmitting} variant="primary" type="submit" className="w-full">
                Register
            </Button>


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
                <span className="text-text-secondary font-text-medium">Already have an account?</span>
                <Link
                    to="/login"
                    className="text-primary-600 font-text-medium hover:underline cursor-pointer"
                >
                    Login
                </Link>
            </div>
        </form>
    )
}

export default RegisterForm