import axiosClient from "../axiosClient";
import {
    type loginPayload,
    type IRegisterPayload,
    type IVerifyOtpPayload,
    type IResendOtpPayload,
    type ICompleteRegisterPayload,
    type IApiLoginSuccess,
    type IApiRegisterSuccess,
    type IApiVerifyOtpSuccess,
    type IApiResendOtpSuccess,
    type IApiCompleteRegisterSuccess,
} from "./authServices.type";

export const authServices = {
    login: (payload: loginPayload): Promise<IApiLoginSuccess> =>
        axiosClient.post("/v1/auth/login", payload),
    register: (payload: IRegisterPayload): Promise<IApiRegisterSuccess> =>
        axiosClient.post("/v1/auth/register/send-otp", payload),
    verifyOtp: (payload: IVerifyOtpPayload): Promise<IApiVerifyOtpSuccess> =>
        axiosClient.post("/v1/auth/register/verify-otp", payload),
    resendOtp: (payload: IResendOtpPayload): Promise<IApiResendOtpSuccess> =>
        axiosClient.post("/v1/auth/register/resend-otp", payload),
    completeRegister: (payload: ICompleteRegisterPayload, token: string): Promise<IApiCompleteRegisterSuccess> =>
        axiosClient.post("/v1/auth/register/complete", payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    logout: () => axiosClient.post("/v1/auth/logout"),
};