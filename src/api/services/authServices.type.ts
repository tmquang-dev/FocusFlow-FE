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