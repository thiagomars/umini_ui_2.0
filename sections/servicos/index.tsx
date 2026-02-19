import Button from "@/components/button";
import Section from "@/components/section";
import DimensionamentoForm from "@/forms/dimensionamento";

export default function Servicos() {

    return (
        <section id="servicos" className="flex items-center py-20 md:py-32 lg:py-44">
            <Section>
                <div className="grid lg:grid-cols-2 lg:gap-2 gap-12 px-8 xl:px-14 text-gray-700 items-center">
                    <div className="space-y-8 sm:px-16 xl:px-24 min-h-3/4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Nossos serviços:</h2>

                        <ul className="list-image-[url(/icon-ul.png)] list-inside space-y-2 lg:space-y-1 md:text-lg">
                            <li>Projetos Fotovoltaicos</li>
                            <li>Projetos de Subestações Elétricas</li>
                            <li>Projetos de Centros de Medição</li>
                            <li>Projetos de SPDA</li>
                            <li>Projetos de Eletrificação de Loteamentos</li>
                            <li>Projetos Elétricos Internos</li>
                            <li>Gestão de Faturas- Mercado Cativo e Mercado Livre</li>
                            <li>Análises Tarifárias</li>
                        </ul>

                        <Button className="text-white">Agendar reunião</Button>
                    </div>

                    <div className="w-full sm:max-w-md lg:max-w-full lg:w-5/6 xl:w-3/4 mx-auto">
                        <DimensionamentoForm />
                    </div>
                </div>
            </Section>
        </section>
    )
}