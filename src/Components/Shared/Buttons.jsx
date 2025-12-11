import React from "react";
import clsx from "clsx";

const Button = ({
    children,
    className = "",
    variant = "primary",
    size = "md",
    ...props
}) => {

    // Variant styles (DaisyUI + Tailwind)
    const variants = {
        primary: "btn btn-primary",
        secondary: "btn btn-secondary",
        accent: "btn btn-accent",
        ghost: "btn btn-ghost",
        outline: "btn btn-outline",
        info: "btn btn-info",
        success: "btn btn-success",
        warning: "btn btn-warning",
        error: "btn btn-error",
        link: "btn btn-link",
    };

    // Size styles
    const sizes = {
        sm: "btn-sm",
        md: "btn-md",
        lg: "btn-lg",
        xl: "btn-wide",
    };

    return (
        <button
            {...props}
            className={clsx(
                "transition-all duration-200 shadow-md",
                variants[variant],
                sizes[size],
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;
