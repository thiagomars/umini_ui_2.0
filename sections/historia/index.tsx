import BoxView from "@/components/boxView";
import Section from "@/components/section";

export default function Historia() {
    return (
        <section id="historia" className="bg-white py-24 px-8 overflow-hidden min-h-screen flex items-center">
            <Section className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Title Side */}
                    <div className="lg:col-span-5">
                        <BoxView delay={200}>
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                                Nossa História
                                <span className="block text-primary text-xl md:text-3xl font-medium mt-2">
                                    Por que existimos
                                </span>
                            </h2>
                        </BoxView>
                    </div>

                    {/* Content Side */}
                    <div className="lg:col-span-7">
                        <div className="relative">
                            <BoxView delay={300}>
                                <div className="absolute -top-10 -left-10 text-8xl text-primary/20 font-serif pointer-events-none select-none">
                                    “
                                </div>
                            </BoxView>

                            <BoxView delay={400}>
                                <p className="text-xl md:text-2xl leading-relaxed font-light text-justify italic">
                                    "Entendemos na pele os gargalos do setor elétrico e da energia solar. Víamos excelentes integradores perdendo tempo com burocracias de concessionárias e travados na etapa de elaboração e homologação de projetos."
                                </p>
                            </BoxView>

                            <BoxView delay={500}>
                                <p className="text-lg md:text-xl leading-relaxed mt-8 text-justify">
                                    A <span className="font-bold text-primary">Umini</span> foi estruturada exatamente para resolver essa dor. Não somos apenas terceirizados; somos <span className="font-semibold">parceiros estratégicos de engenharia</span>.
                                </p>
                            </BoxView>

                            <BoxView delay={600}>
                                <p className="text-lg md:text-xl leading-relaxed mt-6 text-justify">
                                    Cuidamos de toda a complexidade técnica e de homologação, garantindo agilidade e segurança normativa para que nossos clientes possam escalar suas operações.
                                </p>
                            </BoxView>
                        </div>
                    </div>
                </div>
            </Section >
        </section >
    );
}
