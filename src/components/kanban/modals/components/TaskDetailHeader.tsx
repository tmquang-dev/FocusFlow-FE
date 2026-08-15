import Button from "@/components/common/Button";
import { CrossIcon } from "@/components/common/Icons";
import DeleteTaskTrigger from "../DeleteTaskTrigger";

interface TaskDetailHeaderProps {
  task: { id: string; title: string; task_num: string };
  onClose: () => void;
}

function TaskDetailHeader({ task, onClose }: TaskDetailHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-4">
      <div className="flex items-center gap-3">
        <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-900 text-white">
          {`#${task.task_num}`}
        </span>
        <h2 className="text-xl font-bold text-text-main">Task Details</h2>
      </div>
      <div className="flex items-center gap-2">
        <DeleteTaskTrigger task={{ id: task.id, title: task.title }}>
          <Button
            className="text-red-500 hover:bg-red-50 hover:text-red-700 px-3 py-1.5 text-xs font-medium rounded-lg"
            variant="text"
          >
            Delete
          </Button>
        </DeleteTaskTrigger>
        <Button
          aria-label="Close modal"
          className="p-2 text-text-main hover:bg-gray-100 rounded-full"
          leftIcon={<CrossIcon className="w-4 h-4" />}
          onClick={onClose}
          variant="text"
        />
      </div>
    </div>
  );
}

export default TaskDetailHeader;
