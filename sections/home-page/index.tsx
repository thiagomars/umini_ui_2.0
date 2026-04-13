'use client'

import Section from "@/components/section";
import Button from "@/components/button";
import { Typing } from "@/components/typing";
import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";

export default function HomePage() {

    const isMobile = useIsMobile();

    return (
        <section id="home">
            <div className="relative w-full min-h- flex flex-col justify-center">
                {isMobile ? <Image
                    fill
                    sizes="(max-width: 1280px), 100vw"
                    className="object-cover"
                    priority
                    src={"/img-back-home.png"}
                    alt="Fundo do site"
                /> : <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/video-back-home.webm" type="video/webm" />
                    <source src="/video-back-home.mp4" type="video/mp4" />
                </video>}

                <div className="bg-black absolute inset-0 z-0 h-full w-full opacity-65"></div>

                <Section>
                    <div className="text-white text-center lg:text-left relative mx-10 lg:ml-20 lg:w-1/2 flex flex-col justify-center lg:gap-6 gap-10 min-h-dvh mb-10 lg:mb-0">
                        <div className="drop-shadow-lg font-bold text-5xl lg:text-6xl lg:leading-16 leading-14 mt-24 lg:mt-14">
                            <h1>Engenharia Elétrica e <br />Fotovoltaica com</h1>
                            <Typing texts={["Humanização. ", "Economia. ", "Confiança. "]} loop typeSpeed={160} className="text-primary -500 lg:flex lg:justify-start justify-center" />
                        </div>

                        <p className="text-2xl lg:w-1/2 drop-shadow-lg">Soluções que geram economia, confiança e desempenho.</p>

                        <div className="w-full lg:w-3/5 flex flex-row lg:justify-start justify-center items-center flex-wrap gap-x-2 gap-y-3">
                            <Button onClick="#cadastroPlataforma">Agendar reunião</Button>
                            <Button onClick="/servicos">Nossos serviços</Button>
                            <Button onClick="#servicos">Calcular Potência do Kit fotovoltaico</Button>
                            <Button onClick="#combos">Combos de projeto</Button>
                            <Button onClick="area-cliente">Área do cliente</Button>
                        </div>
                    </div>
                </Section>
            </div>
        </section>
    )
}