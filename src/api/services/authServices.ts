import axiosClient from "../axiosClient";
import {
    type loginPayload,
    type IRegisterPayload,
    type IVerifyOtpPayload,
    type IApiLoginSuccess,
    type IApiRegisterSuccess,
    type IApiVerifyOtpSuccess,
    type IResendOtpPayload,
    type IApiResendOtpSuccess
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
    logout: () => axiosClient.post("/v1/auth/logout"),
};