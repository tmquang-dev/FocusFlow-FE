import { useNavigate } from "react-router";
import { cn } from "@/utils/cn";
import Button from "@/components/common/Button";
import { ClockIcon, CrossIcon } from "@/components/common/Icons";
import type { ColumnId } from "../kanban.types";
import { useSortable } from "@dnd-kit/react/sortable";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setActiveTask } from "../kanbanSlice";
import { STATUS_THEMES } from "../kanbanConstants/kanban.constants";
import DeleteTaskTrigger from "../modals/DeleteTaskTrigger";

interface TaskCardProps {
  status: ColumnId;
  task_num: string;
  id: string;
  index?: number;
  title: string;
  desc?: string;
  isOverlay?: boolean;
  isFocus?: boolean;
  className?: string;
}

function TaskCard({
  status,
  id,
  index = 0,
  title,
  desc,
  isOverlay,
  task_num,
  isFocus,
  className,
}: TaskCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeWorkspaceId = useAppSelector(
    (state) => state.workspace.activeWorkspaceId,
  );

  const { ref, isDragging } = useSortable({
    id,
    index,
    group: status,
    data: { id, status, columnId: status, index },
    disabled: isOverlay,
  });

  const theme = STATUS_THEMES[status];

  const handleCardClick = () => {
    if (!isOverlay) {
      dispatch(setActiveTask(id));
    }
  };

  return (
    <article
      ref={ref}
      className={cn(
        "flex flex-col items-start gap-2.5 p-3 relative self-stretch w-full flex-[0_0_auto] rounded-lg overflow-hidden border-solid border-t border-r border-b-2 border-l-4 transition-all cursor-pointer select-none",
        theme.cardClass,
        theme.shadowClass,
        !isFocus && isDragging && "opacity-40 scale-[0.98]",
        !isFocus && isOverlay && "rotate-2 shadow-2xl scale-105",
        className,
      )}
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
        <span
          className={cn(
            "inline-flex items-center justify-center gap-2.5 px-1.5 py-0.5 relative self-stretch flex-[0_0_auto] rounded-[5px]",
            theme.badgeClass,
          )}
        >
          <span
            className={cn(
              "-mt-px font-text-id text-text-on-branch",
              theme.badgeClass,
            )}
          >
            {`#${task_num}`}
          </span>
        </span>
        {!isFocus && (
          <DeleteTaskTrigger task={{ id, title }}>
            <Button
              aria-label="Remove task"
              className="p-2 text-text-on-yellow hover:bg-black/10 rounded"
              leftIcon={<CrossIcon className="relative w-2 h-2" />}
              variant="text"
            />
          </DeleteTaskTrigger>
        )}
      </div>
      <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <h3 className="relative text-text-main w-fit font-text-h3medium line-clamp-2 overflow-hidden text-ellipsis">
            {title}
          </h3>
        </div>
        {desc && (
          <div className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <p className="relative flex-1 mt-px text-text-main font-text-small line-clamp-3">
              {desc}
            </p>
          </div>
        )}
      </div>
      {status === "IN_PROGRESS" && !isFocus && (
        <>
          <div className="relative self-stretch w-full h-px border border-solid border-border" />
          <Button
            className="flex items-center justify-center gap-2.5 px-4 py-2 relative self-stretch w-full flex-[0_0_auto] bg-amber-600 rounded-lg hover:bg-amber-700 active:bg-amber-800 overflow-hidden text-text-on-yellow"
            leftIcon={
              <ClockIcon className="relative w-4 h-4 text-text-on-yellow" />
            }
            onClick={(e) => {
              e.stopPropagation();
              const params = new URLSearchParams();
              if (activeWorkspaceId) params.set("workspace", activeWorkspaceId);
              params.set("id", id);
              void navigate(`/focus-mode?${params.toString()}`);
            }}
          >
            Start Focus
          </Button>
        </>
      )}
    </article>
  );
}

export default TaskCard;
