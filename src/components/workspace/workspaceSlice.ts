import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IWorkspace } from "@/api/services/workspaceServices.type";
import { getInitialActiveWorkspaceId } from "@/utils/getInitialActiveWorkspaceId";
import type { WorkspaceState } from "./workspace.type";
import {
    fetchWorkspacesThunk,
    createWorkspaceThunk,
    renameWorkspaceThunk,
} from "./workspaceThunks";

const ACTIVE_WORKSPACE_STORAGE_KEY = "focusflow_active_workspace";

const initialState: WorkspaceState = {
    workspaces: [],
    activeWorkspaceId: getInitialActiveWorkspaceId(ACTIVE_WORKSPACE_STORAGE_KEY),
    isLoading: false,
    error: null,
};

const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        setActiveWorkspaceId: (state, action: PayloadAction<string | null>) => {
            state.activeWorkspaceId = action.payload;
            if (action.payload) {
                try {
                    localStorage.setItem(ACTIVE_WORKSPACE_STORAGE_KEY, action.payload);
                } catch {
                    // Ignore storage quota or permission errors
                }
            } else {
                try {
                    localStorage.removeItem(ACTIVE_WORKSPACE_STORAGE_KEY);
                } catch {
                    // Ignore
                }
            }
        },
        clearWorkspaceState: (state) => {
            state.workspaces = [];
            state.activeWorkspaceId = null;
            state.isLoading = false;
            state.error = null;
            try {
                localStorage.removeItem(ACTIVE_WORKSPACE_STORAGE_KEY);
            } catch {
                // Ignore
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Workspaces
            .addCase(fetchWorkspacesThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchWorkspacesThunk.fulfilled, (state, action: PayloadAction<IWorkspace[]>) => {
                state.isLoading = false;
                state.workspaces = action.payload;

                // Auto-select first workspace if activeWorkspaceId is not set or not in fetched list
                if (action.payload.length > 0) {
                    const exists = action.payload.some((w) => w.id === state.activeWorkspaceId);
                    if (!state.activeWorkspaceId || !exists) {
                        const firstId = action.payload[0].id;
                        state.activeWorkspaceId = firstId;
                        try {
                            localStorage.setItem(ACTIVE_WORKSPACE_STORAGE_KEY, firstId);
                        } catch {
                            // Ignore
                        }
                    }
                }
            })
            .addCase(fetchWorkspacesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) ?? "Failed to fetch workspaces";
            })
            // Create Workspace
            .addCase(createWorkspaceThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createWorkspaceThunk.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
                state.isLoading = false;
                state.workspaces.push(action.payload);
                state.activeWorkspaceId = action.payload.id;
                try {
                    localStorage.setItem(ACTIVE_WORKSPACE_STORAGE_KEY, action.payload.id);
                } catch {
                    // Ignore
                }
            })
            .addCase(createWorkspaceThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) ?? "Failed to create workspace";
            })
            // Rename Workspace
            .addCase(renameWorkspaceThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(renameWorkspaceThunk.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
                state.isLoading = false;
                const index = state.workspaces.findIndex((w) => w.id === action.payload.id);
                if (index !== -1) {
                    state.workspaces[index] = action.payload;
                }
            })
            .addCase(renameWorkspaceThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) ?? "Failed to rename workspace";
            });
    },
});

export const { setActiveWorkspaceId, clearWorkspaceState } = workspaceSlice.actions;

export default workspaceSlice.reducer;
