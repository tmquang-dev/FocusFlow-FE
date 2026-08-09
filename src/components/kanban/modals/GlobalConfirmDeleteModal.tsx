import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setDeletingTask } from "../kanbanSlice";
import { deleteTaskThunk } from "../kanbanThunks";
import ConfirmDeleteTaskModal from "./ConfirmDeleteTaskModal";

const SUPPRESS_DELETE_TASK_CONFIRM_KEY = "focusflow_suppress_delete_task_confirm";

export function GlobalConfirmDeleteModal() {
    const dispatch = useAppDispatch();
    const deletingTask = useAppSelector((state) => state.kanban.deletingTask);
    const isLoading = useAppSelector((state) => state.kanban.isLoading);

    if (!deletingTask) return null;

    const handleConfirm = (dontShowAgain: boolean) => {
        if (dontShowAgain) {
            try {
                localStorage.setItem(SUPPRESS_DELETE_TASK_CONFIRM_KEY, "true");
            } catch {
                // Ignore storage error
            }
        }
        void dispatch(deleteTaskThunk(deletingTask.id));
    };

    const handleClose = () => {
        dispatch(setDeletingTask(null));
    };

    return (
        <ConfirmDeleteTaskModal
            isLoading={isLoading}
            isOpen={Boolean(deletingTask)}
            onClose={handleClose}
            onConfirm={handleConfirm}
            taskTitle={deletingTask.title}
        />
    );
}

export default GlobalConfirmDeleteModal;
