import Section from "@/components/section";
import BoxView from "@/components/boxView";
import NossosNumeros from "../nossosNumeros";

export default function NumberSections() {

    return (
        <section id="number">
            <Section className="relative pt-28 lg:pt-2 lg:h-screen flex justify-center items-center px-8">
                <BoxView className="text-4xl md:text-4xl lg:text-5xl max-w-7xl font-bold lg:px-20 drop-shadow-md sticky top-1/3 text-center">
                    Engenharia que une <span className="text-primary -500">precisão técnica, atendimento próximo e impacto real</span>.
                </BoxView>
            </Section>

            <NossosNumeros />
        </section>
    )
}