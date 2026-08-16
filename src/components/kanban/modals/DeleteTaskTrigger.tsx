import React from "react";
import { useAppDispatch } from "@/app/hooks";
import { setDeletingTask } from "../kanbanSlice";
import { deleteTaskThunk } from "../kanbanThunks";

const SUPPRESS_DELETE_TASK_CONFIRM_KEY =
  "focusflow_suppress_delete_task_confirm";

interface DeleteTaskTriggerProps {
  task: { id: string; title: string };
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
}

export function DeleteTaskTrigger({ task, children }: DeleteTaskTriggerProps) {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    children.props.onClick?.(e);

    let isSuppressed = false;
    try {
      if (localStorage.getItem(SUPPRESS_DELETE_TASK_CONFIRM_KEY) === "true") {
        isSuppressed = true;
      }
    } catch {
      // Ignore
    }

    if (isSuppressed) {
      void dispatch(deleteTaskThunk(task.id));
    } else {
      dispatch(setDeletingTask(task));
    }
  };

  return React.cloneElement(children, {
    onClick: handleClick,
  });
}

export default DeleteTaskTrigger;
