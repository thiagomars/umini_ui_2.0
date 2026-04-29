'use client'

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BoxView from "@/components/boxView";

const team = [
    {
        name: "Matheus Renan",
        role: "Engenheiro Eletricista / Sócio",
        image: "/team/Renan.png",
        bio: "Matheus lidera o desenvolvimento de projetos elétricos de grande porte, combinando rigor técnico com visão estratégica. É o especialista à frente das consultorias de alta complexidade e da emissão de laudos de segurança do trabalho, garantindo que as operações de nossos clientes sejam não apenas eficientes, mas rigorosamente seguras e normatizadas.",
        personal: "\u201CDou prioridade à saúde física e mental, portanto pratico musculação, jiu jitsu e sempre estou aprendendo algo novo. Um corpo forte e uma mente sã são o alicerce para uma vida próspera e saudável.\u201D"
    },
    {
        name: "Gustavo Melo",
        role: "Engenheiro Eletricista / Fundador",
        image: "/team/Gustavo.png",
        bio: "Gustavo é o escudo regulatório dos nossos clientes. Atua na linha de frente da regulação do setor elétrico, traduzindo resoluções normativas em estratégias de negócios. É o especialista responsável por conduzir trâmites jurídicos complexos e defender os direitos legais dos clientes e parceiros frente às concessionárias, garantindo conformidade e segurança institucional em cada etapa do processo.",
        personal: "\u201CBusco manter um alinhamento entre os cuidados físico e mental. Pratico musculação frequentemente, jogo beach tennis, corro e frequento a igreja regularmente para meu alimento espiritual. Tenho uma atração enorme pela literatura brasileira, e não abro mão de bons encontros fora das telas com família e amigos.\u201D"
    },
    {
        name: "Gabriel Albuquerque",
        role: "Engenheiro Eletricista / Fundador",
        image: "/team/Gabriel.png",
        bio: "Gabriel é focado na viabilização e no detalhamento técnico. Especialista em projetos elétricos de grande porte, ele é responsável por transformar conceitos robustos em projetos executivos de altíssima precisão. Sua atuação garante que as equipes de campo e integradores tenham em mãos plantas e diagramas à prova de erros, proporcionando uma execução fluida e sem imprevistos.",
        personal: "\u201CMinha saúde é prioridade. Gosto de me manter ativo sempre que posso, alternando entre academia e trilhas, desbravando novas paisagens. Gosto de filmes, passeios e momentos com a família.\u201D"
    },
    {
        name: "Daniel Ribeiro",
        role: "Engenheiro Eletricista",
        image: "/team/Daniel.png",
        bio: "Daniel é a mente analítica por trás das nossas soluções em energia solar. Especializado em sistemas fotovoltaicos, ele domina o dimensionamento de usinas, a criação de modelagens 3D detalhadas e a elaboração de relatórios precisos de geração de energia. Seu trabalho entrega aos clientes a previsibilidade e a segurança financeira necessárias para grandes investimentos em energia renovável.",
        personal: "\u201CSou uma pessoa bastante flexível em meus hobbys. Gosto de me manter ativo sempre que posso, alternando entre musculação e jiu jitsu. Aprecio bons livros, bons momentos em família, pescarias e viagens.\u201D"
    },
    {
        name: "Bruna Letícia",
        role: "Engenheira Eletricista",
        image: "/team/Bruna.png",
        bio: "Bruna é a nossa especialista em inteligência financeira e eficiência. Ela domina as nuances da análise e regulação tarifária, elaborando estratégias que otimizam os custos operacionais dos nossos clientes com energia. Unindo sua expertise técnica em eficiência energética a um profundo entendimento do direito do consumidor no setor elétrico, Bruna garante que nenhuma empresa pague mais do que o justo.",
        personal: "\u201CTenho uma rotina ativa com musculação e muay thai, que me ajudam a desenvolver disciplina e cuidar da saúde, além de momentos mais leves, como jogar vôlei com amigos. Também valorizo meu tempo sozinha, seja lendo ou ouvindo música, mas sem abrir mão de estar presente com minha família e amigos. E gosto de viver novas experiências, especialmente viajando e conhecendo lugares diferentes.\u201D"
    }
];

const GAP_PX = 32;

export default function Equipe() {

    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [scrollDistance, setScrollDistance] = useState(0);

    // Mede a largura real da trilha vs a viewport para calcular a distância de scroll
    useEffect(() => {
        const measure = () => {
            if (trackRef.current) {
                const trackWidth = trackRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;
                setScrollDistance(Math.max(0, trackWidth - viewportWidth + 64)); // 64px = padding
            }
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    // Sincroniza swipe horizontal com scroll vertical no mobile
    useEffect(() => {
        let touchStartX = 0;
        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!containerRef.current) return;

            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;

            const deltaX = touchStartX - touchX;
            const deltaY = touchStartY - touchY;

            // Se o movimento for predominantemente horizontal
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
                // Traduz delta horizontal em scroll vertical
                // Multiplicador aumentado para 12 para tornar o swipe muito mais sensível no mobile
                window.scrollBy(0, deltaX * 8);
                touchStartX = touchX; // Atualiza para o próximo frame do movimento

                // Impede o scroll horizontal nativo (se houvesse) para não conflitar
                if (e.cancelable) e.preventDefault();
            }
        };

        const track = trackRef.current;
        if (track) {
            track.addEventListener('touchstart', handleTouchStart, { passive: true });
            track.addEventListener('touchmove', handleTouchMove, { passive: false });
        }

        return () => {
            if (track) {
                track.removeEventListener('touchstart', handleTouchStart);
                track.removeEventListener('touchmove', handleTouchMove);
            }
        };
    }, [scrollDistance]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -scrollDistance]
    );

    return (
        <div
            ref={containerRef}
            // Altura do wrapper = 100vh (seção fixa) + scroll extra proporcional ao conteúdo
            style={{ height: `${100 + team.length * 80}vh` }}
        >
            <section
                id="equipe"
                className="sticky top-0 h-screen w-full overflow-hidden bg-gray-50 flex flex-col"
            >
                {/* Header fixo */}
                <BoxView delay={400}>
                    <div className="pt-28 md:pt-32 pb-6 md:pb-8 px-8 md:px-16 shrink-0">
                        <p className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-gray-700">
                            Quem faz a Umini acontecer
                        </p>
                        {/* <p className="text-sm md:text-lg text-primary font-medium uppercase tracking-widest">
                            Aproximação Pessoal
                        </p> */}
                    </div>
                </BoxView>

                {/* Trilha horizontal de cards */}
                <div className="flex-1 relative min-h-0">
                    <motion.div
                        ref={trackRef}
                        style={{ x }}
                        className="flex px-8 md:px-16 absolute inset-y-0 items-stretch pb-12 md:pb-16"
                    >
                        {team.map((member, index) => (
                            <div
                                key={member.name}
                                className="group shrink-0 bg-white rounded-4xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-row border border-gray-100"
                                style={{
                                    width: `max(560px, calc(50vw - ${GAP_PX + 32}px))`,
                                    marginRight: index < team.length - 1 ? `${GAP_PX}px` : 0
                                }}
                            >
                                {/* Foto */}
                                <div className="relative w-2/5 md:w-2/5 shrink-0 overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#20272b]/60 via-transparent to-transparent" />
                                </div>

                                {/* Conteúdo */}
                                <div className="flex-1 p-5 md:p-6 flex flex-col overflow-y-auto">
                                    <div className="mb-3 md:mb-4">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-700 group-hover:text-primary transition-colors leading-tight">
                                            {member.name}
                                        </h3>
                                        <p className="text-primary font-semibold text-xs uppercase tracking-wider mt-1">
                                            {member.role}
                                        </p>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed text-sm grow text-justify">
                                        {member.bio}
                                    </p>

                                    <div className="pt-4 mt-4 border-t border-gray-100">
                                        <p className="text-xs font-bold text-[#20272b]/40 uppercase tracking-widest mb-2">
                                            Fora do escritório
                                        </p>
                                        <p className="text-xs md:text-sm text-gray-500 italic leading-snug text-justify">
                                            {member.personal}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Indicador de progresso */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {team.map((member, i) => {
                        const segmentStart = i / team.length;
                        const segmentEnd = (i + 1) / team.length;
                        return (
                            <ProgressDot
                                key={member.name}
                                scrollYProgress={scrollYProgress}
                                segmentStart={segmentStart}
                                segmentEnd={segmentEnd}
                            />
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

function ProgressDot({
    scrollYProgress,
    segmentStart,
    segmentEnd
}: {
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
    segmentStart: number;
    segmentEnd: number;
}) {
    const width = useTransform(
        scrollYProgress,
        [segmentStart, segmentEnd],
        [8, 32]
    );
    const opacity = useTransform(
        scrollYProgress,
        [segmentStart, segmentEnd],
        [0.3, 1]
    );

    return (
        <motion.div
            style={{ width, opacity }}
            className="h-2 bg-primary rounded-full"
        />
    );
}
