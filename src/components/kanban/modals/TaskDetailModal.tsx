import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { deleteTask, setActiveTask } from "../kanbanSlice";
import TaskDetailHeader from "./components/TaskDetailHeader";
import TaskDetailForm from "./components/TaskDetailForm";

function TaskDetailModalContent({ taskId }: { taskId: string }) {
    const dispatch = useAppDispatch();
    const task = useAppSelector((state) =>
        state.kanban.tasks.find((t) => t.id === taskId)
    );

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

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    if (!task) return null;

    const handleClose = () => {
        dispatch(setActiveTask(null));
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

            <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-background-secondary-0 border border-border rounded-2xl shadow-2xl p-6 flex flex-col gap-6 z-10">
                <TaskDetailHeader
                    onClose={handleClose}
                    onDelete={handleDelete}
                    taskId={task.id}
                />

                <TaskDetailForm onClose={handleClose} task={task} />
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
