'use client';

import { useState, useEffect, useRef } from 'react';

interface ScrollCounterProps {
    valor: number; // Accepts decimal values
    incrementar: boolean; // true = 0 para valor; false = valor para 0
    duracao?: number; // em milissegundos (padrão: 2000ms)
    delay?: number; // em milissegundos (padrão: 0ms)
    className?: string; // para estilização extra
}

// Helper function to determine the number of decimal places for a number
const getDecimalPlaces = (num: number): number => {
    const numStr = num.toString();
    const decimalPart = numStr.split('.')[1];
    return decimalPart ? 2 : 0;
};

export default function ScrollCounter({
    valor,
    incrementar,
    duracao = 2000,
    delay = 0,
    className = "",
}: ScrollCounterProps) {
    const [displayValue, setDisplayValue] = useState(incrementar ? 0 : valor);
    const elementRef = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Determine the number of decimal places based on the 'valor' prop
    // This will be used for formatting the displayed number.
    const decimalPlaces = getDecimalPlaces(valor);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Configura o observador para detectar quando o elemento aparece na tela
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Desconecta após a primeira visualização
                }
            },
            { threshold: 0.6 } // Dispara quando 60% do elemento estiver visível
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTimestamp: number | null = null;
        let animationFrameId: number;

        // Define valores de início e fim baseados na prop 'incrementar'
        const startValue = incrementar ? 0 : valor;
        const endValue = incrementar ? valor : 0;

        const timeoutId = setTimeout(() => {
            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;

                const progress = Math.min((timestamp - startTimestamp) / duracao, 1);

                const easeOutProgress = 1 - Math.pow(1 - progress, 3);

                // Calculate current value without Math.floor to allow decimals
                const currentCount = startValue + (endValue - startValue) * easeOutProgress;

                setDisplayValue(currentCount);

                if (progress < 1) {
                    animationFrameId = window.requestAnimationFrame(step);
                } else {
                    // Ensure the final value is exactly the target value to avoid
                    // potential floating point inaccuracies at the very end of the animation.
                    setDisplayValue(endValue);
                }
            };

            animationFrameId = window.requestAnimationFrame(step);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [isVisible, valor, incrementar, duracao, delay]); // Dependencies include 'valor' to restart animation if it changes

    // Format the displayValue using Intl.NumberFormat for thousands separators and decimal places
    // Using 'pt-BR' locale for comma as decimal separator and dot as thousands separator.
    const formattedDisplayValue = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: decimalPlaces, // Ensure correct number of decimal places are always shown
        maximumFractionDigits: decimalPlaces, // Do not show more decimal places than original valor
    }).format(displayValue);

    return (
        <span ref={elementRef} className={className}>
            {formattedDisplayValue}
        </span>
    );
}