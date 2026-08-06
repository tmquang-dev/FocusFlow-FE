import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createWorkspaceThunk } from "../workspaceThunks";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { CrossIcon } from "@/components/common/Icons";
import { createWorkspaceSchema, type CreateWorkspaceSchema } from "./CreateWorkspaceModal.schema";
import type { CreateWorkspaceModalProps } from "./CreateWorkspaceModal.type";

export default function CreateWorkspaceModal({ isOpen, onClose }: CreateWorkspaceModalProps) {
    const dispatch = useAppDispatch();
    const [, setSearchParams] = useSearchParams();
    const isLoading = useAppSelector((state) => state.workspace.isLoading);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateWorkspaceSchema>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: "",
        },
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "";
            reset();
        }

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data: CreateWorkspaceSchema) => {
        try {
            const resultAction = await dispatch(createWorkspaceThunk(data.name));
            if (createWorkspaceThunk.fulfilled.match(resultAction)) {
                setSearchParams({ workspace: resultAction.payload.id });
                reset();
                onClose();
            }
        } catch {
            // Error handled in slice
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black/50 transition-opacity duration-200"
            />

            {/* Modal Container */}
            <div className="relative z-10 w-full max-w-md bg-background-main border border-border rounded-xl shadow-2xl overflow-hidden p-6 flex flex-col gap-5">
                <div className="flex justify-between items-center pb-2 border-b border-border">
                    <h2 className="text-text-main font-semibold text-lg">Create New Workspace</h2>
                    <Button onClick={onClose} variant="text" className="text-text-secondary p-1">
                        <CrossIcon />
                    </Button>
                </div>

                <form onSubmit={(e) => { void handleSubmit(onSubmit)(e); }} className="flex flex-col gap-4">
                    <InputField
                        label="Workspace Name"
                        id="workspace-name"
                        placeholder="e.g. FocusFlow Redesign"
                        error={errors.name?.message}
                        {...register("name")}
                    />

                    <div className="flex justify-end gap-2.5 pt-2">
                        <Button type="button" variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" isloading={isLoading}>
                            Create Workspace
                        </Button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
