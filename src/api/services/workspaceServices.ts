import axiosClient from "../axiosClient";
import type {
    ICreateWorkspacePayload,
    IRenameWorkspacePayload,
    IApiGetWorkspacesSuccess,
    IApiCreateWorkspaceSuccess,
    IApiRenameWorkspaceSuccess,
} from "./workspaceServices.type";

export const workspaceServices = {
    getWorkspaces: (): Promise<IApiGetWorkspacesSuccess> =>
        axiosClient.get("/v1/workspaces"),

    createWorkspace: (payload: ICreateWorkspacePayload): Promise<IApiCreateWorkspaceSuccess> =>
        axiosClient.post("/v1/workspaces", payload),

    renameWorkspace: (workspaceId: string, payload: IRenameWorkspacePayload): Promise<IApiRenameWorkspaceSuccess> =>
        axiosClient.patch(`/v1/workspaces/${workspaceId}`, payload),
};
