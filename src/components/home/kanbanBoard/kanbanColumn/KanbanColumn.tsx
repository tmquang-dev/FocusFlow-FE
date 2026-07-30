import ColumnTasks from "./columnTasks/ColumnTasks";
import HeaderColumn from "./headerColumn/HeaderColumn"
import type { Status } from "./headerColumn/HeaderColumn.type";
function KanbanColum({ label, status }: { label: string, status: Status }) {
    return (
        <div className="relative flex flex-col min-w-0 flex-1 items-center gap-4 pb-2.5 pt-0">
            <HeaderColumn label={label} status={status} count="3" />
            <ColumnTasks />
        </div>
    )
}

export default KanbanColum