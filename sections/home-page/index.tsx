import Section from "@/components/section";
import Button from "@/components/button";
import { Typing } from "@/components/typing";

export default function HomePage() {

    return (
        <section id="home" className="min-h-dvh">
            <div className="relative w-full min-h- flex flex-col justify-center">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    webkit-playsinline="true"
                >
                    <source src="/video-back-home.mp4" type="video/mp4" />
                </video>

                <div className="bg-black absolute inset-0 z-0 h-full w-full opacity-65"></div>

                <Section>
                    <div className="text-white text-center lg:text-left relative mx-10 lg:ml-20 lg:w-1/2 flex flex-col justify-center lg:gap-6 gap-10 min-h-dvh mb-10 lg:mb-0">
                        <div className="drop-shadow-lg font-bold text-5xl lg:text-6xl lg:leading-16 leading-14 mt-24 lg:mt-14">
                            <h1>Engenharia Elétrica e <br />Fotovoltaica com</h1>
                            <Typing texts={["Humanização. ", "Economia. ", "Confiança. "]} loop typeSpeed={160} className="text-primary -500 lg:flex lg:justify-start justify-center" />
                        </div>

                        <p className="text-2xl lg:w-1/2 drop-shadow-lg">Soluções que geram economia, confiança e desempenho.</p>

                        <div className="w-full lg:w-3/5 flex flex-row lg:justify-start justify-center items-center flex-wrap gap-x-2 gap-y-3">
                            <Button>Agendar reunião</Button>
                            <Button>Nossos serviços</Button>
                            <Button>Calcular Potência do Kit fotovoltaico</Button>
                            <Button>Combos de projeto</Button>
                            <Button>Área do cliente</Button>
                        </div>
                    </div>
                </Section>
            </div>
        </section>
    )
}