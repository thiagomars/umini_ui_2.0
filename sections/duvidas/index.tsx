import BoxView from "@/components/boxView";
import Button from "@/components/button";
import Section from "@/components/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Duvidas() {

    const dados = [
        {
            titulo: 'Por que centralizar meus projetos com a Umini?',
            descricao: `Não somos apenas desenhistas de projetos, somos o seu departamento de engenharia externo. Diferente de autônomos, oferecemos uma Plataforma de Gestão Exclusiva onde você centraliza documentos e acompanha o status em tempo real. Além disso, oferecemos todo o suporte técnico pré-venda, com modelagens 3D e análises tarifárias, além do suporte técnico pós-vendas, com alteração de lista de rateios, trocas de titularidade e demais demandas comerciais* <br/><br/><i>*A depender da concessionária</i>`
        },
        {
            titulo: 'Quais são os prazos de entrega dos projetos?',
            descricao: `Prezamos pela qualidade técnica para evitar reprovas. Nossos prazos padrão para protocolo são: </br>
            
            <b>Microgeração (Residencial/Pequeno Comércio)</b>: Até 5 dias úteis após o recebimento completo da documentação.</br>
            <b>Minigeração (Grandes Usinas/Comercial)</b>: Até 10 dias úteis, devido à complexidade da análise e dimensionamento.</br>`
        },
        {
            titulo: 'Existem condições especiais para integradores recorrentes?',
            descricao: `Sim! Valorizamos a parceria de longo prazo. Temos a Tabela de Parceiro Umini, que oferece descontos progressivos baseados no seu volume mensal de obras:
            <br/> <div style="margin:5px"></div>
            - 5 a 9 projetos/mês: 5% OFF
            <br/>
            - 10 a 14 projetos/mês: 10% OFF
            <br/>
            - 15 a 19 projetos/mês: 15% OFF
            <br/>
            - Acima de 20 projetos/mês: 20% OFF`
        },
        {
            titulo: 'Vocês atendem em quais estados/concessionárias?',
            descricao: `Atuamos em todo o território nacional. Nossa equipe de engenharia está atualizada com as normas técnicas e particularidades de todas as concessionárias de energia do Brasil, garantindo que seu projeto seja aprovado independente da localização da obra.`
        },
        {
            titulo: 'A plataforma de gestão tem custo adicional?',
            descricao: `Não. O acesso à Plataforma Umini é uma ferramenta gratuita para todos os nossos clientes. Desenvolvemos o sistema para acabar com a desorganização de arquivos no WhatsApp e garantir que você tenha o histórico completo de todas as suas homologações em um só lugar.`
        },
        {
            titulo: 'E se houver alguma exigência ou reprova da concessionária?',
            descricao: `Nossa taxa de aprovação é altíssima devido à nossa pré-análise. Porém, caso ocorra alguma nota técnica por parte da concessionária referente ao projeto enviado, nossa equipe realiza as correções e o re-protocolo imediatamente, garantindo a aprovação final da sua obra.`
        },
    ]

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
                    defaultValue="question_3"
                    className="text-white lg:text-gray-600"
                >
                    {dados?.map((value, index) => (
                        <AccordionItem value={"question_" + index}>
                            <AccordionTrigger>{value.titulo}</AccordionTrigger>
                            <AccordionContent>
                                <div className="text-justify" dangerouslySetInnerHTML={{ __html: value.descricao }}></div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Section>
        </section >
    )
}