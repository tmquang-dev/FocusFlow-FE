import { Fragment, useState } from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import KanbanColumn from "./KanbanColumn";
import LineColumn from "./LineColumn";
import TaskCard from "./TaskCard";
import type { ColumnId } from "./kanban.types";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { moveTask } from "./kanbanSlice";

function KanbanBoard() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.kanban.tasks);
    const [activeId, setActiveId] = useState<string | null>(null);

    const activeTask = tasks.find((t) => t.id === activeId);

    const columns: { status: ColumnId; label: string }[] = [
        { status: "backlog", label: "BACKLOG" },
        { status: "todo", label: "TO DO" },
        { status: "in_progress", label: "IN PROGRESS" },
        { status: "done", label: "DONE" },
    ];

    const handleDragStart = (event: any) => {
        const sourceId = event?.operation?.source?.id || event?.source?.id;
        if (sourceId) {
            setActiveId(String(sourceId));
        }
    };

    const handleDragOver = (event: any) => {
        const operation = event?.operation || event;
        const sourceId = operation?.source?.id;
        const target = operation?.target;

        if (!sourceId || !target || sourceId === target.id) return;

        const targetColumnId: ColumnId | undefined =
            target.data?.status ||
            target.data?.columnId ||
            (columns.some((c) => c.status === target.id) ? (target.id as ColumnId) : undefined);

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

    const handleDragEnd = (event: any) => {
        setActiveId(null);
        const operation = event?.operation || event;
        const sourceId = operation?.source?.id;
        const target = operation?.target;

        if (!sourceId || !target) return;

        const targetColumnId: ColumnId | undefined =
            target.data?.status ||
            target.data?.columnId ||
            (columns.some((c) => c.status === target.id) ? (target.id as ColumnId) : undefined);

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

    return (
        <DragDropProvider
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
        >
            <div className="w-full overflow-x-auto custom-scrollbar">
                <section className="flex items-start min-w-212.5 gap-2.5 relative">
                    <LineColumn />
                    {columns.map((column) => (
                        <Fragment key={column.status}>
                            <KanbanColumn label={column.label} status={column.status} />
                            <LineColumn />
                        </Fragment>
                    ))}
                </section>
            </div>
            <DragOverlay>
                {activeTask ? (
                    <TaskCard
                        desc={activeTask.desc}
                        id={activeTask.id}
                        isOverlay
                        status={activeTask.columnId}
                        title={activeTask.title}
                    />
                ) : null}
            </DragOverlay>
        </DragDropProvider>
    );
}

export default KanbanBoard;
