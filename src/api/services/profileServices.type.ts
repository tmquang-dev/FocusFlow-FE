import type { IUser } from "./authServices.type";

export interface IApiProfileSuccess {
    status: "success";
    data: {
        user: IUser;
    };
}

export interface IUpdateProfilePayload {
    full_name?: string;
    avatar_url?: string | null;
}

export interface IApiUploadAvatarSuccess {
    status: "success";
    data: {
        avatar_url: string;
    };
}

export interface IUnlinkOAuthPayload {
    provider: "github" | "google";
}

export interface IApiUnlinkOAuthSuccess {
    status: "success";
    message: string;
}

export interface ILinkOAuthPayload {
    provider: "github" | "google";
    auth_code: string;
}

export interface IApiLinkOAuthSuccess {
    status: "success";
    message: string;
}

export interface IApiProfileError {
    status: "error";
    code: string;
    message: string;
}
