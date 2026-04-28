import BoxView from "@/components/boxView";
import Section from "@/components/section";
import Button from "@/components/button";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function CTA() {
    return (
        <section id="cta" className="relative w-full py-24 md:py-32 px-6 md:px-8 bg-white overflow-hidden">
            <Section className="max-w-6xl mx-auto">
                <BoxView delay={200}>
                    <div className="relative w-full bg-[#20272b] rounded-[40px] md:rounded-[60px] overflow-hidden p-8 md:p-16 lg:p-24 shadow-2xl">

                        {/* Textura de grade sutil dentro do box */}
                        <div
                            className="absolute inset-0 opacity-[0.05] pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'repeat',
                            }}
                        />

                        {/* Efeitos de brilho/glow internos */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                            <BoxView delay={300}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-semibold uppercase tracking-wider mb-8">
                                    {/* <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span> */}
                                    Vamos Conversar?
                                </div>
                            </BoxView>

                            <BoxView delay={400}>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                                    Pronto para elevar o nível da sua <span className="text-primary">engenharia?</span>
                                </h2>
                            </BoxView>

                            <BoxView delay={500}>
                                <p className="text-base md:text-xl text-white/70 mb-12 leading-relaxed">
                                    Descubra como a Umini pode simplificar seus processos, reduzir custos e garantir a homologação dos seus projetos com agilidade e segurança técnica.
                                </p>
                            </BoxView>

                            <BoxView delay={600}>
                                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                    <Button
                                        onClick="https://wa.me/5581989445101"
                                        className="text-white"
                                    >
                                        Falar com Especialista
                                    </Button>
                                    <Button
                                        onClick="/servicos"
                                        className="text-white"
                                    >
                                        Ver Serviços
                                    </Button>
                                </div>
                            </BoxView>
                        </div>

                    </div>
                </BoxView>
            </Section>
        </section>
    );
}
