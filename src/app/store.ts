import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "@/components/profile/profileSlice";
import kanbanReducer from "@/components/kanban/kanbanSlice";

const rootReducer = combineReducers({
    profile: profileReducer,
    kanban: kanbanReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
