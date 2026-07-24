import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import { authServices } from "@/api/services/authServices";
import axios from "axios";

import type { IResponseMessage } from "../VerifyOtpForm.type";
import type { IApiVerifyOtpError } from "@/api/services/authServices.type";

const COOLDOWN_TIME_SECONDS = 60;

function ResendOtp({ email, setResponseMessage }: { email: string; setResponseMessage: (message: IResponseMessage | null) => void }) {
    const storageKey = `otp_resend_${email}`;

    // Hàm tính toán số giây còn lại từ localStorage
    const getRemainingSeconds = (): number => {
        const savedAvailableAt = localStorage.getItem(storageKey);
        if (!savedAvailableAt) return COOLDOWN_TIME_SECONDS; // Mặc định khi vừa sang trang verify

        const remainingMs = Number(savedAvailableAt) - Date.now();
        const remainingSeconds = Math.ceil(remainingMs / 1000);
        return remainingSeconds > 0 ? remainingSeconds : 0;
    };

    const [countDown, setCountDown] = useState<number>(getRemainingSeconds);

    // Hàm kích hoạt đếm ngược và lưu timestamp mới
    const startCooldown = () => {
        const availableAt = Date.now() + COOLDOWN_TIME_SECONDS * 1000;
        localStorage.setItem(storageKey, availableAt.toString());
        setCountDown(COOLDOWN_TIME_SECONDS);
    };

    useEffect(() => {
        if (countDown <= 0) {
            localStorage.removeItem(storageKey);
            return;
        }

        const interval = setInterval(() => {
            setCountDown((prev) => {
                if (prev <= 1) {
                    localStorage.removeItem(storageKey);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => { clearInterval(interval); };
    }, [countDown, storageKey]);

    const handlResendOtp = async () => {
        try {
            await authServices.resendOtp({ email });
            setResponseMessage({ message: "OTP resent successfully", type: "success" });
            startCooldown(); // Đặt lại đếm ngược & lưu localStorage mới
            setTimeout(() => {
                setResponseMessage(null);
            }, 2000);
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
        <Button
            variant="text"
            type="button"
            className="w-fit p-0 text-primary-600 hover:text-primary-500 active:text-primary-700"
            onClick={() => { void handlResendOtp(); }}
            disabled={countDown > 0}
        >
            Resend {countDown > 0 ? `(${countDown.toString()})` : ""}
        </Button>
    );
}

export default ResendOtp;
