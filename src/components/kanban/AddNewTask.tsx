import { useState } from "react";
import Button from "@/components/common/Button";
import { AddTaskIcon } from "@/components/common/Icons";
import { useAppDispatch } from "@/app/hooks";
import { addTask } from "./kanbanSlice";

function AddNewTask() {
    const [taskTitle, setTaskTitle] = useState("");
    const dispatch = useAppDispatch();

    const handleAddTask = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!taskTitle.trim()) return;
        dispatch(addTask({ title: taskTitle.trim() }));
        setTaskTitle("");
    };

    return (
        <form
            className="relative flex items-center self-stretch w-full flex-[0_0_auto] bg-background-secondary-0 rounded-xl overflow-hidden border border-border"
            onSubmit={handleAddTask}
        >
            <Button
                aria-label="Add task to Backlog"
                variant="text"
                type="submit"
                className="flex w-8 items-center justify-center gap-2.5 p-1 rounded-full absolute left-1.5 overflow-hidden text-primary-600 hover:text-primary-700 hover:bg-primary-50 active:bg-primary-100 z-1"
                leftIcon={<AddTaskIcon className="relative w-6 h-6" />}
            />
            <label className="sr-only" htmlFor="new-task">
                Add a new task to Backlog
            </label>
            <input
                className="relative min-w-0 flex-1 pl-12 pr-3 py-3.5 font-text-default text-text-main placeholder:text-text-placeholder outline-none"
                id="new-task"
                onChange={(event) => setTaskTitle(event.target.value)}
                placeholder="Add a new task to Backlog..."
                type="text"
                value={taskTitle}
            />
        </form>
    );
}

export default AddNewTask;
