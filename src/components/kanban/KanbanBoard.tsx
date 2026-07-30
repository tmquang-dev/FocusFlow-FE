import { Fragment } from "react";
import KanbanColumn from "./KanbanColumn";
import LineColumn from "./LineColumn";
import type { ColumnId } from "./kanban.types";

function KanbanBoard() {
    const columns: { status: ColumnId; label: string }[] = [
        { status: "backlog", label: "BACKLOG" },
        { status: "todo", label: "TO DO" },
        { status: "in_progress", label: "IN PROGRESS" },
        { status: "done", label: "DONE" },
    ];

    return (
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
    );
}

export default KanbanBoard;
