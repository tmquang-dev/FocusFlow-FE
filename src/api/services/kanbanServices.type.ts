import type { ColumnId } from "@/components/kanban/kanban.types";

export interface IBackendTask {
    id: string;
    task_num: number;
    title: string;
    description?: string;
    status: ColumnId;
    order: number;
    created_at: string;
    updated_at?: string;
}

export interface IQuickAddTaskPayload {
    title: string;
}

export interface IMoveTaskPayload {
    status: ColumnId;
    order: number;
}

export interface IUpdateTaskDetailPayload {
    title?: string;
    description?: string;
    status?: ColumnId;
}

export interface IApiGetTasksSuccess {
    status: "success";
    data: {
        tasks: IBackendTask[];
    };
}

export interface IApiTaskSuccess {
    status: "success";
    data: {
        task: IBackendTask;
    };
}
