import ColumnHeader from "./ColumnHeader";
import ColumnTasks from "./ColumnTasks";
import type { ColumnId } from "../kanban.types";
import { useAppSelector } from "@/app/hooks";

interface KanbanColumnProps {
  label: string;
  status: ColumnId;
}

function KanbanColumn({ label, status }: KanbanColumnProps) {
  const count = useAppSelector(
    (state) =>
      state.kanban.tasks.filter((task) => task.columnId === status).length,
  );

  return (
    <div className="relative flex flex-col min-w-0 flex-1 items-center gap-4 pb-2.5 pt-0">
      <ColumnHeader count={count.toString()} label={label} status={status} />
      <ColumnTasks status={status} />
    </div>
  );
}

export default KanbanColumn;
