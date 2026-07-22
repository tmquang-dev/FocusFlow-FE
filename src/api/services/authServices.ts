import axiosClient from "../axiosClient";
import { type loginPayload, type IRegisterPayload, type IApiLoginSuccess, type IApiRegisterSuccess } from "./authServices.type";

export const authServices = {
    login: (payload: loginPayload): Promise<IApiLoginSuccess> =>
        axiosClient.post("/v1/auth/login", payload),
    register: (payload: IRegisterPayload): Promise<IApiRegisterSuccess> =>
        axiosClient.post("/v1/auth/register/send-otp", payload),
    logout: () => axiosClient.post("/v1/auth/logout")
}