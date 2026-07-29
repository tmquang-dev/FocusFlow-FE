
import { cn } from "@/utils/cn";
import { type IHeaderColumn } from "./HeaderColumn.type";

function HeaderColumn({ status, label, count }: IHeaderColumn) {
    let headerClassName = "";
    if (status === "backlog") {
        headerClassName = "bg-gray-100 border-gray-900 border-solid border-t border-r border-b-2 border-l-2";
    } else if (status === "todo") {
        headerClassName = "bg-primary-100 border-primary-700 border-solid border-t border-r border-b-2 border-l-2";
    } else if (status === "progress") {
        headerClassName = "bg-amber-100 border-amber-900 border-solid border-t border-r border-b-2 border-l-2";
    } else if (status === "done") {
        headerClassName = "bg-green-100 border-green-900 border-solid border-t border-r border-b-2 border-l-2";
    }
    let countClassName = "";
    if (status === "backlog") {
        countClassName = "text-gray-900";
    } else if (status === "todo") {
        countClassName = "text-primary-600";
    } else if (status === "progress") {
        countClassName = "text-amber-600";
    } else if (status === "done") {
        countClassName = "text-green-600";
    }
    return (
        <header
            className={cn("flex items-start gap-1 p-3 relative self-stretch w-full flex-[0_0_auto] rounded-lg overflow-hidden", headerClassName)}
        >
            <h2
                className="relative w-fit -mt-0.5 font-text-h2"
                id={`${status}-heading`}
            >
                {label}
            </h2>
            <span
                className={cn("relative w-fit -mt-0.5 font-text-h2", countClassName)}
            >
                ({count ? count : 0})
            </span>
        </header>
    )
}

export default HeaderColumn