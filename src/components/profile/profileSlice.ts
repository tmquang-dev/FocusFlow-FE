import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ILoginUserData } from "@/api/services/authServices.type";

interface ProfileState {
    user: ILoginUserData | null;
}

const initialState: ProfileState = {
    user: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<ILoginUserData>) => {
            state.user = action.payload;
        },
        updateUser: (state, action: PayloadAction<Partial<ILoginUserData>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, updateUser, clearUser } = profileSlice.actions;
export default profileSlice.reducer;
