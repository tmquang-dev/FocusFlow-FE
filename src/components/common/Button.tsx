import React from "react";
import { Link, type LinkProps } from "react-router";
import { cn } from "../../utils/cn";
import { LoadingIcon } from "./Icons";

export type ButtonProps = {
  variant?: "primary" | "outlined" | "text";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isloading?: boolean;
  to?: LinkProps["to"];
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<Omit<LinkProps, "to">>;

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      leftIcon,
      rightIcon,
      className = "",
      children,
      type = "button",
      isloading,
      to,
      ...props
    },
    ref,
  ) => {
    // Base classes
    const baseClasses =
      "flex items-center justify-center rounded-lg transition-colors cursor-pointer px-4 py-2.5 gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none";

    // Variant-specific classes and styles
    let variantClasses = "";

    switch (variant) {
      case "primary":
        variantClasses =
          "bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-text-on-yellow text-sm font-medium leading-5";
        break;
      case "outlined":
        variantClasses =
          "bg-secondary-50 hover:bg-primary-50 active:bg-primary-100 border border-border text-text-primary text-xs font-semibold leading-4 tracking-[0.6px]";
        break;
      case "text":
        variantClasses =
          "hover:text-text-hover hover:bg-gray-100 active:text-text-active active:bg-gray-200 text-text-primary text-xs font-semibold leading-4 tracking-[0.6px]";
        break;
    }

    const combinedClassName = cn(baseClasses, variantClasses, className);

    const content = isloading ? (
      <LoadingIcon />
    ) : (
      <>
        {leftIcon && (
          <span className="flex items-center justify-center shrink-0">
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span className="flex items-center justify-center shrink-0">
            {rightIcon}
          </span>
        )}
      </>
    );

    if (to) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={to}
          className={combinedClassName}
          {...(props as Omit<LinkProps, "to" | "className">)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={combinedClassName}
        disabled={isloading ?? props.disabled}
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
