import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import type { ColumnId, KanbanState, Task } from "./kanban.types";
import type { IBackendTask } from "@/api/services/kanbanServices.type";
import {
    fetchTasksThunk,
    quickAddTaskThunk,
    moveTaskThunk,
    updateTaskDetailThunk,
    deleteTaskThunk,
} from "./kanbanThunks";



const mapBackendTaskToTask = (bt: IBackendTask): Task => ({
    id: bt.id,
    task_num: bt.task_num,
    title: bt.title,
    desc: bt.description,
    columnId: bt.status,
    order: bt.order,
});

const initialState: KanbanState = {
    tasks: [],
    activeTaskId: null,
    deletingTask: null,
    isLoading: false,
    error: null,
};

export const kanbanSlice = createSlice({
    name: "kanban",
    initialState,
    reducers: {
        setActiveTask: (state, action: PayloadAction<string | null>) => {
            state.activeTaskId = action.payload;
        },
        setDeletingTask: (
            state,
            action: PayloadAction<{ id: string; title: string } | null>
        ) => {
            state.deletingTask = action.payload;
        },
        moveTaskOptimistic: (
            state,
            action: PayloadAction<{
                activeId: string;
                targetColumnId: ColumnId;
                targetIndex?: number;
            }>
        ) => {
            const { activeId, targetColumnId, targetIndex } = action.payload;

            const task = state.tasks.find((t) => t.id === activeId);
            if (!task) return;

            const sourceColumnId = task.columnId;

            // 1. Update task's columnId
            task.columnId = targetColumnId;

            // 2. Get all tasks for targetColumnId excluding current task
            const otherTargetTasks = state.tasks
                .filter((t) => t.columnId === targetColumnId && t.id !== activeId)
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

            // 3. Determine insert position
            let insertIndex = otherTargetTasks.length;
            if (
                typeof targetIndex === "number" &&
                targetIndex >= 0 &&
                targetIndex <= otherTargetTasks.length
            ) {
                insertIndex = targetIndex;
            }

            // 4. Insert task into target column list at insertIndex
            otherTargetTasks.splice(insertIndex, 0, task);

            // 5. Reassign order (1, 2, 3...) for all tasks in target column
            otherTargetTasks.forEach((t, idx) => {
                t.order = idx + 1;
            });

            // 6. Reassign order (1, 2, 3...) for all tasks in source column if moved across columns
            if (sourceColumnId !== targetColumnId) {
                const sourceTasks = state.tasks
                    .filter((t) => t.columnId === sourceColumnId && t.id !== activeId)
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                sourceTasks.forEach((t, idx) => {
                    t.order = idx + 1;
                });
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        clearKanbanState: (state) => {
            state.tasks = [];
            state.activeTaskId = null;
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Tasks
            .addCase(fetchTasksThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTasksThunk.fulfilled, (state, action: PayloadAction<IBackendTask[]>) => {
                state.isLoading = false;
                state.tasks = action.payload.map(mapBackendTaskToTask);
            })
            .addCase(fetchTasksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string | undefined) ?? "Failed to fetch tasks";
            })
            // Quick Add Task
            .addCase(quickAddTaskThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(quickAddTaskThunk.fulfilled, (state, action: PayloadAction<IBackendTask>) => {
                state.isLoading = false;
                state.tasks.push(mapBackendTaskToTask(action.payload));
                toast.success("Task created successfully!");
            })
            .addCase(quickAddTaskThunk.rejected, (state, action) => {
                state.isLoading = false;
                const errorMsg = (action.payload as string | undefined) ?? "Failed to create task";
                state.error = errorMsg;
                toast.error(errorMsg);
            })
            // Move Task (Rollback on rejection)
            .addCase(moveTaskThunk.fulfilled, (state, action) => {
                const updatedTask = mapBackendTaskToTask(action.payload.task);
                const index = state.tasks.findIndex((t) => t.id === updatedTask.id);
                if (index !== -1) {
                    state.tasks[index] = updatedTask;
                }
            })
            .addCase(moveTaskThunk.rejected, (state, action) => {
                const payload = action.payload as { message: string; previousTasksSnapshot: Task[] } | undefined;
                if (payload?.previousTasksSnapshot) {
                    state.tasks = payload.previousTasksSnapshot;
                }
                const errorMsg = payload?.message ?? "Failed to move task. Position restored.";
                state.error = errorMsg;
                toast.error(errorMsg);
            })
            // Update Task Detail
            .addCase(updateTaskDetailThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateTaskDetailThunk.fulfilled, (state, action: PayloadAction<IBackendTask>) => {
                state.isLoading = false;
                const updatedTask = mapBackendTaskToTask(action.payload);
                const index = state.tasks.findIndex((t) => t.id === updatedTask.id);
                if (index !== -1) {
                    state.tasks[index] = updatedTask;
                }
                toast.success("Task details updated successfully!");
            })
            .addCase(updateTaskDetailThunk.rejected, (state, action) => {
                state.isLoading = false;
                const errorMsg = (action.payload as string | undefined) ?? "Failed to update task";
                state.error = errorMsg;
                toast.error(errorMsg);
            })
            // Delete Task
            .addCase(deleteTaskThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteTaskThunk.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.deletingTask = null;
                state.tasks = state.tasks.filter((t) => t.id !== action.payload);
                if (state.activeTaskId === action.payload) {
                    state.activeTaskId = null;
                }
                toast.success("Task deleted successfully.");
            })
            .addCase(deleteTaskThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.deletingTask = null;
                const errorMsg = (action.payload as string | undefined) ?? "Failed to delete task";
                state.error = errorMsg;
                toast.error(errorMsg);
            });
    },
});

export const { setActiveTask, setDeletingTask, moveTaskOptimistic, deleteTask, clearKanbanState } = kanbanSlice.actions;

export default kanbanSlice.reducer;
