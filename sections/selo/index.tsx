import BoxView from "@/components/boxView";
import Section from "@/components/section";
import Image from "next/image";


export default function Selo() {

    return (
        <section id="precisao" className="py-20 px-8 space-y-10">
            <Section>
                <BoxView>
                    <h1 className="text-4xl md:text-4xl text-center lg:text-5xl max-w-7xl font-bold lg:px-20 drop-shadow-md mx-auto">
                        Engenharia que une <span className="text-primary -500">precisão técnica, atendimento próximo e impacto real</span>.
                    </h1>
                </BoxView>

                <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-8 p-4 mt-20">
                    <div className="flex flex-col gap-6 text-justify justify-center md:max-w-2/5">
                        <BoxView>
                            <p>
                                Somos um escritório especializado em projetos elétricos e fotovoltaicos, criado com a essência da
                                humanização — a convicção de que a engenharia deve ser compreensível, acessível e conectada às pessoas.
                            </p>
                        </BoxView>

                        <BoxView>
                            <p>
                                Acreditamos que projetos bem-feitos vão muito além de cálculos e normas: eles oferecem segurança,
                                economia e autonomia. Por isso, traduzimos a complexidade da engenharia em soluções simples, eficientes
                                e totalmente alinhadas às necessidades dos nossos clientes.
                            </p>
                        </BoxView>
                    </div>

                    <div className="relative size-full aspect-square mt-10 md:mt-0 md:max-w-[60vw] max-h-[50vh]">
                        <Image
                            src={`/selo_fundo_claro.png`}
                            alt="Descrição"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </Section>
        </section>
    )
}