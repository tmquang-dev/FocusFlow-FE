import React from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outlined" | "text";
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            leftIcon,
            rightIcon,
            className = "",
            children,
            type = "button",
            ...props
        },
        ref
    ) => {
        // Base classes
        const baseClasses = "flex items-center justify-center rounded-lg transition-colors cursor-pointer px-4 py-2.5 gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none";


        // Variant-specific classes and styles
        let variantClasses = "";

        switch (variant) {
            case "primary":
                variantClasses = "bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-text-on-yellow text-sm font-medium leading-5";
                break;
            case "outlined":
                variantClasses = "bg-secondary-50 hover:bg-primary-50 active:bg-primary-100 border border-border text-text-primary text-xs font-semibold leading-4 tracking-[0.6px]";
                break;
            case "text":
                variantClasses = "hover:text-text-hover active:text-text-active text-text-primary text-xs font-semibold leading-4 tracking-[0.6px]";
                break;
        }

        return (
            <button
                ref={ref}
                type={type}
                className={cn(baseClasses, variantClasses, className)}
                {...props}
            >
                {leftIcon && <span className="flex items-center justify-center shrink-0">{leftIcon}</span>}
                {children}
                {rightIcon && <span className="flex items-center justify-center shrink-0">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
