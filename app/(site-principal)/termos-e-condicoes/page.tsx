import Section from "@/components/section";

export default function TermsPage() {
    return (
        <section className="bg-gray-50 py-20 lg:py-44 min-h-screen">
            <Section className="px-6 lg:px-20">
                <div className="bg-white p-8 md:p-16 rounded-[40px] shadow-sm border border-gray-100">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Termos e Condições de Uso</h1>
                    <p className="text-amber-600 font-semibold mb-12 italic">UMINI - Última atualização: 06 de maio de 2026.</p>

                    <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
                        <p>
                            Bem-vindo à UMINI. Ao acessar ou utilizar nossa plataforma, você concorda em cumprir e estar vinculado aos seguintes Termos e Condições de Uso.
                        </p>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">1. Identificação da Empresa</h2>
                            <p>
                                A plataforma é de propriedade e operada pela <span className="font-semibold">UMINI LTDA - ME</span>, inscrita no CNPJ sob o nº 53.069.765/0001-44.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">2. Elegibilidade e Cadastro</h2>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-semibold text-gray-900">Idade Mínima:</span> O uso desta plataforma é restrito a pessoas com idade mínima de 18 anos. Ao criar uma conta, você declara possuir plena capacidade civil.
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-900">Responsabilidade da Conta:</span> O usuário é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">3. Descrição dos Serviços</h2>
                            <p>
                                A UMINI oferece um sistema interno para acompanhamento e solicitação de serviços de instalações e projetos elétricos, além de ferramentas técnicas voltadas exclusivamente para a área de engenharia elétrica.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">4. Propriedade Intelectual e Restrições</h2>
                            <div className="space-y-3">
                                <p>
                                    Todo o conteúdo disponível na plataforma (textos, códigos, ferramentas, logotipos e designs) é de propriedade exclusiva da UMINI ou de seus licenciadores.
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-900">Proibição de Reprodução:</span> O usuário não tem permissão para baixar, reproduzir, distribuir ou copiar qualquer conteúdo do site sem autorização prévia por escrito.
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-900">Engenharia Reversa:</span> É terminantemente proibido tentar descompilar, realizar engenharia reversa ou acessar o código-fonte da plataforma e de suas ferramentas.
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-900">Conduta:</span> É proibida a prática de spam, o envio de conteúdo ofensivo ou qualquer uso que comprometa a integridade técnica do sistema.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">5. Planos e Assinaturas</h2>
                            <p>
                                Atualmente, o acesso à plataforma e às suas funcionalidades básicas é realizado de forma gratuita. A UMINI reserva-se o direito de, no futuro, instituir planos pagos, mediante aviso prévio e atualização destes termos.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">6. Disponibilidade do Sistema e Continuidade</h2>
                            <div className="space-y-3">
                                <p>
                                    Embora a UMINI busque manter a plataforma disponível 24 horas por dia, não nos responsabilizamos por interrupções técnicas ou falhas de servidor.
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-900">Garantia de Atendimento:</span> Em caso de indisponibilidade do sistema, a UMINI garante que o processamento de solicitações de serviços e projetos continuará sendo realizado através de canais alternativos, como o e-mail, garantindo que o fluxo de atendimento ao cliente não seja interrompido.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">7. Foro e Legislação Aplicável</h2>
                            <p>
                                Embora a plataforma esteja hospedada em servidores internacionais (EUA), os serviços são destinados a clientes no Brasil. Portanto, estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de Itapipoca/CE para dirimir quaisquer controvérsias.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </section>
    );
}
