import axiosClient from "../axiosClient";
import { type loginPayload, type IApiLoginSuccess } from "./authServices.type";

export const authServices = {
    login: (payload: loginPayload): Promise<IApiLoginSuccess> => 
        axiosClient.post("/v1/auth/login", payload),
    logout: () => axiosClient.post("/v1/auth/logout")
}