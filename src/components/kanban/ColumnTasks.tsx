import TaskCard from "./TaskCard";
import type { ColumnId } from "./kanban.types";
import { useAppSelector } from "@/app/hooks";
import { useDroppable } from "@dnd-kit/react";
import { cn } from "@/utils/cn";

interface ColumnTasksProps {
    status: ColumnId;
}

function ColumnTasks({ status }: ColumnTasksProps) {
    const tasks = useAppSelector((state) =>
        state.kanban.tasks
            .filter((task) => task.columnId === status)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    );

    const { ref, isDropTarget } = useDroppable({
        id: status,
        data: { columnId: status, status },
    });

    return (
        <ul
            ref={ref}
            className={cn(
                "flex flex-col items-start gap-2.5 w-full min-h-60 relative rounded-lg transition-colors p-1",
                isDropTarget && "bg-black/5 ring-2 ring-primary-400"
            )}
        >
            {tasks.map((task, idx) => (
                <TaskCard
                    key={task.id}
                    desc={task.desc}
                    id={task.id}
                    index={idx}
                    status={task.columnId}
                    title={task.title}
                />
            ))}
            {tasks.length === 0 && (
                <li className="w-full py-8 text-center text-text-placeholder font-text-small border-2 border-dashed border-border rounded-lg">
                    No tasks in {status.replace("_", " ")}
                </li>
            )}
        </ul>
    );
}

export default ColumnTasks;
