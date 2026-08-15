export interface IWorkspace {
  id: string;
  name: string;
  created_at: string;
  updated_at?: string;
}

export interface ICreateWorkspacePayload {
  name: string;
}

export interface IRenameWorkspacePayload {
  name: string;
}

export interface IApiGetWorkspacesSuccess {
  status: "success";
  data: {
    workspaces: IWorkspace[];
  };
}

export interface IApiCreateWorkspaceSuccess {
  status: "success";
  data: {
    workspace: IWorkspace;
  };
}

export interface IApiRenameWorkspaceSuccess {
  status: "success";
  data: {
    workspace: IWorkspace;
  };
}

export interface IApiDeleteWorkspaceSuccess {
  status: "success";
  message: string;
}
