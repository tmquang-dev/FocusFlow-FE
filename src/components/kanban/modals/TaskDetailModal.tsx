import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setActiveTask } from "../kanbanSlice";
import { deleteTaskThunk } from "../kanbanThunks";
import TaskDetailHeader from "./components/TaskDetailHeader";
import TaskDetailForm from "./components/TaskDetailForm";
import ConfirmDeleteTaskModal from "./ConfirmDeleteTaskModal";

const SUPPRESS_DELETE_TASK_CONFIRM_KEY = "focusflow_suppress_delete_task_confirm";

function TaskDetailModalContent({ taskId }: { taskId: string }) {
    const dispatch = useAppDispatch();
    const task = useAppSelector((state) =>
        state.kanban.tasks.find((t) => t.id === taskId)
    );
    const isLoading = useAppSelector((state) => state.kanban.isLoading);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !isConfirmModalOpen) {
                dispatch(setActiveTask(null));
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch, isConfirmModalOpen]);

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

    const executeDelete = async (dontShowAgain?: boolean) => {
        if (dontShowAgain) {
            try {
                localStorage.setItem(SUPPRESS_DELETE_TASK_CONFIRM_KEY, "true");
            } catch {
                // Ignore storage error
            }
        }
        try {
            const actionResult = await dispatch(deleteTaskThunk(task.id));
            if (deleteTaskThunk.fulfilled.match(actionResult)) {
                setIsConfirmModalOpen(false);
                handleClose();
            }
        } catch {
            // Handled in thunk / toast
        }
    };

    const handleDeleteClick = () => {
        let isSuppressed = false;
        try {
            if (localStorage.getItem(SUPPRESS_DELETE_TASK_CONFIRM_KEY) === "true") {
                isSuppressed = true;
            }
        } catch {
            // Ignore
        }

        if (isSuppressed) {
            void executeDelete(false);
        } else {
            setIsConfirmModalOpen(true);
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
                <div
                    className="fixed inset-0"
                    onClick={handleClose}
                />

                <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-background-secondary-0 border border-border rounded-2xl shadow-2xl p-6 flex flex-col gap-6 z-10">
                    <TaskDetailHeader
                        onClose={handleClose}
                        onDelete={handleDeleteClick}
                        taskNum={task.task_num}
                    />

                    <TaskDetailForm onClose={handleClose} task={task} />
                </div>
            </div>

            <ConfirmDeleteTaskModal
                isLoading={isLoading}
                isOpen={isConfirmModalOpen}
                onClose={() => { setIsConfirmModalOpen(false); }}
                onConfirm={(dontShowAgain) => { void executeDelete(dontShowAgain); }}
                taskTitle={task.title}
            />
        </>
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
