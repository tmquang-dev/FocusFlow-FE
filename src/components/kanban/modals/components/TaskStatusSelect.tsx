import type { ColumnId } from "../../kanban.types";
import {
  KANBAN_COLUMNS,
  STATUS_THEMES,
} from "../../kanbanConstants/kanban.constants";
import { cn } from "@/utils/cn";

interface TaskStatusSelectProps {
  status: ColumnId;
  onChange: (status: ColumnId) => void;
}

function TaskStatusSelect({ status, onChange }: TaskStatusSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold uppercase tracking-wider text-text-placeholder">
        Status
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {KANBAN_COLUMNS.map((col) => {
          const theme = STATUS_THEMES[col.status];
          const isActive = status === col.status;
          return (
            <button
              key={col.status}
              className={cn(
                "flex items-center justify-center py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer",
                theme.modalBadgeClass,
                isActive && theme.modalActiveClass,
              )}
              onClick={() => {
                onChange(col.status);
              }}
              type="button"
            >
              {col.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TaskStatusSelect;
