export interface loginPayload {
    email: string;
    password: string;
}

export interface ILoginUserData {
    id: string;
    email: string;
    full_name: string;
}

export interface IApiLoginSuccess {
    status: "success";
    data: {
        access_token: string;
        user: ILoginUserData;
    };
}

export interface IApiLoginError {
    status: "error";
    code: string;
    message: string;
}

export interface IRegisterPayload {
    email: string;
}

export interface IApiRegisterSuccess {
    status: "success";
    message: string;
}

export interface IApiRegisterError {
    status: "error";
    code: string;
    message: string;
}

export interface IVerifyOtpPayload {
    email: string;
    code: string;
}

export interface IApiVerifyOtpSuccess {
    status: "success";
    data: {
        registration_token: string;
    };
}

export interface IApiVerifyOtpError {
    status: "error";
    code: string;
    message: string;
}

export type IResendOtpPayload = Pick<IVerifyOtpPayload, "email">;

export type IApiResendOtpSuccess = Omit<IApiRegisterSuccess, "data">;

export type IApiResendOtpError = Omit<IApiRegisterError, "data">;