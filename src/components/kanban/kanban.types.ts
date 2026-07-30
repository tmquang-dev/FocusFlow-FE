export type ColumnId = "backlog" | "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  desc?: string;
  columnId: ColumnId;
  order?: number;
}

export interface ColumnHeaderProps {
  status: ColumnId;
  label: string;
  count?: string;
}
