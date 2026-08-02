import type { ColumnId } from "../kanban.types";

export interface ColumnConfig {
    status: ColumnId;
    label: string;
}

export const KANBAN_COLUMNS: ColumnConfig[] = [
    { status: "backlog", label: "BACKLOG" },
    { status: "todo", label: "TO DO" },
    { status: "in_progress", label: "IN PROGRESS" },
    { status: "done", label: "DONE" },
];

export interface StatusTheme {
    label: string;
    headerClass: string;
    countClass: string;
    cardClass: string;
    badgeClass: string;
    shadowClass: string;
    modalBadgeClass: string;
    modalActiveClass: string;
}

export const STATUS_THEMES: Record<ColumnId, StatusTheme> = {
    backlog: {
        label: "BACKLOG",
        headerClass: "bg-gray-100 border-gray-900 border-solid border-t border-r border-b-2 border-l-2",
        countClass: "text-gray-900",
        cardClass: "bg-gray-50 border-border-hover hover:bg-gray-100 active:bg-gray-200",
        badgeClass: "bg-gray-900 text-white",
        shadowClass: "shadow-gray-shadow",
        modalBadgeClass: "bg-gray-100 text-gray-800 border-gray-300",
        modalActiveClass: "ring-2 ring-gray-600 bg-gray-200 text-gray-900",
    },
    todo: {
        label: "TO DO",
        headerClass: "bg-primary-100 border-primary-700 border-solid border-t border-r border-b-2 border-l-2",
        countClass: "text-primary-600",
        cardClass: "bg-primary-50 border-primary-400 hover:bg-primary-100 active:bg-primary-200",
        badgeClass: "bg-primary-600 text-white",
        shadowClass: "shadow-shadow-main",
        modalBadgeClass: "bg-primary-100 text-primary-700 border-primary-300",
        modalActiveClass: "ring-2 ring-primary-600 bg-primary-200 text-primary-900",
    },
    in_progress: {
        label: "IN PROGRESS",
        headerClass: "bg-amber-100 border-amber-900 border-solid border-t border-r border-b-2 border-l-2",
        countClass: "text-amber-600",
        cardClass: "bg-amber-50 border-amber-400 hover:bg-amber-100 active:bg-amber-200",
        badgeClass: "bg-amber-600 text-white",
        shadowClass: "shadow-amber-shadow",
        modalBadgeClass: "bg-amber-100 text-amber-800 border-amber-300",
        modalActiveClass: "ring-2 ring-amber-600 bg-amber-200 text-amber-900",
    },
    done: {
        label: "DONE",
        headerClass: "bg-green-100 border-green-900 border-solid border-t border-r border-b-2 border-l-2",
        countClass: "text-green-600",
        cardClass: "line-through decoration-gray-400 bg-green-50 border-green-400 opacity-60 hover:bg-green-100 active:bg-green-200",
        badgeClass: "bg-green-600 text-white",
        shadowClass: "shadow-green-shadow",
        modalBadgeClass: "bg-green-100 text-green-800 border-green-300",
        modalActiveClass: "ring-2 ring-green-600 bg-green-200 text-green-900",
    },
};
