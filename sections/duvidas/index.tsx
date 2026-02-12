import BoxView from "@/components/boxView";
import Button from "@/components/button";
import Section from "@/components/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


export default function Duvidas() {

    return (
        <section id="duvidas" className="relative md:min-h-screen">
            <div className="absolute lg:w-5/12 w-full -z-10 top-0 left-0 h-full bg-primary mt-1 rounded-t-4xl lg:rounded-none lg:rounded-tr-[60px]"></div>

            <Section className="py-14 lg:py-32 px-8 lg:px-20 grid lg:grid-cols-2 gap-10">
                <div className="flex flex-1 flex-col justify-between z-10 lg:h-[60vh]">
                    <div className="h-full">
                        <h2 className="text-white lg:text-7xl text-5xl text-center lg:text-left font-bold text-wrap lg:w-min lg:leading-20 drop-shadow-md">Algumas dúvidas frequentes:</h2>
                    </div>

                    <Button outline className="mt-auto hidden lg:block w-fit">Ainda possui dúvidas?</Button>
                </div>

                <Accordion
                    type="single"
                    collapsible
                    defaultValue="quais"
                    className="text-white lg:text-gray-600"
                >
                    <AccordionItem value="quais">
                        <AccordionTrigger>Quais serviços nós oferecemos?</AccordionTrigger>
                        <AccordionContent>
                            Trabalhamos com projetos fotovoltaicos, projetos de subestações elétricas, centros de medição, SPDA, eletrificação de loteamentos e projetos elétricos internos. Além disso, também oferecemos gestão de faturas (mercado cativo e livre) e com análises tarifárias. Para saber mais, clique aqui.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="returns">
                        <AccordionTrigger>O que é a Umini?</AccordionTrigger>
                        <AccordionContent>
                            Returns accepted within 30 days. Items must be unused and in original
                            packaging. Refunds processed within 5-7 business days.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="support">
                        <AccordionTrigger>Quanto tempo leva para aprovar um projeto?</AccordionTrigger>
                        <AccordionContent>
                            Reach us via email, live chat, or phone. We respond within 24 hours
                            during business days.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="aaaaa">
                        <AccordionTrigger>Como fazer para entrar em contato com a Umini?</AccordionTrigger>
                        <AccordionContent>
                            Reach us via email, live chat, or phone. We respond within 24 hours
                            during business days. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum mollitia iure, ea autem numquam accusamus hic excepturi eaque eligendi iusto repudiandae, veniam, ab sit porro aperiam. Repellendus similique id explicabo.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="aadsaaaa">
                        <AccordionTrigger>Outra dúvida aqui</AccordionTrigger>
                        <AccordionContent>
                            Reach us via email, live chat, or phone. We respond within 24 hours
                            during business days. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus consequatur natus eligendi, sit sed perferendis optio, voluptatem inventore est quisquam non. Magnam eligendi nihil nulla enim perferendis quam totam harum. Ipsum mollitia iure, ea autem numquam accusamus hic excepturi eaque eligendi iusto repudiandae, veniam, ab sit porro aperiam. Repellendus similique id explicabo.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Section>
        </section>
    )
}