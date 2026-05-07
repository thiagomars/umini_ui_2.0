import Section from "@/components/section";

export default function PrivacyPolicyPage() {
    return (
        <section className="bg-gray-50 py-20 lg:py-44 min-h-screen">
            <Section className="px-6 lg:px-20">
                <div className="bg-white p-8 md:p-16 rounded-[40px] shadow-sm border border-gray-100">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Política de Privacidade</h1>
                    <p className="text-amber-600 font-semibold mb-2">UMINI LTDA - Versão: 2.0</p>
                    <p className="text-gray-500 italic mb-12">Data de Vigência: 06 de maio de 2026</p>

                    <div className="mb-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-gray-700">
                            <span className="font-bold">Controlador de Dados:</span> UMINI LTDA - ME (CNPJ 53.069.765/0001-44)
                        </p>
                    </div>

                    <div className="space-y-12 text-gray-700 leading-relaxed text-lg">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">1. Definições Importantes</h2>
                            <p>Para que não haja dúvidas:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><span className="font-semibold text-gray-900">Titular:</span> Você, o usuário cadastrado.</li>
                                <li><span className="font-semibold text-gray-900">Dados Pessoais:</span> Qualquer informação que te identifique (Nome, CPF, E-mail).</li>
                                <li><span className="font-semibold text-gray-900">Dados Técnicos:</span> Informações de carga elétrica, plantas e diagramas (tratados com sigilo profissional).</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">2. Coleta de Dados e Base Legal</h2>
                            <p>Não coletamos dados por curiosidade, mas sim sob as seguintes bases legais da LGPD:</p>
                            <div className="space-y-4">
                                <p>
                                    <span className="font-semibold text-gray-900">Execução de Contrato:</span> Coletamos Nome, CPF/CNPJ, E-mail, Telefone e Endereço da Obra para viabilizar projetos e instalações elétricas.
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-900">Legítimo Interesse:</span> Coletamos logs de acesso (IP, navegador, cliques) para segurança e melhoria do sistema.
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-900">Cumprimento de Obrigação Legal:</span> Emissão de notas fiscais e registros de responsabilidade técnica (ART).
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">3. Armazenamento e Transferência Internacional</h2>
                            <p>Seus dados são armazenados em infraestrutura de nuvem da Digital Ocean, com servidores localizados nos Estados Unidos.</p>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-semibold text-gray-900">Segurança da Transferência:</span> Utilizamos protocolos TLS/SSL para criptografia de dados em trânsito.
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-900">Conformidade:</span> O provedor escolhido possui certificações internacionais de segurança (ISO 27001, SOC 2), garantindo proteção equivalente à exigida pela legislação brasileira.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">4. Retenção de Dados</h2>
                            <div className="space-y-4">
                                <p>
                                    <span className="font-semibold text-gray-900">Dados de Conta:</span> Mantidos enquanto sua conta estiver ativa.
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-900">Dados de Projetos:</span> Por questões de garantia técnica e segurança em engenharia, informações de projetos podem ser mantidas por até 5 anos (ou conforme exigência do CREA/normas técnicas), mesmo após o encerramento da conta.
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-900">Logs de Acesso:</span> Mantidos por no mínimo 6 meses, conforme exigido pelo Marco Civil da Internet.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">5. Direitos do Usuário (Art. 18 da LGPD)</h2>
                            <p>Você pode, a qualquer momento, solicitar através do e-mail de suporte:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><span className="font-semibold text-gray-900">Acesso:</span> Saber exatamente quais dados temos seus.</li>
                                <li><span className="font-semibold text-gray-900">Correção:</span> Atualizar informações desatualizadas.</li>
                                <li><span className="font-semibold text-gray-900">Eliminação:</span> Solicitar a exclusão (exceto para dados que somos obrigados a guardar por lei).</li>
                                <li><span className="font-semibold text-gray-900">Portabilidade:</span> Receber seus dados em formato estruturado.</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">6. Segurança da Informação</h2>
                            <p>Implementamos medidas para evitar acessos não autorizados:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Controle de acesso por níveis (o suporte não vê sua senha).</li>
                                <li>Monitoramento ativo contra tentativas de intrusão.</li>
                                <li>Backup regular para evitar perda de dados de projetos críticos.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>
        </section>
    );
}
