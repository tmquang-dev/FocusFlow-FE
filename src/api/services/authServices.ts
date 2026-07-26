import axiosClient from "../axiosClient";
import {
    type loginPayload,
    type IRegisterPayload,
    type IVerifyOtpPayload,
    type IResendOtpPayload,
    type ICompleteRegisterPayload,
    type IForgotPasswordPayload,
    type IVerifyPasswordOtpPayload,
    type IResendPasswordOtpPayload,
    type IResetPasswordPayload,
    type IApiLoginSuccess,
    type IApiRegisterSuccess,
    type IApiVerifyOtpSuccess,
    type IApiResendOtpSuccess,
    type IApiCompleteRegisterSuccess,
    type IApiForgotPasswordSuccess,
    type IApiVerifyPasswordOtpSuccess,
    type IApiResendPasswordOtpSuccess,
    type IApiResetPasswordSuccess,
    type IApiRefreshTokenSuccess,
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
    forgotPassword: (payload: IForgotPasswordPayload): Promise<IApiForgotPasswordSuccess> =>
        axiosClient.post("/v1/auth/password/forgot", payload),
    resendPasswordOtp: (payload: IResendPasswordOtpPayload): Promise<IApiResendPasswordOtpSuccess> =>
        axiosClient.post("/v1/auth/password/resend-otp", payload),
    verifyPasswordOtp: (payload: IVerifyPasswordOtpPayload): Promise<IApiVerifyPasswordOtpSuccess> =>
        axiosClient.post("/v1/auth/password/verify-otp", payload),
    resetPassword: (payload: IResetPasswordPayload, token: string): Promise<IApiResetPasswordSuccess> =>
        axiosClient.post("/v1/auth/password/reset", payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    refreshToken: (): Promise<IApiRefreshTokenSuccess> =>
        axiosClient.post("/v1/auth/refresh-token"),
    logout: () => axiosClient.post("/v1/auth/logout"),
};