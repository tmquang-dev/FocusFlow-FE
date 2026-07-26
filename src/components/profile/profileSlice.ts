import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@/api/services/authServices.type";

interface ProfileState {
    user: IUser | null;
    isInitializing: boolean;
}

const initialState: ProfileState = {
    user: null,
    isInitializing: true,
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
});

export const { setInitializing, setUser, updateUser, clearUser } = profileSlice.actions;
export default profileSlice.reducer;
