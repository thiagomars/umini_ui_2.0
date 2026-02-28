import { cn } from "@/lib/utils";

interface ButtonProps {
    className?: string;
    onClick?: (() => void) | string;
    children: React.ReactNode;
    outline?: boolean;
}

export default function Button(props: ButtonProps) {

    const {
        className,
        onClick: propOnClick,
        children,
        outline
    } = props;

    const Tag = (typeof propOnClick === "string") ? "a" : "button";

    const elementProps: {
        onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
        href?: string;
    } = {};

    if (Tag === "a" && typeof propOnClick === "string") {
        elementProps.href = propOnClick;
    } else if (Tag === "button" && typeof propOnClick === "function") {
        elementProps.onClick = propOnClick;
    }

    return (
        <Tag className={cn(
            "cursor-pointer py-2 px-4 rounded-full",
            outline ? "border-2 border-whie text-white bg-gray-900/5 drop-shadow-md hover:bg-gray-900/10" : "bg-amber-600 hover:bg-amber-500",
            className
        )}
            {...elementProps}
        >
            {children}
        </Tag>
    )
}