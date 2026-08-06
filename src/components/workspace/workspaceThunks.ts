import { createAsyncThunk } from "@reduxjs/toolkit";
import { workspaceServices } from "@/api/services/workspaceServices";

const getErrorMessage = (error: unknown, fallback: string): string => {
    const err = error as { response?: { data?: { message?: string } }; message?: string };
    return err.response?.data?.message ?? err.message ?? fallback;
};

export const fetchWorkspacesThunk = createAsyncThunk(
    "workspace/fetchWorkspaces",
    async (_, { rejectWithValue }) => {
        try {
            const response = await workspaceServices.getWorkspaces();
            return response.data.workspaces;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to fetch workspaces"));
        }
    }
);

export const createWorkspaceThunk = createAsyncThunk(
    "workspace/createWorkspace",
    async (name: string, { rejectWithValue }) => {
        try {
            const response = await workspaceServices.createWorkspace({ name });
            return response.data.workspace;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to create workspace"));
        }
    }
);

export const renameWorkspaceThunk = createAsyncThunk(
    "workspace/renameWorkspace",
    async ({ workspaceId, name }: { workspaceId: string; name: string }, { rejectWithValue }) => {
        try {
            const response = await workspaceServices.renameWorkspace(workspaceId, { name });
            return response.data.workspace;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to rename workspace"));
        }
    }
);
