import AddNewTask from "@/components/kanban/AddNewTask";
import KanbanBoard from "@/components/kanban/KanbanBoard";

function Home() {
    return (
        <div className="mx-auto w-full flex flex-col max-w-page-content min-h-225 items-start gap-2.5 px-2.5 py-0 relative">
            <AddNewTask />
            <KanbanBoard />
        </div>
    );
}

export default Home;