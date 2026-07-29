import TaskCard from "./taskCard/TaskCard"

function ColumnTasks() {
    return (
        <ul className="flex flex-col items-start gap-2.5 w-full relative">
            <TaskCard status="todo" id="T-001" title="Implement User Authentication System" desc="Develop and integrate secure user authentication for the web application." />
            <TaskCard status="progress" id="T-001" title="Implement User Authentication System" desc="Develop and integrate secure user authentication for the web application." />
            <TaskCard status="done" id="T-001" title="Implement User Authentication System" desc="Develop and integrate secure user authentication for the web application." />
            <TaskCard status="backlog" id="T-001" title="Implement User Authentication System" desc="Develop and integrate secure user authentication for the web application." />
        </ul>
    )
}

export default ColumnTasks