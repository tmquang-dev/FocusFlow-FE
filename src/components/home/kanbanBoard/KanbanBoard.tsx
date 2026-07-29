import { Fragment } from "react";
import KanbanColum from "./kanbanColumn/KanbanColumn";
import type { Status } from "./kanbanColumn/headerColumn/HeaderColumn.type";
import LineColumn from "./kanbanColumn/lineColumn/LineColumn";

function KanbanBoard() {
    const columns: { status: Status, label: string }[] = [
        { status: "backlog", label: "BACKLOG" },
        { status: "todo", label: "TO DO" },
        { status: "progress", label: "IN PROGRESS" },
        { status: "done", label: "DONE" },
    ];
    return (
        <div className="w-full overflow-x-auto custom-scrollbar">
            <section className="flex items-start min-w-212.5 gap-2.5 relative">
                <LineColumn />
                {columns.map((column) => (
                    <Fragment key={column.status}>
                        <KanbanColum label={column.label} status={column.status} />
                        <LineColumn />
                    </Fragment>
                ))}
            </section>
        </div>
    )
}

export default KanbanBoard;
