import { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { renameWorkspaceThunk } from "../workspaceThunks";
import type { InlineWorkspaceRenameInputProps } from "./InlineWorkspaceRenameInput.type";

export default function InlineWorkspaceRenameInput({
  workspaceId,
  initialName,
  onCancel,
  onSuccess,
}: InlineWorkspaceRenameInputProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(initialName);
  const inputRef = useRef<HTMLInputElement>(null);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const handleSave = async () => {
    if (isSubmittingRef.current) return;

    const trimmedName = name.trim();
    if (!trimmedName || trimmedName === initialName) {
      onCancel();
      return;
    }

    try {
      isSubmittingRef.current = true;
      const actionResult = await dispatch(
        renameWorkspaceThunk({ workspaceId, name: trimmedName }),
      );
      if (renameWorkspaceThunk.fulfilled.match(actionResult)) {
        onSuccess?.();
      } else {
        onCancel();
      }
    } catch {
      onCancel();
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      e.preventDefault();
      void handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={name}
      onChange={(e) => {
        setName(e.target.value);
      }}
      onBlur={() => {
        void handleSave();
      }}
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
      className="w-full h-5 py-0 text-sm font-medium text-text-main outline-none flex-1 min-w-0"
    />
  );
}
