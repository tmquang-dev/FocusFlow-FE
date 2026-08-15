import axiosClient from "../axiosClient";
import type { IApiGetMeSuccess } from "./authServices.type";

export const userServices = {
  getMe: (): Promise<IApiGetMeSuccess> => axiosClient.get("/v1/users/me"),
};
