import axiosClient from "../axiosClient";
import type {
    IQuickAddTaskPayload,
    IMoveTaskPayload,
    IUpdateTaskDetailPayload,
    IApiGetTasksSuccess,
    IApiTaskSuccess,
} from "./kanbanServices.type";

export const kanbanServices = {
    getTasksByWorkspace: (workspaceId: string): Promise<IApiGetTasksSuccess> =>
        axiosClient.get(`/v1/workspaces/${workspaceId}/tasks`),

    quickAddTask: (workspaceId: string, payload: IQuickAddTaskPayload): Promise<IApiTaskSuccess> =>
        axiosClient.post(`/v1/workspaces/${workspaceId}/tasks`, payload),

    moveTask: (taskId: string, payload: IMoveTaskPayload): Promise<IApiTaskSuccess> =>
        axiosClient.patch(`/v1/tasks/${taskId}/move`, payload),

    updateTaskDetail: (taskId: string, payload: IUpdateTaskDetailPayload): Promise<IApiTaskSuccess> =>
        axiosClient.patch(`/v1/tasks/${taskId}`, payload),
};
