'use client';

import { cn } from "@/lib/utils";
import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function BoxOpaco({ children, className, mainClassName }: { children: React.ReactNode, className?: string, mainClassName?: string }) {

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 100, damping: 25, mass: 3 });
    const springY = useSpring(y, { stiffness: 100, damping: 25, mass: 3 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Subtraímos metade do tamanho aproximado da bolha para centralizá-la no cursor
        // (A bolha tem w-2/3, então o cálculo exato varia, mas isso aproxima bem)
        x.set(mouseX - (rect.width * 0.3));
        y.set(mouseY - (rect.height * 0.25));
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className={cn("relative overflow-hidden rounded-[55px] border-2 border-gray-100/90 h-full", mainClassName)}
        >
            <motion.div
                style={{ x: springX, y: springY }}
                className="absolute top-0 left-0 w-2/3 h-3/4 rounded-full blur-[55px] z-0 bg-amber-500/60 pointer-events-none"
            />

            <div className={cn(
                "backdrop-blur-3xl w-full h-full z-10 bg-gray-50/50 p-8 relative",
                className
            )}>
                {children}
            </div>
        </div>
    )

}