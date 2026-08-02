import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { deleteTask, setActiveTask, updateTask } from "../kanbanSlice";
import type { ColumnId } from "../kanban.types";
import TaskDetailHeader from "./components/TaskDetailHeader";
import TaskStatusSelect from "./components/TaskStatusSelect";
import TaskDetailFooter from "./components/TaskDetailFooter";

function TaskDetailModalContent({ taskId }: { taskId: string }) {
    const dispatch = useAppDispatch();
    const task = useAppSelector((state) =>
        state.kanban.tasks.find((t) => t.id === taskId)
    );

    const [title, setTitle] = useState(task?.title ?? "");
    const [desc, setDesc] = useState(task?.desc ?? "");
    const [status, setStatus] = useState<ColumnId>(task?.columnId ?? "backlog");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                dispatch(setActiveTask(null));
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch]);

    if (!task) return null;

    const handleClose = () => {
        dispatch(setActiveTask(null));
    };

    const handleSave = (e: React.SubmitEvent<HTMLFormElement>) => {
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
        handleClose();
    };

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
        handleClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div
                className="fixed inset-0"
                onClick={handleClose}
            />

            <div className="relative w-full max-w-xl bg-background-secondary-0 border border-border rounded-2xl shadow-2xl p-6 flex flex-col gap-6 z-10 overflow-hidden">
                <TaskDetailHeader
                    onClose={handleClose}
                    onDelete={handleDelete}
                    taskId={task.id}
                />

                <form className="flex flex-col gap-5" onSubmit={handleSave}>
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

                    <TaskDetailFooter onCancel={handleClose} />
                </form>
            </div>
        </div>
    );
}

function TaskDetailModal() {
    const activeTaskId = useAppSelector((state) => state.kanban.activeTaskId);

    if (!activeTaskId) return null;

    return createPortal(
        <TaskDetailModalContent key={activeTaskId} taskId={activeTaskId} />,
        document.body
    );
}

export default TaskDetailModal;
