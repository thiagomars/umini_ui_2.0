import ScrollCounter from "@/components/contador";
import Section from "@/components/section";
import BoxView from "@/components/boxView";
import Image from "next/image";

export default function NumberSections() {

    return (
        <section id="number">
            <Section className="relative pt-28 lg:pt-2 lg:h-screen flex justify-center items-center px-8">
                <BoxView className="text-4xl md:text-4xl lg:text-5xl max-w-7xl font-bold lg:px-20 drop-shadow-md sticky top-1/3 text-center">
                    Engenharia que une <span className="text-primary -500">precisão técnica, atendimento próximo e impacto real</span>.
                </BoxView>
            </Section>

            <Section className="flex flex-col gap-20 md:px-32 lg:px-28 xl:px-20 2xl:px-28 px-10 py-20">
                <>
                    <div className="p-0 xl:px-2 2xl:px-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-white">
                        <div className="xl:aspect-square w-full p-6 rounded-[40px] bg-gray-50 border-2 border-gray-200 grid grid-rows-3 items-center-safe">
                            <div className="size-14 shadow-md rounded-full">
                                <Image className="z-10" priority src="/fotovoltaicos.png" alt="Umini Logo" width={100} height={100} />
                            </div>
                            <div className="text-5xl mt-4 sm:mt-0 sm:text-6xl font-bold text-gray-700/90">
                                {/* <span className="font-black text-5xl sm:text-7xl">+</span> */}
                                <ScrollCounter incrementar valor={2626} duracao={3000} />
                            </div>
                            <p className="text-xl sm:text-2xl">Projetos fotovoltaicos</p>
                        </div>

                        <div className="xl:aspect-square w-full p-6 rounded-[40px] bg-gray-50 border-2 border-gray-200 grid grid-rows-3 items-center-safe">
                            <div className="rounded-full size-14 shadow-md">
                                <Image className="z-10" priority src="/homologados.png" alt="Umini Logo" width={100} height={100} />
                            </div>
                            <div className="text-5xl mt-4 sm:mt-0 sm:text-6xl font-bold text-gray-700/90">
                                {/* <span className="font-black text-5xl sm:text-7xl">+</span> */}
                                <ScrollCounter incrementar valor={18474} duracao={3000} />
                            </div>
                            <p className="text-xl sm:text-2xl">kW homologados</p>
                        </div>

                        <div className="xl:aspect-square w-full p-6 rounded-[40px] bg-gray-50 border-2 border-gray-200 grid grid-rows-3 items-center-safe">
                            <div className="rounded-full size-14 shadow-md">
                                <Image className="z-10" priority src="/subestacao.png" alt="Umini Logo" width={100} height={100} />
                            </div>
                            <div className="text-5xl mt-4 sm:mt-0 sm:text-6xl font-bold text-gray-700/90">
                                {/* <span className="font-black text-5xl sm:text-7xl">+</span> */}
                                <ScrollCounter incrementar valor={120} duracao={3000} />
                            </div>
                            <p className="text-xl sm:text-2xl">Projetos de Elétricos</p>
                        </div>

                        <div className="lg:col-start-2 xl:col-start-auto xl:aspect-square w-full p-6 rounded-[40px] bg-gray-50 border-2 border-gray-200 grid grid-rows-3 items-center-safe">
                            <div className="rounded-full size-14 shadow-md">
                                <Image className="z-10" priority src="/economia.png" alt="Umini Logo" width={100} height={100} />
                            </div>
                            <div className="text-5xl mt-4 sm:mt-0 sm:text-6xl font-bold text-gray-700/90">
                                {/* <span className="font-black text-5xl sm:text-7xl">+</span> */}
                                <ScrollCounter incrementar valor={280} duracao={3000} />
                                <span className="font-bold">K</span>
                            </div>
                            <p className="text-xl sm:text-2xl">de reais economizados com análises tarifárias</p>
                        </div>
                    </div>
                </>
            </Section>
        </section>
    )
}