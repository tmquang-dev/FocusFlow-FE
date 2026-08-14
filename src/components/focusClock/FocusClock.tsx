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
        <div className="relative max-w-page-content w-full flex items-center justify-center min-h-170 mx-auto px-2.5">
            <SettingModal
                isOpen={isSettingOpen}
                onClose={() => {
                    setIsSettingOpen(false);
                }}
                onSave={handleSaveSettings}
            />

            <div className="w-fit px-40 py-28 mx-auto rounded-[50px] border border-primary-200 flex items-center justify-center">
                <div className="p-6 flex flex-col gap-2.5 mx-auto rounded-[50px] border-2 border-primary-300">
                    {/* Mode Tag */}
                    <div className="text-center text-xs font-semibold uppercase tracking-widest text-primary-600">
                        {mode === "focus" ? "Focus Session" : "Break Session"}
                    </div>

                    <div className="flex h-26.5 justify-center items-center gap-2.5 rounded-[42px] border border-primary-600 p-2.5">
                        {/* Minute */}
                        <div className="font-text-time text-text-main">{minutes}</div>
                        {/* Colon */}
                        <div className="font-text-time text-text-main">:</div>
                        {/* Second */}
                        <div className="font-text-time text-text-main">{seconds}</div>
                    </div>

                    <div className="flex w-96.5 h-25 p-2.5 items-center gap-5">
                        {isStarting ? (
                            <>
                                <Button
                                    variant="outlined"
                                    className="flex-[1_0_0] text-text-main"
                                    onClick={handleStop}
                                >
                                    Stop
                                </Button>
                                <Button
                                    leftIcon={<PauseIcon />}
                                    variant="primary"
                                    className="flex-[1_0_0] bg-amber-600 hover:bg-amber-700 active:bg-amber-800"
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
                                    className="flex-[1_0_0] text-text-main"
                                    onClick={() => {
                                        setIsSettingOpen(true);
                                    }}
                                >
                                    Settings
                                </Button>
                                <Button
                                    leftIcon={<PlayIcon />}
                                    variant="primary"
                                    className="flex-[1_0_0]"
                                    onClick={handleStarting}
                                >
                                    Start
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {focusedTask && (
                <TaskCard
                    id={focusedTask.id}
                    index={0}
                    task_num={focusedTask.task_num}
                    status={focusedTask.columnId}
                    title={focusedTask.title}
                    desc={focusedTask.desc}
                    isFocus
                    className="absolute top-0 left-2.5 w-71.25 opacity-50 shadow-md"
                />
            )}
        </div>
    );
}

export default FocusClock;