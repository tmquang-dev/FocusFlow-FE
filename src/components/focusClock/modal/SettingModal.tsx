import { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/common/Button";
import { CrossIcon } from "@/components/common/Icons";
import ClockSettingForm, {
  type ClockSettingFormProps,
} from "./ClockSettingForm";

export interface SettingModalProps extends ClockSettingFormProps {
  isOpen?: boolean;
}

function SettingModal({ isOpen = true, onClose, onSave }: SettingModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-[calc(100vw-32px)] sm:w-full max-w-85 bg-background-secondary-0 border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-text-h2 text-text-main">Cài đặt</h2>
          <Button
            type="button"
            variant="text"
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-text-main transition-colors"
            aria-label="Close modal"
          >
            <CrossIcon className="w-4 h-4" />
          </Button>
        </div>

        {/* Form Content */}
        <ClockSettingForm onClose={onClose} onSave={onSave} />
      </div>
    </div>,
    document.body,
  );
}

export default SettingModal;
