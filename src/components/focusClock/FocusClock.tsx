import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { useAppSelector } from "@/app/hooks";
import Button from "../common/Button";
import { PauseIcon, PlayIcon, SettingIcon } from "../common/Icons";
import TaskCard from "../kanban/taskCard/TaskCard";
import SettingModal from "./modal/SettingModal";

function FocusClock() {
    const [searchParams] = useSearchParams();
    const tasks = useAppSelector((state) => state.kanban.tasks);

    const taskIdParam = searchParams.get("id") ?? searchParams.get("taskId");

    // Dynamic target task from URL search params or fallback
    const focusedTask =
        tasks.find((t) => t.id === taskIdParam) ??
        tasks.find((t) => t.columnId === "IN_PROGRESS") ??
        (tasks.length > 0 ? tasks[0] : null);

    // Pomodoro Timer States
    const [focusTime, setFocusTime] = useState<number>(1500); // 25 min default
    const [breakTime, setBreakTime] = useState<number>(300);   // 5 min default
    const [timeLeft, setTimeLeft] = useState<number>(1500);
    const [isStarting, setIsStarting] = useState<boolean>(false);
    const [mode, setMode] = useState<"focus" | "break">("focus");
    const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);

    // Timer countdown interval
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (isStarting) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        if (mode === "focus") {
                            setMode("break");
                            toast.info("🎯 Focus session completed! Break session started.");
                            return breakTime;
                        } else {
                            setMode("focus");
                            toast.info("☕ Break session completed! Focus session started.");
                            return focusTime;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isStarting, mode, focusTime, breakTime]);

    const handleStarting = () => {
        setIsStarting(true);
    };

    const handlePause = () => {
        setIsStarting(false);
    };

    const handleStop = () => {
        setIsStarting(false);
        setTimeLeft(mode === "focus" ? focusTime : breakTime);
    };

    const handleSaveSettings = (settings: { focusTime: number; breakTime: number }) => {
        setFocusTime(settings.focusTime);
        setBreakTime(settings.breakTime);
        setTimeLeft(settings.focusTime);
        setMode("focus");
        setIsStarting(false);
    };

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");

    return (
        <div className="relative max-w-page-content w-full flex flex-col items-center lg:flex-row lg:items-center lg:justify-start min-h-screen  lg:min-h-[calc(100vh-140px)] mx-auto px-4 sm:px-6 lg:px-2.5 py-2 sm:py-6 lg:py-0 gap-4 sm:gap-6 lg:gap-0">
            <SettingModal
                isOpen={isSettingOpen}
                onClose={() => {
                    setIsSettingOpen(false);
                }}
                onSave={handleSaveSettings}
            />

            {/* Task Card (stacked on mobile/tablet, absolute on desktop) */}
            {focusedTask && (
                <TaskCard
                    id={focusedTask.id}
                    index={0}
                    task_num={focusedTask.task_num}
                    status={focusedTask.columnId}
                    title={focusedTask.title}
                    desc={focusedTask.desc}
                    isFocus
                    className="w-full max-w-sm lg:max-w-none lg:w-71.25 lg:absolute lg:top-0 lg:left-2.5 opacity-80 lg:opacity-50 shadow-md"
                />
            )}

            {/* Main Clock Outer Ring */}
            <div className="w-fullmax-w-sm sm:max-w-md lg:max-w-none lg:w-fit px-4 sm:px-12 lg:px-40 py-8 sm:py-14 lg:py-28 mx-auto rounded-4xl sm:rounded-[40px] lg:rounded-[50px] border border-primary-200 flex items-center justify-center">
                {/* Main Clock Inner Ring */}
                <div className="w-full p-4 sm:p-5 lg:p-6 flex flex-col gap-2.5 mx-auto rounded- sm:rounded-[36px] lg:rounded-[50px] border-2 border-primary-300">
                    {/* Mode Tag */}
                    <div className="text-center text-xs font-semibold uppercase tracking-widest text-primary-600">
                        {mode === "focus" ? "Focus Session" : "Break Session"}
                    </div>

                    {/* Time Digits Box */}
                    <div className="flex h-20 sm:h-26.5 justify-center items-center gap-1.5 sm:gap-2.5 rounded-3xl sm:rounded-[42px] border border-primary-600 p-2 sm:p-2.5">
                        {/* Minute */}
                        <div className="font-text-time text-3xl sm:text-5xl text-text-main">{minutes}</div>
                        {/* Colon */}
                        <div className="font-text-time text-3xl sm:text-5xl text-text-main">:</div>
                        {/* Second */}
                        <div className="font-text-time text-3xl sm:text-5xl text-text-main">{seconds}</div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex w-full lg:w-96.5 h-auto sm:h-25 p-1 sm:p-2.5 items-center gap-3 sm:gap-5">
                        {isStarting ? (
                            <>
                                <Button
                                    variant="outlined"
                                    className="flex-[1_0_0] text-text-main py-2.5 sm:py-3"
                                    onClick={handleStop}
                                >
                                    Stop
                                </Button>
                                <Button
                                    leftIcon={<PauseIcon />}
                                    variant="primary"
                                    className="flex-[1_0_0] bg-amber-600 hover:bg-amber-700 active:bg-amber-800 py-2.5 sm:py-3"
                                    onClick={handlePause}
                                >
                                    Pause
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    leftIcon={<SettingIcon className="text-text-main" />}
                                    variant="outlined"
                                    className="flex-[1_0_0] text-text-main py-2.5 sm:py-3"
                                    onClick={() => {
                                        setIsSettingOpen(true);
                                    }}
                                >
                                    Settings
                                </Button>
                                <Button
                                    leftIcon={<PlayIcon />}
                                    variant="primary"
                                    className="flex-[1_0_0] py-2.5 sm:py-3"
                                    onClick={handleStarting}
                                >
                                    Start
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FocusClock;