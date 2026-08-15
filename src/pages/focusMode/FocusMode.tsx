import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setActiveWorkspaceId } from "@/components/workspace/workspaceSlice";
import { fetchTasksThunk } from "@/components/kanban/kanbanThunks";
import FocusClock from "@/components/focusClock/FocusClock";

function FocusMode() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const activeWorkspaceId = useAppSelector(
    (state) => state.workspace.activeWorkspaceId,
  );

  const workspaceParam = searchParams.get("workspace");

  // Auto-enable Dark Mode when entering Focus Mode & restore theme on exit
  useEffect(() => {
    const root = document.documentElement;
    const previousWasDark = root.classList.contains("dark");

    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");

    return () => {
      if (!previousWasDark) {
        root.classList.remove("dark");
        root.removeAttribute("data-theme");
      }
    };
  }, []);

  useEffect(() => {
    if (workspaceParam && workspaceParam !== activeWorkspaceId) {
      dispatch(setActiveWorkspaceId(workspaceParam));
    }
  }, [workspaceParam, activeWorkspaceId, dispatch]);

  useEffect(() => {
    const currentWsId = workspaceParam ?? activeWorkspaceId;
    if (currentWsId) {
      void dispatch(fetchTasksThunk(currentWsId));
    }
  }, [workspaceParam, activeWorkspaceId, dispatch]);

  return <FocusClock />;
}

export default FocusMode;
