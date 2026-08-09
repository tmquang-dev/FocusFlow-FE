import { useEffect } from "react";
import AddNewTask from "@/components/kanban/addNewTask/AddNewTask";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchTasksThunk } from "@/components/kanban/kanbanThunks";

function Home() {
    const dispatch = useAppDispatch();
    const activeWorkspaceId = useAppSelector((state) => state.workspace.activeWorkspaceId);

    useEffect(() => {
        if (activeWorkspaceId) {
            void dispatch(fetchTasksThunk(activeWorkspaceId));
        }
    }, [activeWorkspaceId, dispatch]);

    return (
        <div className="mx-auto w-full flex flex-col max-w-page-content min-h-225 items-start gap-2.5 px-2.5 py-0 relative">
            <AddNewTask />
            <KanbanBoard />
        </div>
    );
}

export default Home;