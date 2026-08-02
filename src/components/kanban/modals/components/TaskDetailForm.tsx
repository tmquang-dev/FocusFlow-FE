import { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { updateTask } from "../../kanbanSlice";
import type { ColumnId, Task } from "../../kanban.types";
import TaskStatusSelect from "./TaskStatusSelect";
import TaskDetailFooter from "./TaskDetailFooter";

interface TaskDetailFormProps {
    task: Task;
    onClose: () => void;
}

function TaskDetailForm({ task, onClose }: TaskDetailFormProps) {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState(task.title);
    const [desc, setDesc] = useState(task.desc ?? "");
    const [status, setStatus] = useState<ColumnId>(task.columnId);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim()) return;

        dispatch(
            updateTask({
                id: task.id,
                title: title.trim(),
                desc: desc.trim(),
                columnId: status,
            })
        );
        onClose();
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <TaskStatusSelect onChange={setStatus} status={status} />

            {/* Title */}
            <div className="flex flex-col gap-2">
                <label
                    className="text-xs font-bold uppercase tracking-wider text-text-placeholder"
                    htmlFor="task-title"
                >
                    Title
                </label>
                <input
                    className="w-full px-4 py-2.5 bg-background-main border border-border rounded-lg text-text-main font-text-h3medium focus:outline-none focus:ring-2 focus:ring-primary-500"
                    id="task-title"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    placeholder="Enter task title..."
                    type="text"
                    value={title}
                />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
                <label
                    className="text-xs font-bold uppercase tracking-wider text-text-placeholder"
                    htmlFor="task-desc"
                >
                    Description
                </label>
                <textarea
                    className="w-full min-h-28 px-4 py-2.5 bg-background-main border border-border rounded-lg text-text-main font-text-default focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y"
                    id="task-desc"
                    onChange={(e) => {
                        setDesc(e.target.value);
                    }}
                    placeholder="Enter detailed description..."
                    rows={4}
                    value={desc}
                />
            </div>

            <TaskDetailFooter onCancel={onClose} />
        </form>
    );
}

export default TaskDetailForm;
