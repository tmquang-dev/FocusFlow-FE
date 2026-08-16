export interface ISocialLinkItem {
  is_linked: boolean;
  username: string | null;
}

export interface ISocialLinks {
  github?: ISocialLinkItem;
  google?: ISocialLinkItem;
}

export interface IUser {
  id: string;
  email: string;
  full_name: string;
  avatar?: string | null;
  avatar_url?: string | null;
  social_links?: ISocialLinks;
  is_verified?: boolean;
  auth_provider?: string;
  created_at?: string;
}

export type ILoginUserData = IUser;
export type ICompleteRegisterUserData = IUser;

export interface loginPayload {
  email: string;
  password: string;
}

export interface IGoogleLoginPayload {
  auth_code: string;
}

export interface IApiLoginSuccess {
  status: "success";
  data: {
    user: IUser;
    accessToken?: string;
    refreshToken?: string;
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

export interface ICompleteRegisterPayload {
  password: string;
  confirm_password: string;
}

export interface IApiCompleteRegisterSuccess {
  status: "success";
  data: {
    user: IUser;
  };
}

export interface IApiCompleteRegisterError {
  status: "error";
  code: string;
  message: string;
}

export type IForgotPasswordPayload = Pick<IRegisterPayload, "email">;

export type IApiForgotPasswordSuccess = Omit<IApiRegisterSuccess, "data">;

export type IApiForgotPasswordError = Omit<IApiRegisterError, "data">;

export type IVerifyPasswordOtpPayload = IVerifyOtpPayload;

export interface IApiVerifyPasswordOtpSuccess {
  status: "success";
  data: {
    reset_token: string;
  };
}

export type IApiVerifyPasswordOtpError = IApiVerifyOtpError;

export type IResendPasswordOtpPayload = IResendOtpPayload;

export type IApiResendPasswordOtpSuccess = IApiResendOtpSuccess;

export type IResetPasswordPayload = ICompleteRegisterPayload;

export type IApiResetPasswordSuccess = IApiRegisterSuccess;

export type IApiResetPasswordError = IApiRegisterError;

export interface IApiGetMeSuccess {
  status: "success";
  data: {
    user: IUser;
  };
}

export interface IApiRefreshTokenSuccess {
  status: "success";
  message: string;
}
