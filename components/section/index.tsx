import { cn } from "@/lib/utils";

export default function Section({ children, className }: { children: React.ReactNode, className?: string }) {

    return (
        <div className={cn("mx-auto max-w-screen-2xl w-full text-gray-800", className)}>
            {children}
        </div>
    )
}