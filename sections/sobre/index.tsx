import BoxView from "@/components/boxView";
import Section from "@/components/section";


export default function SobreUmini() {

    return (
        <Section>
            <section id="sobre" className="px-8">
                <BoxView>
                    <h1 className="text-center text-5xl font-bold">Sobre a Umini</h1>
                </BoxView>

                <BoxView delay={300}>
                    <p className="mx-auto text-justify max-w-4xl mt-8">
                        A Umini Engenharia Elétrica é um escritório especializado na <span className="font-bold">elaboração, aprovação e homologação de
                            projetos elétricos e fotovoltaicos</span> em todo o Brasil. Atuamos com precisão técnica, agilidade e total
                        conformidade com as normas vigentes, oferecendo soluções completas para integradores, construtoras,
                        empresas e consumidores que buscam segurança, eficiência e redução de custos.
                    </p>
                </BoxView>
            </section>
        </Section>
    )
}