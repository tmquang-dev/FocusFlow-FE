import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch } from "@/app/hooks";
import { updateTaskDetailThunk } from "../../kanbanThunks";
import type { ColumnId, Task } from "../../kanban.types";
import TaskStatusSelect from "./TaskStatusSelect";
import TaskDetailFooter from "./TaskDetailFooter";
import InputField from "@/components/common/InputField";

const taskDetailSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  desc: z.string().optional(),
  status: z.enum(["BACKLOG", "TO_DO", "IN_PROGRESS", "DONE"] as const),
});

export type TaskDetailSchema = z.infer<typeof taskDetailSchema>;

interface TaskDetailFormProps {
  task: Task;
  onClose: () => void;
}

function TaskDetailForm({ task, onClose }: TaskDetailFormProps) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TaskDetailSchema>({
    resolver: zodResolver(taskDetailSchema),
    defaultValues: {
      title: task.title,
      desc: task.desc ?? "",
      status: task.columnId,
    },
    mode: "onChange",
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const currentStatus = watch("status");

  const onSubmit = async (data: TaskDetailSchema) => {
    try {
      const actionResult = await dispatch(
        updateTaskDetailThunk({
          taskId: task.id,
          title: data.title.trim(),
          description: data.desc?.trim() ?? "",
          status: data.status,
        }),
      );
      if (updateTaskDetailThunk.fulfilled.match(actionResult)) {
        onClose();
      }
    } catch {
      // Handled in thunk / toast
    }
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
    >
      <TaskStatusSelect
        onChange={(newStatus: ColumnId) => {
          setValue("status", newStatus, { shouldValidate: true });
        }}
        status={currentStatus}
      />

      {/* Title using reusable InputField */}
      <InputField
        error={errors.title?.message}
        label="Title"
        placeholder="Enter task title..."
        {...register("title")}
      />

      {/* Description */}
      <div className="flex flex-col w-full items-start gap-2.5 relative">
        <label
          className="text-text-secondary text-[12px] font-medium leading-4 uppercase tracking-wide select-none cursor-pointer"
          htmlFor="task-desc"
        >
          Description
        </label>
        <textarea
          className="w-full min-h-28 bg-gray-100 border border-border rounded-lg px-3.5 py-2 text-sm text-text-main leading-5 placeholder:text-text-placeholder outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all duration-200 resize-y"
          id="task-desc"
          placeholder="Enter detailed description..."
          rows={4}
          {...register("desc")}
        />
        {errors.desc?.message && (
          <span className="font-text-small text-red-500 mt-1 select-none">
            {errors.desc.message}
          </span>
        )}
      </div>

      <TaskDetailFooter onCancel={onClose} />
    </form>
  );
}

export default TaskDetailForm;
