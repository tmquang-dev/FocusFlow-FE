import type { IWorkspace } from "@/api/services/workspaceServices.type";

export interface WorkspaceState {
    workspaces: IWorkspace[];
    activeWorkspaceId: string | null;
    isLoading: boolean;
    error: string | null;
}
export interface WorkspaceState {
    workspaces: IWorkspace[];
    activeWorkspaceId: string | null;
    isLoading: boolean;
    error: string | null;
}