import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ColumnId, Task } from "./kanban.types";

export interface KanbanState {
    tasks: Task[];
    activeTaskId: string | null;
}

const initialTasks: Task[] = [
    {
        id: "T-001",
        title: "Implement User Authentication System",
        desc: "Develop and integrate secure user authentication for the web application.",
        columnId: "BACKLOG",
        order: 1,
    },
    {
        id: "T-002",
        title: "Design Kanban UI Layout",
        desc: "Create responsive Kanban board layout with Tailwind CSS.",
        columnId: "TO_DO",
        order: 1,
    },
    {
        id: "T-003",
        title: "Setup Redux Toolkit Store",
        desc: "Configure RTK store and slices for application state management.",
        columnId: "IN_PROGRESS",
        order: 1,
    },
    {
        id: "T-004",
        title: "Initialize React Project with Vite",
        desc: "Project scaffolding completed using Vite, TypeScript, and React 19.",
        columnId: "DONE",
        order: 1,
    },
];

const initialState: KanbanState = {
    tasks: initialTasks,
    activeTaskId: null,
};

let nextIdNumber = 5;

export const kanbanSlice = createSlice({
    name: "kanban",
    initialState,
    reducers: {
        addTask: (
            state,
            action: PayloadAction<{ title: string; desc?: string; columnId?: ColumnId }>
        ) => {
            const newTask: Task = {
                id: `T-${String(nextIdNumber++).padStart(3, "0")}`,
                title: action.payload.title,
                desc: action.payload.desc,
                columnId: action.payload.columnId ?? "BACKLOG",
                order: state.tasks.filter((t) => t.columnId === (action.payload.columnId ?? "BACKLOG")).length + 1,
            };
            state.tasks.push(newTask);
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        setActiveTask: (state, action: PayloadAction<string | null>) => {
            state.activeTaskId = action.payload;
        },
        moveTask: (
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

            // 2. Get all tasks for targetColumnId excluding the current task
            const otherTargetTasks = state.tasks
                .filter((t) => t.columnId === targetColumnId && t.id !== activeId)
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

            // 3. Determine insert position
            let insertIndex = otherTargetTasks.length;
            if (typeof targetIndex === "number" && targetIndex >= 0 && targetIndex <= otherTargetTasks.length) {
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
        updateTask: (
            state,
            action: PayloadAction<{
                id: string;
                title: string;
                desc?: string;
                columnId: ColumnId;
            }>
        ) => {
            const { id, title, desc, columnId } = action.payload;
            const task = state.tasks.find((t) => t.id === id);
            if (!task) return;

            const oldColumnId = task.columnId;
            task.title = title;
            task.desc = desc;

            if (oldColumnId !== columnId) {
                task.columnId = columnId;

                const targetTasks = state.tasks
                    .filter((t) => t.columnId === columnId && t.id !== id)
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                targetTasks.push(task);
                targetTasks.forEach((t, idx) => {
                    t.order = idx + 1;
                });

                const sourceTasks = state.tasks
                    .filter((t) => t.columnId === oldColumnId && t.id !== id)
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                sourceTasks.forEach((t, idx) => {
                    t.order = idx + 1;
                });
            }
        },
    },
});

export const { addTask, deleteTask, setActiveTask, moveTask, updateTask } = kanbanSlice.actions;

export default kanbanSlice.reducer;
