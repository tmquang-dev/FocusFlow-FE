export type Status = "backlog" | "todo" | "progress" | "done";

export interface IHeaderColumn {
    status: Status;
    label: string;
    count?: string;
};