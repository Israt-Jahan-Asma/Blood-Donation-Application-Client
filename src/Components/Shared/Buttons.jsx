import React from "react";
import clsx from "clsx";

const Button = ({
    children,
    className = "px-10 py-3 rounded-lg",
    variant = "primary",
    size = "md",
    ...props
}) => {

    // Variant styles (DaisyUI + Tailwind)
    const variants = {
        primary: "text-white bg-[#1799ab] hover:bg-[#1799abe6] ",
        secondary: "text-white bg-[#FF7D4A] hover:bg-[#E96632]",
        accent: "text-white bg-[#00E1AA] hover:bg-[#00C08D]",
        outline: "bg-[#ffffff80] border-2 border-[#1799ab4d] text-[#171d26] hover:bg-[#1799ab1a] ",
        ghost: "bg-transparent hover:bg-[#F5F5F5]",
        link: "text-[#4B8BFF] underline-offset-4 hover:underline",
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
