import { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/common/Button";

interface ConfirmDeleteWorkspaceModalProps {
    isOpen: boolean;
    workspaceName: string;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

function ConfirmDeleteWorkspaceModal({
    isOpen,
    workspaceName,
    onClose,
    onConfirm,
    isLoading = false,
}: ConfirmDeleteWorkspaceModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen && !isLoading) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, isLoading, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
            <div
                className="fixed inset-0"
                onClick={() => {
                    if (!isLoading) onClose();
                }}
            />

            <div className="relative w-full max-w-md bg-background-secondary-0 border border-border rounded-2xl shadow-2xl p-6 flex flex-col gap-5 z-10">
                <div>
                    <h3 className="text-lg font-semibold text-red-600">Delete Workspace</h3>
                    <p className="text-sm text-text-tertiary">This action cannot be undone.</p>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed">
                    Are you sure you want to delete workspace{" "}
                    <span className="font-semibold text-text-main">"{workspaceName}"</span>? All tasks within this workspace will be permanently deleted.
                </p>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        type="button"
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg"
                        isloading={isLoading}
                        onClick={onConfirm}
                        type="button"
                    >
                        Delete Workspace
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default ConfirmDeleteWorkspaceModal;
