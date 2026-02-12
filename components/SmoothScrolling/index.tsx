'use client';

import { ReactLenis } from 'lenis/react';

function SmoothScrolling({ children }: { children: React.ReactNode }) {
    // Configurações para deixar "pesado" e "preguiçoso":
    // lerp: Quanto menor, mais "pesada" a rolagem (0.1 é padrão, 0.05 é bem pesado)
    // duration: Duração da animação em segundos
    const lenisOptions = {
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true, // Ativa suavidade no scroll do mouse
        wheelMultiplier: 1, // Velocidade do scroll
    };

    return (
        <ReactLenis root options={lenisOptions}>
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;