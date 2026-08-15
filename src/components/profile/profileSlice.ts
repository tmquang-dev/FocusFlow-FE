import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@/api/services/authServices.type";
import {
  fetchProfileThunk,
  updateProfileThunk,
  uploadAvatarThunk,
  unlinkOAuthThunk,
  linkOAuthThunk,
} from "./profileThunks";

interface ProfileState {
  user: IUser | null;
  isInitializing: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  isInitializing: true,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setInitializing: (state, action: PayloadAction<boolean>) => {
      state.isInitializing = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProfileThunk
      .addCase(fetchProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Lỗi khi lấy thông tin hồ sơ";
      })

      // updateProfileThunk
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })

      // uploadAvatarThunk
      .addCase(uploadAvatarThunk.fulfilled, (state, action) => {
        if (state.user) {
          state.user.avatar_url = action.payload;
          state.user.avatar = action.payload;
        }
      })

      // unlinkOAuthThunk
      .addCase(unlinkOAuthThunk.fulfilled, (state, action) => {
        const provider = action.payload;
        if (state.user?.social_links) {
          state.user.social_links[provider] = {
            is_linked: false,
            username: null,
          };
        }
      })

      .addCase(linkOAuthThunk.fulfilled, (state, action) => {
        const provider = action.payload;
        if (state.user) {
          state.user.social_links ??= {
            github: { is_linked: false, username: null },
            google: { is_linked: false, username: null },
          };
          state.user.social_links[provider] = {
            is_linked: true,
            username: state.user.full_name,
          };
        }
      });
  },
});

export const { setInitializing, setUser, updateUser, clearUser } =
  profileSlice.actions;
export default profileSlice.reducer;
