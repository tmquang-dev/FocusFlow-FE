import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import AlertMessage from "@/components/common/AlertMessage";

import { verifyOtpSchema, type VerifyOtpSchema } from "./VerifyOtpForm.schema";
import { type IApiVerifyOtpError } from "@/api/services/authServices.type";
import type { IResponseMessage } from "./VerifyOtpForm.type";
import { authServices } from "@/api/services/authServices";
import ResendOtp from "./resendOtp/ResendOtp";

function VerifyOtpForm() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email") ?? "";

    const [responseMessage, setResponseMessage] = useState<IResponseMessage | null>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<VerifyOtpSchema>({
        resolver: zodResolver(verifyOtpSchema),
        mode: 'onBlur',
    });
    useEffect(() => {
        if (!email) {
            void navigate("/register");
        }
    }, [email, navigate]);

    const onSubmit = async (data: VerifyOtpSchema) => {
        try {
            const res = await authServices.verifyOtp({
                email: email,
                code: data.otp,
            });
            sessionStorage.setItem("registration_token", res.data.registration_token);
            localStorage.removeItem(`otp_resend_${email}`);
            setResponseMessage({ message: "OTP verified successfully", type: "success" });
            void navigate("/create-password");
        } catch (error) {
            if (axios.isAxiosError<IApiVerifyOtpError>(error)) {
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
            {/* OTP field */}
            <InputField
                id="input-otp"
                placeholder="Enter OTP"
                type="text"
                autoComplete="one-time-code"
                error={errors.otp?.message}
                {...register("otp")}
            />

            {/* Submit button */}
            <Button isloading={isSubmitting} variant="primary" type="submit" className="w-full">
                Verify OTP
            </Button>




            {/* Sign up link */}
            <div className="flex items-center justify-center gap-1 py-0.5 w-full">
                <span className="text-text-secondary font-text-medium">Didn't receive the code?</span>
                <ResendOtp email={email} setResponseMessage={setResponseMessage} />
            </div>
        </form>
    );
}

export default VerifyOtpForm;