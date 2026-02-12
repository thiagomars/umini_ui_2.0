import BoxOpaco from "@/components/BoxOpaco";
import BoxView from "@/components/boxView";
import Section from "@/components/section";
import CadastroForm from "@/forms/cadastro";

export default function CadastroPlataforma() {


    return (
        <section id="cadastroPlataforma" className="h-[120%]">
            <Section className="py-16">
                <div className="px-8 md:px-16 xl:px-28 grid lg:grid-cols-2 gap-8 sm:gap-24 items-center">
                    <div>
                        <BoxView>
                            <h2 className="text-4xl sm:text-5xl font-bold mb-24 sm:mb-14 text-center sm:text-left drop-shadow-md">Faça seu cadastro<br />e tenha acesso a nossa <span className="text-primary -500">plataforma gratuita</span></h2>
                        </BoxView>

                        <BoxView>
                            <div className="space-y-4 w-full lg:w-4/5">
                                <p>Ao se cadastrar, você terá acesso:</p>

                                <div className="flex flex-row gap-2 items-center">
                                    <div className="w-2 bg-primary rounded-full self-stretch"></div>
                                    <p className="w-fit">Realizar orçamentos para diversos projetos e de forma rápida;</p>
                                </div>

                                <div className="flex flex-row gap-2 items-center">
                                    <div className="w-2 bg-primary rounded-full self-stretch"></div>
                                    <p className="w-fit">Acompanhar o andamento das solicitações realizadas;</p>
                                </div>

                                <div className="flex flex-row gap-2 items-center">
                                    <div className="w-2 bg-primary rounded-full self-stretch"></div>
                                    <p className="w-fit">Atendimento realizado diretamente com nossa equipe em horário comercial;</p>
                                </div>

                                <div className="flex flex-row gap-2 items-center">
                                    <div className="w-2 bg-primary rounded-full self-stretch"></div>
                                    <p className="w-fit">Promoções e descontos exclusivos;</p>
                                </div>

                                <p className="hidden sm:block text-primary -500 text-sm lg:mt-14">Um de nossos consultores entrará em contato via WhatsApp para dar continuidade ao cadastro.</p>
                            </div>
                        </BoxView>

                    </div>

                    <BoxView>
                        <div className="flex justify-center items-center">
                            <BoxOpaco mainClassName="xl:w-5/6 w-full max-w-lg">
                                <CadastroForm />
                            </BoxOpaco>
                        </div>
                    </BoxView>

                    <p className="sm:hidden block text-primary -500 text-sm text-center">Um de nossos consultores entrará em contato via WhatsApp para dar continuidade ao cadastro.</p>
                </div>
            </Section>
        </section>
    )
}