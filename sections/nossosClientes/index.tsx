import BoxView from "@/components/boxView";
import BrazilMap from "@/components/BrazilMap";
import Button from "@/components/button";
import Section from "@/components/section";


export default function NossosClientes() {


    return (
        <section id="nossosClientes">
            <Section>
                <div className="grid lg:grid-cols-2 gap-10 p-8 md:p-20 items-center">
                    <div className="flex flex-col items-center md:items-start gap-8 md:w-5/6">
                        <BoxView>
                            <h1 className="font-bold text-center md:leading-14 md:text-left text-4xl md:text-5xl drop-shadow-md">
                                Nossos clientes estão por todo o <span className="text-primary font-black">BRASIL</span>.
                            </h1>
                        </BoxView>

                        <BoxView delay={400}>
                            <p className="text-justify">
                                Com atuação em todo o Brasil, entregamos projetos de <span className="font-semibold text-gray-800">baixa e média tensão, subestações,
                                    sistemas fotovoltaicos de todos os portes e estudos avançados</span>. Cada entrega é pautada
                                por rigor técnico, clareza e comunicação constante, garantindo uma jornada leve
                                e segura do início ao fim.
                            </p>
                        </BoxView>

                        <BoxView delay={600}>
                            <Button className="w-fit text-white">
                                Sobre a UMINI
                            </Button>
                        </BoxView>
                    </div>

                    <div>
                        <BrazilMap />
                    </div>
                </div>
            </Section>
        </section>
    )
}