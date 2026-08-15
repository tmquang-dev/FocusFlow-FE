import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/common/Button";
import type { ConfirmDeleteTaskModalProps } from "./ConfirmDeleteTaskModal.type";

function ConfirmDeleteTaskModal({
  isOpen,
  taskTitle,
  onClose,
  onConfirm,
  isLoading = false,
}: ConfirmDeleteTaskModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

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

  const handleConfirm = () => {
    onConfirm(dontShowAgain);
    setDontShowAgain(false);
  };

  const handleClose = () => {
    if (!isLoading) {
      setDontShowAgain(false);
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="fixed inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-md bg-background-secondary-0 border border-border rounded-2xl shadow-2xl p-6 flex flex-col gap-5 z-10">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-lg font-semibold text-red-600">Delete Task</h3>
            <p className="text-sm text-text-tertiary">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed">
          Are you sure you want to delete task{" "}
          <span className="font-semibold text-text-main">"{taskTitle}"</span>?
        </p>

        <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer select-none">
          <input
            checked={dontShowAgain}
            className="w-4 h-4 text-primary-600 rounded border-border focus:ring-primary-500 cursor-pointer"
            onChange={(e) => {
              setDontShowAgain(e.target.checked);
            }}
            type="checkbox"
          />
          <span>Don't ask me again</span>
        </label>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
          <Button
            disabled={isLoading}
            onClick={handleClose}
            type="button"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg"
            isloading={isLoading}
            onClick={handleConfirm}
            type="button"
          >
            Delete Task
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ConfirmDeleteTaskModal;
