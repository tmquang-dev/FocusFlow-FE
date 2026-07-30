import TaskCard from "./TaskCard";
import type { ColumnId } from "./kanban.types";

interface ColumnTasksProps {
    status: ColumnId;
}

function ColumnTasks({ status }: ColumnTasksProps) {
    return (
        <ul className="flex flex-col items-start gap-2.5 w-full relative">
            <TaskCard
                status={status}
                id="T-001"
                title="Implement User Authentication System"
                desc="Develop and integrate secure user authentication for the web application."
            />
        </ul>
    );
}

export default ColumnTasks;
