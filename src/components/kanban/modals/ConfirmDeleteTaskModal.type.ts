export interface ConfirmDeleteTaskModalProps {
    isOpen: boolean;
    taskTitle: string;
    onClose: () => void;
    onConfirm: (dontShowAgain: boolean) => void;
    isLoading?: boolean;
}
