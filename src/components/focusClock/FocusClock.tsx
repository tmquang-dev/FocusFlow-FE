import Button from "../common/Button"
import { PlayIcon, SettingIcon } from "../common/Icons"
import TaskCard from "../kanban/taskCard/TaskCard"

function FocusClock() {
    return (
        <div className="relative max-w-page-content w-full flex items-center justify-center min-h-170 mx-auto px-2.5 ">
            <div className="w-fit px-40 py-28 mx-auto rounded-[50px] border border-primary-200 flex items-center justify-center">
                <div className="p-6 flex flex-col gap-2.5 mx-auto rounded-[50px] border-2 border-primary-300">
                    <div className="flex h-26.5 justify-center items-center gap-2.5 rounded-[42px] border border-primary-600 p-2.5">
                        {/* Minute */}
                        <div className="font-text-time text-text-main">00</div>
                        {/* Colon */}
                        <div className="font-text-time text-text-main">:</div>
                        {/* Second */}
                        <div className="font-text-time text-text-main">00</div>
                    </div>
                    <div className="flex w-96.5 h-25 p-2.5 items-center gap-5 ">
                        <Button
                            leftIcon={<SettingIcon className="text-text-main" />}
                            variant="outlined"
                            className="flex-[1_0_0]"
                        >
                            Settings

                        </Button>
                        <Button leftIcon={<PlayIcon />} variant="primary" className="flex-[1_0_0]">
                            Start
                        </Button>
                    </div>
                </div>
            </div>
            <TaskCard
                id="1"
                index={0}
                task_num={"1"}
                status="IN_PROGRESS"
                title="Test"
                desc="Desc"
                isFocus
                className="absolute top-0 left-2.5 w-71.25 opacity-50"
            />
        </div>
    )
}

export default FocusClock