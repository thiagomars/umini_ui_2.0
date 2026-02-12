import { useState, useEffect } from 'react';

export function useSectionExiting() {
    const [exitedSections, setExitedSections] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                // isIntersecting será FALSE quando a seção tiver MENOS que 10% visível
                // (Baseado no threshold de 0.1)
                const hasExited90Percent = !entry.isIntersecting;

                setExitedSections((prev) => ({
                    ...prev,
                    [entry.target.id]: hasExited90Percent,
                }));
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            // 0.1 significa: "Me avise quando cruzar a linha de 10% de visibilidade"
            threshold: 0.1,
        });

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return exitedSections;
}