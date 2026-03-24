import BoxView from "@/components/boxView";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Pilares() {

    return (
        <section id="pilares" className="py-20 px-8 max-w-7xl mx-auto">
            <BoxView delay={500}>
                <div className="bg-primary py-6 px-8 md:p-10 rounded-[50px]">
                    <Accordion
                        type="single"
                        collapsible
                        className="text-white"
                    >
                        <AccordionItem key="accordion_missao" value={"missao"}>
                            <AccordionTrigger className="text-xl md:text-2xl">Missão</AccordionTrigger>
                            <AccordionContent className="">
                                Entregar projetos elétricos com excelência técnica, segurança e conformidade normativa, oferecendo agilidade e suporte humanizado aos integradores e empresas, para que executem suas obras com confiança, economia e alta performance.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem key="accordion_visao" value={"visao"}>
                            <AccordionTrigger className="text-xl md:text-2xl">Visão</AccordionTrigger>
                            <AccordionContent className="">
                                Ser referência nacional em engenharia elétrica aplicada a projetos e gestão energética, reconhecida pela precisão técnica, atendimento humanizado e inovação na entrega de soluções que simplificam processos e potencializam resultados.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem key="accordion_valores" value={"valores"}>
                            <AccordionTrigger className="text-xl md:text-2xl">Valores</AccordionTrigger>
                            <AccordionContent className="">
                                <ul className="pl-6 list-disc">
                                    <li>
                                        <span className="font-medium pr-1.5">Rigor Técnico:</span>
                                        Trabalhamos com total precisão, responsabilidade e aderência às normas.
                                    </li>
                                    <li>
                                        <span className="font-medium pr-1.5">Agilidade e Eficiência:</span>
                                        Processos rápidos, comunicação humanizada e entregas sem burocracia.
                                    </li>
                                    <li>
                                        <span className="font-medium pr-1.5">Transparência:</span>
                                        Relacionamentos baseados em clareza, honestidade e confiança.
                                    </li>
                                    <li>
                                        <span className="font-medium pr-1.5">Inovação Contínua:</span>
                                        Evoluímos métodos, ferramentas e soluções para aumentar desempenho e segurança.
                                    </li>
                                    <li>
                                        <span className="font-medium pr-1.5">Compromisso com o Cliente:</span>
                                        Foco em facilitar a vida do cliente e entregar valor real em cada projeto.
                                    </li>
                                    <li>
                                        <span className="font-medium pr-1.5">Ética e Responsabilidade:</span>
                                        Agimos com integridade em todas as etapas, garantindo segurança e confiabilidade.
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        {/* <AccordionItem key="accordion_equipe" value={"equipe"}>
                            <AccordionTrigger className="text-xl md:text-2xl">Conheça nossa equipe</AccordionTrigger>
                            <AccordionContent className="">
                                aaaa
                            </AccordionContent>
                        </AccordionItem> */}
                    </Accordion>
                </div>
            </BoxView>
        </section>
    )
}