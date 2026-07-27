import Button from "@/components/common/Button";
import { CircleSmallIcon, CrossIcon, LogoIcon, PlusIcon } from "@/components/common/Icons";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                }`}
        >
            {/* Backdrop Overlay */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black/50 transition-opacity duration-300"
            />

            {/* Drawer Container (Frame) */}
            <aside
                className={`relative z-10 w-60 h-full flex flex-col items-start shrink-0 border-r border-border bg-background-secondary-50 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-15 p-2.5 justify-between items-center self-stretch border-b border-border">
                    <div className="flex items-center gap-1 pointer-events-none ">
                        <LogoIcon className="text-primary-600" />
                        <h1 className="text-text-main font-text-medium">
                            FocusFlow
                        </h1>
                    </div>
                    <Button onClick={onClose} variant="text" className="text-text-main p-2">
                        <CrossIcon />
                    </Button>
                </div>
                <nav className="flex w-full p-2.5 flex-col items-start gap-1">
                    <h3 className="text-text-main text-xs font-text-medium py-2 px-4">Apps</h3>
                    <ul className="flex flex-col w-full pl-2.5 items-start gap-0.5">
                        <li className="w-full">
                            <Button variant="text" leftIcon={<CircleSmallIcon />} className="flex justify-start px-1.5 w-full py-2 gap-1.5 font-text-medium active:bg-primary-200" to="/">WorkSpace 1</Button>
                        </li>
                    </ul>
                    <Button variant="outlined" leftIcon={<PlusIcon />} className="w-full font-text-medium active:bg-primary-200">Create Workspace</Button>
                </nav>
            </aside>
        </div>,
        document.body
    );
}
