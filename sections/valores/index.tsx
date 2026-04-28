import BoxView from "@/components/boxView";
import Section from "@/components/section";
import { Target, Handshake, Zap } from "lucide-react";

const values = [
    {
        title: "Precisão Técnica",
        description: "Decisões baseadas em normas e cálculos rigorosos.",
        icon: Target
    },
    {
        title: "Parceria Real",
        description: "O problema do cliente com a concessionária é o nosso problema.",
        icon: Handshake
    },
    {
        title: "Agilidade",
        description: "Processos bem definidos para entregas rápidas, sem sacrificar a qualidade.",
        icon: Zap
    }
];

export default function Valores() {
    return (
        <section id="valores" className="pb-32 pt-60 px-8 bg-white">
            <Section className="max-w-6xl mx-auto">
                <BoxView>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#20272b] mb-4">
                            Nossos Valores
                        </h2>
                        <p className="text-lg text-primary font-medium uppercase tracking-widest">
                            O que nos guia
                        </p>
                    </div>
                </BoxView>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {values.map((value, index) => (
                        <BoxView key={value.title} delay={index * 200}>
                            <div className="flex flex-col items-center text-center p-8 rounded-4xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="mb-6 p-4 rounded-2xl bg-primary/10">
                                    <value.icon size={48} color="#3F4447" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#20272b] mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        </BoxView>
                    ))}
                </div>
            </Section>
        </section>
    );
}
