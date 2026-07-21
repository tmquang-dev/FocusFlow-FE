// export interface ILoginUser {
//     id: string;
//     email: string;
//     full_name: string;
// }

// export interface ILoginSuccessData {
//     access_token: string;
//     user: ILoginUser;
// }

// export interface ILoginSuccessResponse {
//     status: "success";
//     data: ILoginSuccessData;
// }

// export interface ILoginErrorResponse {
//     status: "error";
//     code: string;
//     message: string;
// }

export interface IResponseLogin {
    message: string;
    type: "success" | "warning" | "error";
}
