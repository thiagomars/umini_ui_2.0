import Section from "@/components/section";
import Image from "next/image";
import Link from "next/link";


export default function Footer() {

    return (
        <>
            <section id="footer" className="bg-secondary w-full z-10">
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
                            <a href="https://www.instagram.com/uminiengenharia/" target="_blank" rel="noopener noreferrer" className="z-10">
                                <Image
                                    className="object-fill"
                                    priority
                                    src={"/instagram.png"}
                                    alt="Instagram"
                                    width={20}
                                    height={0}
                                />
                            </a>
                            <a href="https://wa.me/5588988377485" target="_blank" rel="noopener noreferrer" className="z-10">
                                <Image
                                    className="object-fill"
                                    priority
                                    src={"/whatsapp.png"}
                                    alt="WhatsApp"
                                    width={20}
                                    height={0}
                                />
                            </a>
                            <a href="https://www.linkedin.com/company/uminiengenharia/" target="_blank" rel="noopener noreferrer" className="z-10">
                                <Image
                                    className="object-fill"
                                    priority
                                    src={"/linkedin.png"}
                                    alt="LinkedIn"
                                    width={20}
                                    height={0}
                                />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col text-white/90 text-center lg:text-left lg:flex-row items-center lg:items-start gap-12 px-4 py-8 lg:p-8 xl:p-16 text-sm">
                        <div className="space-y-12 w-fit">
                            <div className="">
                                <h3 className="font-semibold mb-4 text-white">Nosso escritório</h3>

                                <a
                                    href="https://www.google.com/maps/place/Av.+Jos%C3%A9+do+Patroc%C3%ADnio,+1539+-+Coqueiro,+Itapipoca+-+CE,+62508-048/@-3.494327,-39.577467,17z/data=!4m6!3m5!1s0x7c048d04f0f1115:0xdb4bd3a85a60c3ec!8m2!3d-3.494327!4d-39.577467!16s%2Fg%2F11csc8j32c?entry=ttu&g_ep=EgoyMDI2MDQyNy4wIKXMDSoASAFQAw%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    Av. José do Patrocínio, 1539 - Loja 3 - Coqueiro
                                    <br />
                                    Itapipoca - CE, 62508-048
                                </a>
                            </div>

                            <div className="">
                                <h3 className="font-semibold mb-4 text-white">Contato</h3>

                                <a href="tel:+5588912345678" className="block hover:underline">+55 88 91234-5678</a>

                                <a
                                    href="mailto:uminiadm@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    uminiadm@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="space-y-12 w-fit lg:mx-auto">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-semibold mb-3 text-white">Soluções</h3>

                                <a href="https://wa.me/5588988377485?text=Ol%C3%A1%2C%20preciso%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20planos%20de%20projetos" target="_blank" rel="noopener noreferrer" className="hover:underline w-fit mx-auto lg:mx-0">Solicitar orçamento</a>
                                <Link href="/#servicos" className="hover:underline w-fit mx-auto lg:mx-0">Dimensionamento rápido</Link>
                            </div>

                            <div className="flex flex-col gap-1">
                                <h3 className="font-semibold mb-3 text-white">Mapa do site</h3>

                                <Link href="/" className="hover:underline w-fit mx-auto lg:mx-0">Início</Link>
                                <Link href="/servicos" className="hover:underline w-fit mx-auto lg:mx-0">Nossos serviços</Link>
                                <Link href="/#" className="hover:underline w-fit mx-auto lg:mx-0">Certificados</Link>
                                <Link href="/#" className="hover:underline w-fit mx-auto lg:mx-0">Blog/Notícias</Link>
                                <Link href="/#combos" className="hover:underline w-fit mx-auto lg:mx-0">Combos de Projetos</Link>
                                <Link href="/quem-somos" className="hover:underline w-fit mx-auto lg:mx-0">Sobre nós</Link>
                                <Link href="/area-cliente" className="hover:underline w-fit mx-auto lg:mx-0">Área do cliente</Link>
                            </div>
                        </div>

                        <div className="space-y-12 w-fit lg:ml-auto">
                            <div className=" lg:text-right flex flex-col gap-1">
                                <h3 className="font-semibold mb-4 text-white">Informações</h3>

                                <Link href="/termos-e-condicoes" className="hover:underline">Termos e condições</Link>
                                <Link href="/politica-de-privacidade" className="hover:underline">Política de privacidade</Link>
                            </div>
                        </div>
                    </div>
                </Section>


                <div className="text-secondary text-sm px-4 py-2 bg-white flex flex-col gap-1 justify-between items-center text-center">
                    <p>Copyright © 2025 / Todos os direitos reservados.</p>
                    <p>Desenvolvido por MarteSoftware</p>
                </div>
            </section >

        </>
    )
}