import { cn } from "@/utils/cn";
import type { ColumnHeaderProps } from "../kanban.types";
import { STATUS_THEMES } from "../kanbanConstants/kanban.constants";

function ColumnHeader({ status, label, count }: ColumnHeaderProps) {
  const theme = STATUS_THEMES[status];

  return (
    <header
      className={cn(
        "flex items-start gap-1 p-3 relative self-stretch w-full flex-[0_0_auto] rounded-lg overflow-hidden",
        theme.headerClass,
      )}
    >
      <h2
        className="relative w-fit -mt-0.5 font-text-h2"
        id={`${status}-heading`}
      >
        {label}
      </h2>
      <span
        className={cn("relative w-fit -mt-0.5 font-text-h2", theme.countClass)}
      >
        ({count ?? 0})
      </span>
    </header>
  );
}

export default ColumnHeader;
