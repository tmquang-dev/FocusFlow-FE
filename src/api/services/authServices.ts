import axiosClient from "../axiosClient";
import { type loginPayload } from "./authServices.type";

export const authServices = {
    login: (payload: loginPayload) => axiosClient.post("/v1/auth/login", payload),
    logout: () => axiosClient.post("/v1/auth/logout")
}