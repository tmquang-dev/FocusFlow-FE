import React, { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    error?: string;
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    wrapperClassName?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            id,
            label,
            leftIcon,
            rightIcon,
            error,
            containerClassName,
            labelClassName,
            inputClassName,
            wrapperClassName,
            disabled,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const inputId = id || generatedId;
        const errorId = `${inputId}-error`;

        return (
            <div className={cn("flex flex-col w-full items-start gap-[10px] relative", containerClassName)}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn("text-text-secondary text-[12px] font-medium leading-[16px] uppercase tracking-wide select-none cursor-pointer", labelClassName)}
                    >
                        {label}
                    </label>
                )}

                <div className={cn("relative w-full", wrapperClassName)}>
                    {leftIcon && (
                        <div className="absolute left-[15px] top-1/2 -translate-y-1/2 flex items-center justify-center text-text-secondary shrink-0 pointer-events-none">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        aria-invalid={error ? "true" : "false"}
                        aria-describedby={error ? errorId : undefined}
                        disabled={disabled}
                        className={cn("w-full bg-gray-100  border border-border rounded-lg px-[14px] py-[8px] text-sm text-text-main leading-5 placeholder:text-text-placeholder outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all duration-200",
                            leftIcon && "pl-[38px]",
                            rightIcon && "pr-[38px]",
                            disabled && "opacity-60 cursor-not-allowed bg-gray-200",
                            error && "!border-red-500 focus:ring-red-500/20",
                            inputClassName
                        )}
                        {...props}
                    />

                    {rightIcon && (
                        <div className="absolute right-[15px] top-1/2 -translate-y-1/2 flex items-center justify-center text-text-secondary shrink-0">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {error && (
                    <span className="font-text-small text-red-500 mt-1 select-none">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

InputField.displayName = "InputField";

export default InputField;
