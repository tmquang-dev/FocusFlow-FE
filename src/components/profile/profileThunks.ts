import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { profileServices } from "@/api/services/profileServices";
import type {
    IUpdateProfilePayload,
    IUnlinkOAuthPayload,
    ILinkOAuthPayload,
    IApiProfileError,
} from "@/api/services/profileServices.type";
import type { IUser } from "@/api/services/authServices.type";

export const fetchProfileThunk = createAsyncThunk<
    IUser,
    undefined,
    { rejectValue: IApiProfileError }
>("profile/fetchProfile", async (_, { rejectWithValue }) => {
    try {
        const response = await profileServices.getProfile();
        return response.data.user;
    } catch (error) {
        if (axios.isAxiosError<IApiProfileError>(error) && error.response?.data) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({
            status: "error",
            code: "UNKNOWN_ERROR",
            message: "Không thể lấy thông tin profile",
        });
    }
});

export const updateProfileThunk = createAsyncThunk<
    IUser,
    IUpdateProfilePayload,
    { rejectValue: IApiProfileError }
>("profile/updateProfile", async (payload, { rejectWithValue }) => {
    try {
        const response = await profileServices.updateProfile(payload);
        return response.data.user;
    } catch (error) {
        if (axios.isAxiosError<IApiProfileError>(error) && error.response?.data) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({
            status: "error",
            code: "UPDATE_FAILED",
            message: "Cập nhật hồ sơ thất bại",
        });
    }
});

export const uploadAvatarThunk = createAsyncThunk<
    string,
    File,
    { rejectValue: IApiProfileError }
>("profile/uploadAvatar", async (file, { rejectWithValue }) => {
    try {
        const response = await profileServices.uploadAvatar(file);
        return response.data.avatar_url;
    } catch (error) {
        if (axios.isAxiosError<IApiProfileError>(error) && error.response?.data) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({
            status: "error",
            code: "UPLOAD_FAILED",
            message: "Tải ảnh đại diện lên thất bại",
        });
    }
});

export const unlinkOAuthThunk = createAsyncThunk<
    "github" | "google",
    IUnlinkOAuthPayload,
    { rejectValue: IApiProfileError }
>("profile/unlinkOAuth", async (payload, { rejectWithValue }) => {
    try {
        await profileServices.unlinkOAuth(payload);
        return payload.provider;
    } catch (error) {
        if (axios.isAxiosError<IApiProfileError>(error) && error.response?.data) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({
            status: "error",
            code: "UNLINK_FAILED",
            message: "Hủy liên kết tài khoản thất bại",
        });
    }
});

export const linkOAuthThunk = createAsyncThunk<
    "github" | "google",
    ILinkOAuthPayload,
    { rejectValue: IApiProfileError }
>("profile/linkOAuth", async (payload, { rejectWithValue }) => {
    try {
        await profileServices.linkOAuth(payload);
        return payload.provider;
    } catch (error) {
        if (axios.isAxiosError<IApiProfileError>(error) && error.response?.data) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({
            status: "error",
            code: "LINK_FAILED",
            message: "Liên kết tài khoản thất bại",
        });
    }
});
