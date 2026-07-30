import { cn } from "@/utils/cn"
import type { Status } from "../../headerColumn/HeaderColumn.type"
import Button from "@/components/common/Button"
import { ClockIcon, CrossIcon } from "@/components/common/Icons"


function TaskCard({ status, id, title, desc }: { status: Status, id: string, title: string, desc: string }) {
    const cardProps = {
        cardClassName: "",
        badgeClassName: "",
        shadowClassName: ""
    }
    if (status == "backlog") {
        cardProps.cardClassName = "bg-gray-50 border-border-hover hover:bg-gray-100 active:bg-gray-200"
        cardProps.badgeClassName = "bg-gray-900"
        cardProps.shadowClassName = "shadow-gray-shadow"
    } else if (status == "todo") {
        cardProps.cardClassName = "bg-primary-50 border-primary-400 hover:bg-primary-100 active:bg-primary-200"
        cardProps.badgeClassName = "bg-primary-600"
        cardProps.shadowClassName = "shadow-shadow-main"
    } else if (status == "progress") {
        cardProps.cardClassName = "bg-amber-50 border-amber-400 hover:bg-amber-100 active:bg-amber-200"
        cardProps.badgeClassName = "bg-amber-600"
        cardProps.shadowClassName = "shadow-amber-shadow"
    } else {
        cardProps.cardClassName = "line-through decoration-gray-400 bg-green-50 border-green-400 opacity-60 hover:bg-green-100 active:bg-green-200"
        cardProps.badgeClassName = "bg-green-600"
        cardProps.shadowClassName = "shadow-green-shadow"
    }
    return (
        <article
            className={cn(`flex flex-col items-start gap-2.5 p-3 relative self-stretch w-full flex-[0_0_auto] rounded-lg overflow-hidden border-solid border-t border-r border-b-2 border-l-4 transition-colors cursor-pointer`, cardProps.cardClassName, cardProps.shadowClassName)}
            key={"task-1"}
        >
            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                <span
                    className={cn(`inline-flex items-center justify-center gap-2.5 px-1.5 py-0.5 relative self-stretch flex-[0_0_auto] rounded-[5px]`, cardProps.badgeClassName)}
                >
                    <span className={cn("-mt-px font-text-id text-text-on-branch", cardProps.badgeClassName)}>
                        {id}
                    </span>
                </span>
                <Button
                    aria-label={`Remove task`}
                    leftIcon={<CrossIcon className="relative w-2 h-2" />}
                    className="p-2 text-text-on-yellow"
                    variant="text"
                />
            </div>
            <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <h3
                        className={`relative w-fit font-text-h3medium  line-clamp-2 line-clamp-vertical whitespace-nowrap overflow-hidden text-ellipsis`}
                    >
                        {title}
                    </h3>
                </div>
                <div className="flex items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <p
                        className={`relative flex-1 mt-px text-text-main font-text-small line-clamp-3 line-clamp-vertical`}
                    >
                        {desc}
                    </p>
                </div>
            </div>
            {status === "progress" && (
                <>
                    <div className="relative self-stretch w-full h-px border border-solid border-border" />
                    <Button
                        className="flex items-center justify-center gap-2.5 px-4 py-2 relative self-stretch w-full flex-[0_0_auto] bg-amber-600 rounded-lg hover:bg-amber-700 active:bg-amber-800 overflow-hidden"
                        leftIcon={<ClockIcon className="relative w-4 h-4 text-text-on-yellow" />}
                    >
                        Start Focus
                    </Button>
                </>
            )}
        </article>
    )
}

export default TaskCard