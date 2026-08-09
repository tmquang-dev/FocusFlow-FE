export type ColumnId = "BACKLOG" | "TO_DO" | "IN_PROGRESS" | "DONE";

export interface Task {
    id: string;
    task_num: string;
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

export interface DndTargetData {
    status?: ColumnId;
    columnId?: ColumnId;
    index?: number;
}

export interface DndTarget {
    id?: string | number;
    data?: DndTargetData;
}

export interface DndSource {
    id?: string | number;
}

export interface DndOperation {
    source?: DndSource | null;
    target?: DndTarget | null;
}

export interface DndEvent {
    operation?: DndOperation | null;
    source?: DndSource | null;
    target?: DndTarget | null;
}
