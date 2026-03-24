// 'use client'

// import Image from 'next/image';
// import { useState, useEffect } from 'react';

// export default function GlobalLoading({ children }: { children: React.ReactNode }) {
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         if (document.readyState === 'complete') {
//             setIsLoading(false);
//         } else {
//             window.addEventListener('load', () => setIsLoading(false));
//             return () => window.removeEventListener('load', () => setIsLoading(false));
//         }
//     }, []);

//     return (
//         <>
//             {isLoading && (
//                 <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
//                     <Image
//                         className="z-10 cursor-pointer"
//                         priority
//                         src="/hori_fundo-claro.png"
//                         alt="Umini Logo"
//                         width={350}
//                         height={0}
//                     />
//                 </div>
//             )}

//             <div className={isLoading ? "hidden" : "block"}>
//                 {children}
//             </div>
//         </>
//     );
// }



// 'use client'

// import Image from 'next/image';
// import { useState, useEffect } from 'react';

// export default function GlobalLoading({ children }: { children: React.ReactNode }) {
//     // Estado 1: Determina se os dados acabaram de carregar
//     const [isFullyLoaded, setIsFullyLoaded] = useState(false);

//     // Estado 2: Controla o gatilho da animação de saída
//     const [isAnimateOut, setIsAnimateOut] = useState(false);

//     // Estado 3: Controla se a tela de loading deve ser visível (montada) no DOM
//     const [isLoadingVisible, setIsLoadingVisible] = useState(true);

//     useEffect(() => {
//         const onPageLoad = () => {
//             // 1. Marcamos que os dados carregaram
//             setIsFullyLoaded(true);

//             // 2. Iniciamos a animação de saída IMEDIATAMENTE
//             setIsAnimateOut(true);

//             // 3. Esperamos a animação acabar (ex: 500ms) para remover do DOM
//             setTimeout(() => {
//                 setIsLoadingVisible(false);
//             }, 500); // <-- Esse tempo deve ser igual ou maior que a duration- do Tailwind
//         };

//         if (document.readyState === 'complete') {
//             onPageLoad();
//         } else {
//             window.addEventListener('load', onPageLoad);
//             return () => window.removeEventListener('load', onPageLoad);
//         }
//     }, []);

//     // Não removemos o componente do DOM até que a animação acabe
//     if (!isLoadingVisible) {
//         return <>{children}</>;
//     }

//     return (
//         <>
//             {/* Container Principal:
//                 Adicionamos transição de opacidade e visibilidade suave.
//                 Quando isAnimateOut for true, ele fica invisível (opacity-0).
//             */}
//             <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-all duration-500 ease-in-out ${isAnimateOut ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>

//                 {/* Container da Logo:
//                     Quando for carregar (default), ela pulsa (animate-pulse).
//                     Quando isAnimateOut for true, ela faz uma animação de 'revelar':
//                     Cresce (scale-125) e desaparece (opacity-0).
//                 */}
//                 <div className={`transition-all duration-500 ease-in-out ${isAnimateOut ? 'scale-125 opacity-0' : 'scale-100 opacity-100'}`}>
//                     <Image
//                         className={`z-10 cursor-pointer ${!isAnimateOut ? 'animate-pulse' : ''}`}
//                         priority
//                         src="/hori_fundo-claro.png"
//                         alt="Umini Logo"
//                         width={350}
//                         height={0}
//                     />
//                 </div>
//             </div>

//             {/* Conteúdo Real:
//                 Para um efeito ainda melhor, podemos fazer o conteúdo aparecer
//                 com um fade-in suave vindo de baixo para cima quando carregado.
//             */}
//             <div className={`transition-all duration-700 delay-200 ease-out ${isFullyLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//                 {children}
//             </div>
//         </>
//     );
// }



'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function GlobalLoading({ children }: { children: React.ReactNode }) {
    const [isFullyLoaded, setIsFullyLoaded] = useState(false);
    const [isAnimateOut, setIsAnimateOut] = useState(false);
    const [isLoadingVisible, setIsLoadingVisible] = useState(true);

    useEffect(() => {
        // 1. Promessa do tempo mínimo (2 segundos)
        const minimumTimePromise = new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        // 2. Promessa do carregamento da página
        const pageLoadPromise = new Promise((resolve) => {
            if (document.readyState === 'complete') {
                resolve(true);
            } else {
                window.addEventListener('load', () => resolve(true));
            }
        });

        // 3. Executa a saída apenas quando AMBAS as promessas forem resolvidas
        Promise.all([minimumTimePromise, pageLoadPromise]).then(() => {
            setIsFullyLoaded(true);
            setIsAnimateOut(true);

            // Aguarda o tempo da animação (500ms) para remover do DOM
            setTimeout(() => {
                setIsLoadingVisible(false);
            }, 500);
        });

        // Cleanup básico do event listener
        return () => {
            window.removeEventListener('load', () => { });
        };
    }, []);

    // Não renderiza o layout final no topo até terminar tudo
    if (!isLoadingVisible) {
        return <>{children}</>;
    }

    return (
        <>
            {/* Overlay Branco com fade-out */}
            <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-all duration-500 ease-in-out ${isAnimateOut ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>

                {/* Logo com animação de pulsar (durante) e crescer (na saída) */}
                <div className={`transition-all duration-500 ease-in-out ${isAnimateOut ? 'scale-125 opacity-0' : 'scale-100 opacity-100'}`}>
                    <Image
                        className={`z-10 cursor-pointer ${!isAnimateOut ? 'animate-pulse' : ''}`}
                        priority
                        src="/hori_fundo-claro.png"
                        alt="Umini Logo"
                        width={350}
                        style={{ width: 'auto', height: 'auto' }}
                        height={0} // O Next.js com width fixo e height 0 (e sem style auto) às vezes reclama. Se a logo ficar distorcida, troque para um height proporcional ou use style={{ width: 'auto', height: 'auto' }}
                    />

                    <div className='mx-auto mt-20 size-10 border-4 border-secondary border-r-white rounded-full animate-spin'></div>
                </div>
            </div>

            {/* Conteúdo Real: Entra suavemente de baixo para cima */}
            <div className={`transition-all duration-700 delay-200 ease-out ${isFullyLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {children}
            </div>
        </>
    );
}