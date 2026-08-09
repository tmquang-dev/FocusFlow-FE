import { createAsyncThunk } from "@reduxjs/toolkit";
import { kanbanServices } from "@/api/services/kanbanServices";
import type { ColumnId, Task } from "./kanban.types";

const getErrorMessage = (error: unknown, fallback: string): string => {
    const err = error as { response?: { data?: { message?: string } }; message?: string };
    return err.response?.data?.message ?? err.message ?? fallback;
};

export const fetchTasksThunk = createAsyncThunk(
    "kanban/fetchTasks",
    async (workspaceId: string, { rejectWithValue }) => {
        try {
            const response = await kanbanServices.getTasksByWorkspace(workspaceId);
            return response.data.tasks;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to fetch tasks"));
        }
    }
);

export const quickAddTaskThunk = createAsyncThunk(
    "kanban/quickAddTask",
    async (
        { workspaceId, title }: { workspaceId: string; title: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await kanbanServices.quickAddTask(workspaceId, { title });
            return response.data.task;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to create task"));
        }
    }
);

export const moveTaskThunk = createAsyncThunk(
    "kanban/moveTask",
    async (
        {
            taskId,
            status,
            order,
            previousTasksSnapshot,
        }: {
            taskId: string;
            status: ColumnId;
            order: number;
            previousTasksSnapshot: Task[];
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await kanbanServices.moveTask(taskId, { status, order });
            return {
                task: response.data.task,
                previousTasksSnapshot,
            };
        } catch (error) {
            return rejectWithValue({
                message: getErrorMessage(error, "Failed to move task"),
                previousTasksSnapshot,
            });
        }
    }
);

export const updateTaskDetailThunk = createAsyncThunk(
    "kanban/updateTaskDetail",
    async (
        {
            taskId,
            title,
            description,
            status,
        }: {
            taskId: string;
            title?: string;
            description?: string;
            status?: ColumnId;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await kanbanServices.updateTaskDetail(taskId, {
                title,
                description,
                status,
            });
            return response.data.task;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to update task details"));
        }
    }
);

export const deleteTaskThunk = createAsyncThunk(
    "kanban/deleteTask",
    async (taskId: string, { rejectWithValue }) => {
        try {
            await kanbanServices.deleteTask(taskId);
            return taskId;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to delete task"));
        }
    }
);
