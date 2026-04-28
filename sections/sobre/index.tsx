import BoxView from "@/components/boxView";
import Button from "@/components/button";
import VideoPlayer from "@/components/videoPlayer";

export default function SobreUmini() {

    return (
        <section id="sobre" className="w-full relative overflow-hidden">

            {/* === CAMADA DE FUNDO === */}
            {/* Fundo escuro que ocupa a seção inteira, com degradê suave para branco */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#20272b]" />
                {/* Degradê longo e suave: escuro → branco */}
                <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-b from-transparent via-[#20272b]/50 to-white" />
            </div>

            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    opacity: 0.08,
                }}
            />

            {/* === CONTEÚDO TEXTUAL === */}
            <div className="relative z-10 px-8 md:px-16 lg:px-20 min-h-screen flex items-center">

                {/* Gradiente decorativo sutil */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <BoxView>
                        <h1 className="text-4xl text-center md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                            Muito mais que{" "}
                            <span className="text-primary">homologação</span>
                        </h1>
                    </BoxView>

                    <BoxView delay={300}>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 text-center">
                            A Umini Engenharia Elétrica é o braço técnico que faltava para a sua empresa. Nascemos para descomplicar projetos e homologações, permitindo que integradores solares, construtoras, engenheiros e arquitetos foquem no que fazem de melhor: fechar negócios e instalar com qualidade.
                        </p>
                    </BoxView>

                    <BoxView delay={600}>
                        <div className="flex justify-center flex-wrap gap-4">
                            <Button
                                onClick="/servicos"
                                className="text-white"
                            >
                                Nossos Serviços
                            </Button>
                            <Button
                                onClick="#cadastroPlataforma"
                                className="text-white"
                            >
                                Fale Conosco
                            </Button>
                        </div>
                    </BoxView>
                </div>
            </div>

            {/* === VÍDEO MANIFESTO === */}
            <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-16 md:pb-24">
                <BoxView>
                    <VideoPlayer
                        sources={[
                            { src: "/manifesto_mini.webm", type: "video/webm" },
                            { src: "/manifesto_mini.mp4", type: "video/mp4" },
                        ]}
                        label="Assista nosso manifesto"
                        className="max-w-5xl mx-auto border border-white/10"
                    />
                </BoxView>
            </div>

        </section>
    )
}
