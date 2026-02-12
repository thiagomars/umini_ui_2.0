import Section from "@/components/section";
import Image from "next/image";


export default function Footer() {

    return (
        <>
            <section id="footer" className="bg-secondary w-full">
                <Section>
                    <div className="px-4 lg:px-8 xl:px-16 pt-16 text-sm flex gap-8 flex-col lg:flex-row justify-between items-center">
                        <Image
                            className="z-10"
                            priority
                            src={"/hori_fundo-escuro.png"}
                            alt="Umini Logo"
                            width={150}
                            height={0}
                        />

                        <div className="flex flex-row gap-2.5">
                            <Image
                                className="z-10 object-fill"
                                priority
                                src={"/instagram.png"}
                                alt="Umini Logo"
                                width={20}
                                height={0}
                            />
                            <Image
                                className="z-10 object-fill"
                                priority
                                src={"/whatsapp.png"}
                                alt="Umini Logo"
                                width={20}
                                height={0}
                            />
                            <Image
                                className="z-10 object-fill"
                                priority
                                src={"/linkedin.png"}
                                alt="Umini Logo"
                                width={20}
                                height={0}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col text-center lg:text-left lg:flex-row items-center lg:items-start gap-12 px-4 py-8 lg:p-8 xl:p-16 text-sm">
                        <div className="space-y-12 w-fit">
                            <div className="text-white">
                                <h3 className="font-semibold mb-4">Nosso escritório</h3>

                                <p>Av. José do Patrocínio, 1539 - Loja 3 - Coqueiro</p>
                                <p>Itapipoca - CE, 62508-048</p>
                            </div>

                            <div className="text-white">
                                <h3 className="font-semibold mb-4">Contato</h3>

                                <p>+55 88 91234-5678</p>
                                <p>uminiadm@gmail.com</p>
                            </div>
                        </div>

                        <div className="space-y-12 w-fit lg:mx-auto">
                            <div className="text-white">
                                <h3 className="font-semibold mb-4">Soluções</h3>

                                <p>Solicitar orçamento</p>
                                <p>Dimensionamento rápido</p>
                            </div>

                            <div className="text-white">
                                <h3 className="font-semibold mb-4">Mapa do site</h3>

                                <p>Início</p>
                                <p>Nossos serviços</p>
                                <p>Certificados</p>
                                <p>Blog/Notícias</p>
                                <p>Combos de Projetos</p>
                                <p>Sobre nós</p>
                                <p>Área do cliente</p>
                            </div>
                        </div>

                        <div className="space-y-12 w-fit lg:ml-auto">
                            <div className="text-white lg:text-right">
                                <h3 className="font-semibold mb-4">Informações</h3>

                                <p>Termos e condições</p>
                            </div>
                        </div>
                    </div>
                </Section>


                <div className="text-secondary text-sm px-4 py-2 bg-white flex flex-col gap-1 justify-between items-center text-center">
                    <p>Copyright © 2025 / Todos os direitos reservados.</p>
                    <p>Desenvolvido por MarteSoftware</p>
                </div>
            </section>

        </>
    )
}