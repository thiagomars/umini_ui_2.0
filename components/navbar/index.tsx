'use client';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Image from "next/image"
import Button from "../button"
import { useActiveSection } from "@/hooks/useActiveSection"
import { cn } from "@/lib/utils";
import { useSectionExiting } from "@/hooks/useSectionExiting";

export default function Navbar() {

    // const activeSection = useActiveSection();
    const exited = useSectionExiting();

    // const darkSections = ['home'];
    // const isDarkTheme = darkSections.includes(activeSection);
    const isWhiteTheme = !exited['home'];

    return (
        <header className="flex flex-row justify-between items-center gap-8 py-8 px-6 lg:px-10 fixed w-full z-20 top-0">

            {isWhiteTheme && <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-black/80 via-black/80 to-transparent"></div>}

            {isWhiteTheme
                ? <div className="absolute inset-0 h-[150%] pointer-events-none backdrop-blur-2xl mask-[linear-gradient(to_bottom,black_10%,transparent_100%)]"></div>
                : <div className="absolute inset-0 h-[120%] pointer-events-none backdrop-blur-2xl mask-[linear-gradient(to_bottom,black_50%,transparent_100%)]"></div>}

            <Image
                className="z-10"
                priority
                src={isWhiteTheme ? "/hori_fundo-escuro.png" : "/hori_fundo-claro.png"}
                alt="Umini Logo"
                width={150}
                height={0}
            />

            <div className={cn("z-10", isWhiteTheme ? "text-white" : "text-gray-800")}>
                <div className="hidden lg:flex flex-col xl:flex-row gap-x-6 gap-y-2 items-end xl:items-center">
                    <ul className="flex justify-end flex-row flex-wrap gap-x-6 gap-y-4 items-center xl:mr-0 mr-1">
                        <li className="cursor-pointer p-1">Serviços</li>
                        <li className="cursor-pointer p-1">Planos</li>
                        <li className="cursor-pointer p-1">Certificados</li>
                        <li className="cursor-pointer p-1">Quem Somos</li>
                        <li className="cursor-pointer p-1">Contato</li>
                    </ul>

                    <Button className="w-fit">
                        Área do Cliente
                    </Button>

                </div>

                <Sheet>
                    <SheetTrigger className="block lg:hidden">
                        <MenuIcon className="size-full" />
                    </SheetTrigger>

                    <SheetContent side="right" className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]">
                        <SheetHeader className="justify-center">
                            <Image className="z-10 mt-4 ml-2" priority src="/hori_fundo-claro.png" alt="Umini Logo" width={150} height={0} />
                        </SheetHeader>

                        <SheetDescription className="text-lg bg-gray-100 h-full">
                            <ul className="divide-y">
                                <li className="cursor-pointer p-4">Serviços</li>
                                <li className="cursor-pointer p-4">Planos</li>
                                <li className="cursor-pointer p-4">Certificados</li>
                                <li className="cursor-pointer p-4">Quem Somos</li>
                                <li className="cursor-pointer p-4">Contato</li>
                                <div className="p-6">
                                    <Button className="w-full mt-2 text-white">
                                        Área do Cliente
                                    </Button>
                                </div>
                            </ul>
                        </SheetDescription>

                        <SheetFooter className="text-center text-sm pb-4">
                            <p>Todos os direitos reservados</p>
                            <p>© 2024, Todos os direitos reservados.</p>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}