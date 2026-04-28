'use client';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Image from "next/image"
import Button from "../button"
import { useActiveSection } from "@/hooks/useActiveSection"
import { cn } from "@/lib/utils";
import { useSectionExiting } from "@/hooks/useSectionExiting";

export default function Navbar() {

    const activeSection = useActiveSection();
    const exited = useSectionExiting();

    // const darkSections = ['home'];
    // const isDarkTheme = darkSections.includes(activeSection);

    const urlNavigate = window.location.pathname;
    const isBgWhite = (!exited['home'] && activeSection === 'home' && urlNavigate === '/') ||
        (urlNavigate == '/quem-somos' && (!exited['sobre'] || activeSection === 'sobre')) ||
        (urlNavigate == '/quem-somos' && (exited['valores'] && (activeSection == 'cta' || activeSection == 'footer')));

    return (
        <header className="flex flex-row justify-between items-center gap-8 py-8 px-6 lg:px-10 fixed w-full z-20 top-0">

            {isBgWhite && <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-black/80 via-black/80 to-transparent"></div>}

            {isBgWhite
                ? <div className="absolute inset-0 h-[150%] pointer-events-none backdrop-blur-2xl mask-[linear-gradient(to_bottom,black_10%,transparent_100%)]"></div>
                : <div className="absolute inset-0 h-[120%] pointer-events-none backdrop-blur-2xl mask-[linear-gradient(to_bottom,black_50%,transparent_100%)]"></div>}

            <Image
                className="z-10 cursor-pointer"
                priority
                src={isBgWhite ? "/hori_fundo-escuro.png" : "/hori_fundo-claro.png"}
                alt="Umini Logo"
                width={150}
                height={0}
                onClick={() => {
                    if (window.location.pathname?.replace("/", "") != "")
                        window.location.pathname = "/"
                }}
            />

            <div className={cn("z-10", isBgWhite ? "text-white" : "text-gray-800")}>
                <div className="hidden lg:flex flex-col xl:flex-row gap-x-6 gap-y-2 items-end xl:items-center">
                    <ul className="flex justify-end flex-row flex-wrap gap-x-6 gap-y-4 items-center xl:mr-0 mr-1">
                        <li className="cursor-pointer p-1"><a href="/servicos">Serviços</a></li>
                        <li className="cursor-pointer p-1"><a href="/#combos">Planos</a></li>
                        {/* <li className="cursor-pointer p-1"><a href="/certificados">Certificados</a></li> */}
                        <li className="cursor-pointer p-1"><a href="/quem-somos">Quem Somos</a></li>
                        <li className="cursor-pointer p-1"><a href="#footer">Contato</a></li>
                    </ul>

                    <Button onClick={"area-cliente"} className="w-fit text-white">
                        Área do Cliente
                    </Button>

                </div>

                <Sheet>
                    <SheetTrigger className="block lg:hidden">
                        <MenuIcon className="size-full" />
                    </SheetTrigger>

                    <SheetContent side="right" className="bg-gray-100 data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]">
                        <SheetHeader className="justify-center">
                            <Image className="z-10 mt-4 ml-2" priority src="/hori_fundo-claro.png" alt="Umini Logo" width={150} height={0} />
                        </SheetHeader>

                        <SheetDescription className="text-lg h-full">
                            <ul className="divide-y">
                                <li className="cursor-pointer p-4"><a href="/servicos">Serviços</a></li>
                                <li className="cursor-pointer p-4"><a href="/#combos">Planos</a></li>
                                {/* <li className="cursor-pointer p-4"><a href="/certificados">Certificados</a></li> */}
                                <li className="cursor-pointer p-4"><a href="/quem-somos">Quem Somos</a></li>
                                <li className="cursor-pointer p-4"><a href="#footer">Contato</a></li>
                                <div></div>
                            </ul>
                        </SheetDescription>

                        <div className="p-6 w-full flex">
                            <Button onClick={"area-cliente"} className="w-full text-center py-2.5 text-white">
                                Área do Cliente
                            </Button>
                        </div>


                        <SheetFooter className="text-center bg-white text-sm py-4">
                            <p>Todos os direitos reservados</p>
                            <p>© 2024, Todos os direitos reservados.</p>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}