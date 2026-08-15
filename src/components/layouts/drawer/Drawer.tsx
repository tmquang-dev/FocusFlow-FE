import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router";
import Button from "@/components/common/Button";
import {
  CircleSmallIcon,
  CrossIcon,
  LogoIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from "@/components/common/Icons";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setActiveWorkspaceId } from "@/components/workspace/workspaceSlice";
import {
  fetchWorkspacesThunk,
  deleteWorkspaceThunk,
} from "@/components/workspace/workspaceThunks";
import CreateWorkspaceModal from "@/components/workspace/modals/CreateWorkspaceModal";
import ConfirmDeleteWorkspaceModal from "@/components/workspace/modals/ConfirmDeleteWorkspaceModal";
import InlineWorkspaceRenameInput from "@/components/workspace/rename/InlineWorkspaceRenameInput";
import type { IWorkspace } from "@/api/services/workspaceServices.type";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useAppSelector((state) => state.profile.user);
  const { workspaces, activeWorkspaceId, isLoading } = useAppSelector(
    (state) => state.workspace,
  );

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingWorkspaceId, setEditingWorkspaceId] = useState<string | null>(
    null,
  );
  const [deletingWorkspace, setDeletingWorkspace] = useState<IWorkspace | null>(
    null,
  );

  // 1. Fetch workspaces when authenticated user mounts
  useEffect(() => {
    if (user) {
      void dispatch(fetchWorkspacesThunk());
    }
  }, [user, dispatch]);

  // 2. Sync URL search param ?workspace=id with Redux activeWorkspaceId
  useEffect(() => {
    const urlWorkspaceId = searchParams.get("workspace");
    if (urlWorkspaceId) {
      if (urlWorkspaceId !== activeWorkspaceId) {
        dispatch(setActiveWorkspaceId(urlWorkspaceId));
      }
    } else {
      // Redux -> local storage -> first workspace
      const savedId = localStorage.getItem("focusflow_active_workspace");
      const fallbackId =
        activeWorkspaceId ??
        savedId ??
        (workspaces.length > 0 ? workspaces[0].id : null);
      if (fallbackId) {
        // automatically fill URL param without extra history
        setSearchParams({ workspace: fallbackId }, { replace: true });

        if (activeWorkspaceId !== fallbackId) {
          dispatch(setActiveWorkspaceId(fallbackId));
        }
      }
    }
  }, [searchParams, activeWorkspaceId, workspaces, dispatch, setSearchParams]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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

  const handleSelectWorkspace = (id: string) => {
    setSearchParams({ workspace: id });
  };

  const handleConfirmDeleteWorkspace = async () => {
    if (!deletingWorkspace) return;
    try {
      const actionResult = await dispatch(
        deleteWorkspaceThunk(deletingWorkspace.id),
      );
      if (deleteWorkspaceThunk.fulfilled.match(actionResult)) {
        setDeletingWorkspace(null);
      }
    } catch {
      // Handled in thunk / toast
    }
  };

  return createPortal(
    <>
      <div
        className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop Overlay */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        />

        {/* Drawer Container (Frame) */}
        <aside
          className={`relative z-10 w-60 h-full flex flex-col items-start shrink-0 border-r border-border bg-background-secondary-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-15 p-2.5 justify-between items-center self-stretch border-b border-border">
            <div className="flex items-center gap-1 pointer-events-none">
              <LogoIcon className="text-primary-600" />
              <h1 className="text-text-main font-text-medium">FocusFlow</h1>
            </div>
            <Button
              onClick={onClose}
              variant="text"
              className="text-text-main p-2"
            >
              <CrossIcon />
            </Button>
          </div>

          <nav className="flex w-full p-2.5 flex-col items-start gap-1 flex-1 overflow-y-auto custom-scrollbar">
            <h3 className="text-text-main text-xs font-text-medium py-2 px-4 uppercase tracking-wider">
              Workspaces
            </h3>

            {isLoading && workspaces.length === 0 ? (
              <div className="p-4 text-xs text-text-secondary text-center w-full">
                Loading workspaces...
              </div>
            ) : (
              <ul className="flex flex-col w-full pl-2.5 items-start gap-1">
                {workspaces.map((ws) => {
                  const isActive = ws.id === activeWorkspaceId;
                  const isEditing = ws.id === editingWorkspaceId;

                  return (
                    <li
                      key={ws.id}
                      className="w-full flex items-center justify-between group"
                    >
                      <Button
                        variant="text"
                        leftIcon={
                          <CircleSmallIcon
                            className={
                              isActive
                                ? "text-primary-600"
                                : "text-text-placeholder"
                            }
                          />
                        }
                        className={`flex justify-start px-2.5 w-full py-2 gap-2 text-sm font-medium transition-colors rounded-lg ${
                          isActive
                            ? "bg-primary-100 text-primary-700 font-semibold"
                            : "text-text-main hover:bg-gray-100 active:bg-gray-200"
                        }`}
                        onClick={() => {
                          handleSelectWorkspace(ws.id);
                        }}
                        onDoubleClick={() => {
                          setEditingWorkspaceId(ws.id);
                        }}
                      >
                        {isEditing ? (
                          <InlineWorkspaceRenameInput
                            workspaceId={ws.id}
                            initialName={ws.name}
                            onCancel={() => {
                              setEditingWorkspaceId(null);
                            }}
                            onSuccess={() => {
                              setEditingWorkspaceId(null);
                            }}
                          />
                        ) : (
                          <span className="truncate flex-1 text-left">
                            {ws.name}
                          </span>
                        )}
                        {!isEditing && (
                          <div
                            className={`flex items-center gap-1 opacity-0 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity ${isActive ? "opacity-100" : ""}`}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingWorkspaceId(ws.id);
                              }}
                              className="p-1 text-text-secondary hover:text-primary-600 border-none bg-transparent cursor-pointer shrink-0 rounded hover:bg-black/5"
                              title="Rename workspace"
                            >
                              <PencilIcon className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeletingWorkspace(ws);
                              }}
                              className="p-1 text-text-secondary hover:text-red-600 border-none bg-transparent cursor-pointer shrink-0 rounded hover:bg-black/5"
                              title="Delete workspace"
                            >
                              <TrashIcon className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="pt-3 w-full">
              <Button
                variant="outlined"
                leftIcon={<PlusIcon />}
                className="w-full font-text-medium active:bg-primary-200"
                onClick={() => {
                  setIsCreateModalOpen(true);
                }}
              >
                Create Workspace
              </Button>
            </div>
          </nav>
        </aside>
      </div>

      {/* Modals rendered via React createPortal */}
      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
        }}
      />

      <ConfirmDeleteWorkspaceModal
        isLoading={isLoading}
        isOpen={Boolean(deletingWorkspace)}
        onClose={() => {
          setDeletingWorkspace(null);
        }}
        onConfirm={() => {
          void handleConfirmDeleteWorkspace();
        }}
        workspaceName={deletingWorkspace?.name ?? ""}
      />
    </>,
    document.body,
  );
}
