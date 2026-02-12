'use client';

import { useState, useEffect } from 'react';

export function useActiveSection() {
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                // Se a seção está visível acima de um certo limite (ex: 50%)
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            // rootMargin: '-10% 0px -70% 0px', // Opcional: ajusta a "linha de detecção"
            threshold: 0.7, // 50% da seção precisa estar visível
        });

        // Pega todas as seções que possuem um ID
        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return activeSection;
}