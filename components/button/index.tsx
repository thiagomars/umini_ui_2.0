import { cn } from "@/lib/utils";

interface ButtonProps {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
    outline?: boolean;
}

export default function Button(props: ButtonProps) {

    const {
        className,
        onClick,
        children,
        outline
    } = props;

    return (
        <button
            className={cn(
                "cursor-pointer py-2 px-4 rounded-full",
                outline ? "border-2 border-whie text-white bg-gray-900/5 drop-shadow-md hover:bg-gray-900/10" : "bg-amber-600 hover:bg-amber-500",
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}