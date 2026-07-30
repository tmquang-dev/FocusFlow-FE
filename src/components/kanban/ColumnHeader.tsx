import { cn } from "@/utils/cn";
import type { ColumnHeaderProps, ColumnId } from "./kanban.types";

function ColumnHeader({ status, label, count }: ColumnHeaderProps) {
    const getHeaderProps = (colStatus: ColumnId) => {
        switch (colStatus) {
            case "backlog":
                return {
                    headerClassName: "bg-gray-100 border-gray-900 border-solid border-t border-r border-b-2 border-l-2",
                    countClassName: "text-gray-900",
                };
            case "todo":
                return {
                    headerClassName: "bg-primary-100 border-primary-700 border-solid border-t border-r border-b-2 border-l-2",
                    countClassName: "text-primary-600",
                };
            case "in_progress":
                return {
                    headerClassName: "bg-amber-100 border-amber-900 border-solid border-t border-r border-b-2 border-l-2",
                    countClassName: "text-amber-600",
                };
            case "done":
                return {
                    headerClassName: "bg-green-100 border-green-900 border-solid border-t border-r border-b-2 border-l-2",
                    countClassName: "text-green-600",
                };
        }
    };

    const headerProps = getHeaderProps(status);

    return (
        <header
            className={cn(
                "flex items-start gap-1 p-3 relative self-stretch w-full flex-[0_0_auto] rounded-lg overflow-hidden",
                headerProps.headerClassName
            )}
        >
            <h2
                className="relative w-fit -mt-0.5 font-text-h2"
                id={`${status}-heading`}
            >
                {label}
            </h2>
            <span
                className={cn("relative w-fit -mt-0.5 font-text-h2", headerProps.countClassName)}
            >
                ({count ?? 0})
            </span>
        </header>
    );
}

export default ColumnHeader;
