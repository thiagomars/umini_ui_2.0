import { cn } from "@/lib/utils";

interface ButtonProps {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

export default function Button(props: ButtonProps) {

    const {
        className,
        onClick,
        children
    } = props;

    return (
        <button
            className={cn("cursor-pointer py-2 px-4 bg-amber-600 hover:bg-amber-500 rounded-full", className)}
            onClick={onClick}
        >
            {children}
        </button>
    )
}