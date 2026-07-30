import ColumnHeader from "./ColumnHeader";
import ColumnTasks from "./ColumnTasks";
import type { ColumnId } from "./kanban.types";

interface KanbanColumnProps {
    label: string;
    status: ColumnId;
    count?: string;
}

function KanbanColumn({ label, status, count = "1" }: KanbanColumnProps) {
    return (
        <div className="relative flex flex-col min-w-0 flex-1 items-center gap-4 pb-2.5 pt-0">
            <ColumnHeader label={label} status={status} count={count} />
            <ColumnTasks status={status} />
        </div>
    );
}

export default KanbanColumn;
