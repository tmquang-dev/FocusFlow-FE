import axiosClient from "../axiosClient";
import type {
    IApiProfileSuccess,
    IUpdateProfilePayload,
    IApiUploadAvatarSuccess,
    IUnlinkOAuthPayload,
    IApiUnlinkOAuthSuccess,
    ILinkOAuthPayload,
    IApiLinkOAuthSuccess,
} from "./profileServices.type";

export const profileServices = {
    // API 3.6.1: GET /api/v1/profile
    getProfile: (): Promise<IApiProfileSuccess> =>
        axiosClient.get("/v1/profile"),

    // API 3.6.2: PUT /api/v1/profile
    updateProfile: (payload: IUpdateProfilePayload): Promise<IApiProfileSuccess> =>
        axiosClient.put("/v1/profile", payload),

    // API 3.6.3: POST /api/v1/profile/avatar
    uploadAvatar: (file: File): Promise<IApiUploadAvatarSuccess> => {
        const formData = new FormData();
        formData.append("file", file);
        return axiosClient.post("/v1/profile/avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    // API 3.6.4: POST /api/v1/profile/oauth/unlink
    unlinkOAuth: (payload: IUnlinkOAuthPayload): Promise<IApiUnlinkOAuthSuccess> =>
        axiosClient.post("/v1/profile/oauth/unlink", payload),

    // API 3.6.5: POST /api/v1/profile/oauth/link
    linkOAuth: (payload: ILinkOAuthPayload): Promise<IApiLinkOAuthSuccess> =>
        axiosClient.post("/v1/profile/oauth/link", payload),
};
