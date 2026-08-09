import { Fragment } from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import KanbanColumn from "./kanbanColumn/KanbanColumn";
import LineColumn from "./kanbanColumn/LineColumn";
import TaskCard from "./taskCard/TaskCard";
import TaskDetailModal from "./modals/TaskDetailModal";
import GlobalConfirmDeleteModal from "./modals/GlobalConfirmDeleteModal";
import { KANBAN_COLUMNS } from "./kanbanConstants/kanban.constants";
import { useKanbanDnd } from "../../hooks/useKanbanDnd";

function KanbanBoard() {
    const { activeTask, handleDragStart, handleDragOver, handleDragEnd } = useKanbanDnd();

    return (
        <DragDropProvider
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
        >
            <div className="w-full overflow-x-auto custom-scrollbar">
                <section className="flex items-start min-w-212.5 gap-2.5 relative">
                    <LineColumn />
                    {KANBAN_COLUMNS.map((column) => (
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
                        task_num={activeTask.task_num}
                        title={activeTask.title}
                    />
                ) : null}
            </DragOverlay>
            <TaskDetailModal />
            <GlobalConfirmDeleteModal />
        </DragDropProvider>
    );
}

export default KanbanBoard;
