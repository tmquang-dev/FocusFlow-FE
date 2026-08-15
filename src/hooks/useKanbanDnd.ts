import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { moveTaskOptimistic } from "../components/kanban/kanbanSlice";
import { moveTaskThunk } from "../components/kanban/kanbanThunks";
import type { ColumnId, DndEvent, Task } from "../components/kanban/kanban.types";
import { KANBAN_COLUMNS } from "../components/kanban/kanbanConstants/kanban.constants";

export function useKanbanDnd() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.kanban.tasks);
    const [activeId, setActiveId] = useState<string | null>(null);
    const initialTasksSnapshotRef = useRef<Task[]>([]);

    const activeTask = tasks.find((t) => t.id === activeId);

    const handleDragStart = (event: DndEvent) => {
        const sourceId = event.operation?.source?.id ?? event.source?.id;
        if (sourceId) {
            initialTasksSnapshotRef.current = [...tasks];
            setActiveId(String(sourceId));
        }
    };

    const handleDragOver = (event: DndEvent) => {
        const operation = event.operation ?? event;
        const sourceId = operation.source?.id;
        const target = operation.target;

        if (!sourceId || !target || String(sourceId) === String(target.id)) return;

        const sourceTask = tasks.find((t) => t.id === String(sourceId));
        if (!sourceTask) return;

        const targetColumnId: ColumnId | undefined =
            target.data?.status ??
            target.data?.columnId ??
            (KANBAN_COLUMNS.some((c) => c.status === target.id) ? (target.id as ColumnId) : undefined);

        if (!targetColumnId) return;

        // ONLY move task optimistically during dragOver if changing columns!
        // Moving within the same column during dragOver causes infinite DOM reordering jitter.
        if (sourceTask.columnId !== targetColumnId) {
            const targetIndex: number | undefined =
                typeof target.data?.index === "number" ? target.data.index : undefined;

            dispatch(
                moveTaskOptimistic({
                    activeId: String(sourceId),
                    targetColumnId,
                    targetIndex,
                })
            );
        }
    };

    const handleDragEnd = (event: DndEvent) => {
        setActiveId(null);
        const operation = event.operation ?? event;
        const sourceId = operation.source?.id;
        const target = operation.target;

        if (!sourceId || !target) return;

        const taskId = String(sourceId);
        const previousTasksSnapshot = initialTasksSnapshotRef.current;

        const targetColumnId: ColumnId | undefined =
            target.data?.status ??
            target.data?.columnId ??
            (KANBAN_COLUMNS.some((c) => c.status === target.id) ? (target.id as ColumnId) : undefined);

        const targetIndex: number | undefined =
            typeof target.data?.index === "number" ? target.data.index : undefined;

        if (targetColumnId) {
            dispatch(
                moveTaskOptimistic({
                    activeId: taskId,
                    targetColumnId,
                    targetIndex,
                })
            );

            // Find moved task from current tasks state to get new order
            const movedTask = tasks.find((t) => t.id === taskId);
            const newOrder = movedTask?.order ?? 1;

            void dispatch(
                moveTaskThunk({
                    taskId,
                    status: targetColumnId,
                    order: newOrder,
                    previousTasksSnapshot,
                })
            );
        }
    };

    return {
        activeTask,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    };
}
