'use client';

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, ReactNode } from "react";

interface TextViewProps {
    children: ReactNode;
    className?: string;
    delay?: number; // milissegundos
}

export default function BoxView({ children, className = "", delay = 200 }: TextViewProps) {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;

                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -50px 0px" // Dispara um pouco antes do fundo da tela
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={elementRef}
            className={cn(
                "transform transition-all duration-1000 ease-out",
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12",
                className
            )}
            // Aplica o atraso da transição usando estilo inline
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </div>
    );
}