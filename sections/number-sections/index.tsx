import ScrollCounter from "@/components/contador";
import Section from "@/components/section";
import Image from "next/image";

export default function NumberSections() {

    return (
        <section>
            <Section className="flex flex-col gap-20 md:px-32 lg:px-28 xl:p-20 2xl:p-28 px-10 py-20">
                <div className="flex justify-center text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl max-w-7xl font-bold lg:px-20 drop-shadow-md">Engenharia que une <span className="text-amber-500">precisão técnica, atendimento próximo e impacto real</span>.</h1>
                </div>

                <div className="p-0 xl:px-18 2xl:p-0 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <div className="xl:aspect-square w-full p-6 rounded-[40px] bg-gray-50 border-2 border-gray-200 grid grid-rows-3 items-center-safe">
                        <div className="size-14 shadow-md rounded-full">
                            <Image className="z-10" priority src="/fotovoltaicos.png" alt="Umini Logo" width={100} height={100} />
                        </div>
                        <div className="text-4xl sm:text-6xl font-bold text-gray-700/90">
                            <span className="font-black text-5xl sm:text-7xl">+</span>
                            <ScrollCounter incrementar valor={2000} />
                        </div>
                        <p className="text-xl">Projetos fotovoltaicos</p>
                    </div>

                    <div className="xl:aspect-square w-full p-6 rounded-[40px] bg-gray-50 border-2 border-gray-200 grid grid-rows-3 items-center-safe">
                        <div className="rounded-full size-14 shadow-md">
                            <Image className="z-10" priority src="/subestacao.png" alt="Umini Logo" width={100} height={100} />
                        </div>
                        <div className="text-4xl sm:text-6xl font-bold text-gray-700/90">
                            <span className="font-black text-5xl sm:text-7xl">+</span>
                            <ScrollCounter incrementar valor={100} />
                        </div>
                        <p className="text-xl">Projetos de subestação</p>
                    </div>

                    <div className="xl:aspect-square w-full p-6 rounded-[40px] bg-gray-50 border-2 border-gray-200 grid grid-rows-3 items-center-safe">
                        <div className="rounded-full size-14 shadow-md">
                            <Image className="z-10" priority src="/economia.png" alt="Umini Logo" width={100} height={100} />
                        </div>
                        <div className="text-4xl sm:text-6xl font-bold text-gray-700/90">
                            <span className="font-black text-5xl sm:text-7xl">+</span>
                            <ScrollCounter incrementar valor={1} duracao={200} />
                            <span className="font-black">M</span>
                        </div>
                        <p className="text-xl">de reais economizados</p>
                    </div>

                    <div className="lg:col-start-2 xl:col-start-auto xl:aspect-square w-full p-6 rounded-[40px] bg-gray-50 border-2 border-gray-200 grid grid-rows-3 items-center-safe">
                        <div className="rounded-full size-14 shadow-md">
                            <Image className="z-10" priority src="/homologados.png" alt="Umini Logo" width={100} height={100} />
                        </div>
                        <div className="text-4xl sm:text-6xl font-bold text-gray-700/90">
                            <span className="font-black text-5xl sm:text-7xl">+</span>
                            <ScrollCounter incrementar valor={10000} />
                        </div>
                        <p className="text-xl">kW homologados</p>
                    </div>
                </div>
            </Section>
        </section>
    )
}