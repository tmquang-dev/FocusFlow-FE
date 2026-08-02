import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { moveTask } from "../components/kanban/kanbanSlice";
import type { ColumnId, DndEvent } from "../components/kanban/kanban.types";
import { KANBAN_COLUMNS } from "../components/kanban/kanbanConstants/kanban.constants";

export function useKanbanDnd() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.kanban.tasks);
    const [activeId, setActiveId] = useState<string | null>(null);

    const activeTask = tasks.find((t) => t.id === activeId);

    const handleDragStart = (event: DndEvent) => {
        const sourceId = event.operation?.source?.id ?? event.source?.id;
        if (sourceId) {
            setActiveId(String(sourceId));
        }
    };

    const handleDragOver = (event: DndEvent) => {
        const operation = event.operation ?? event;
        const sourceId = operation.source?.id;
        const target = operation.target;

        if (!sourceId || !target || sourceId === target.id) return;

        const targetColumnId: ColumnId | undefined =
            target.data?.status ??
            target.data?.columnId ??
            (KANBAN_COLUMNS.some((c) => c.status === target.id) ? (target.id as ColumnId) : undefined);

        if (!targetColumnId) return;

        const targetIndex: number | undefined =
            typeof target.data?.index === "number" ? target.data.index : undefined;

        dispatch(
            moveTask({
                activeId: String(sourceId),
                targetColumnId,
                targetIndex,
            })
        );
    };

    const handleDragEnd = (event: DndEvent) => {
        setActiveId(null);
        const operation = event.operation ?? event;
        const sourceId = operation.source?.id;
        const target = operation.target;

        if (!sourceId || !target) return;

        const targetColumnId: ColumnId | undefined =
            target.data?.status ??
            target.data?.columnId ??
            (KANBAN_COLUMNS.some((c) => c.status === target.id) ? (target.id as ColumnId) : undefined);

        const targetIndex: number | undefined =
            typeof target.data?.index === "number" ? target.data.index : undefined;

        if (targetColumnId) {
            dispatch(
                moveTask({
                    activeId: String(sourceId),
                    targetColumnId,
                    targetIndex,
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
