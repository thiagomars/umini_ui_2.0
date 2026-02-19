import Section from "@/components/section";
import Image from "next/image";


export default function Modelagem3d() {


    return (
        <section id="modelagem3d">
            <Section>
                <div className="px-4 md:px-28 grid grid-cols-1 lg:grid-cols-2 gap-4 pb-28">
                    <div className="flex flex-col gap-4 lg:row-span-2">
                        <div className="rounded-[30px] p-8 bg-[#E38405] text-white flex flex-col justify-center md:h-1/3">
                            <h1 className="text-4xl font-bold mb-4">Modelagem 3D</h1>
                            <p className="text-sm leading-relaxed text-left">
                                Transforme propostas em vendas garantidas. Com nossas modelagens 3D,
                                integradores conseguem apresentar ao cliente exatamente como o sistema
                                fotovoltaico ficará instalado - incluindo a disposição real das placas
                                e todo o estudo de sombreamento.
                            </p>
                        </div>

                        <div className="relative min-h-96 rounded-[30px] group overflow-hidden cursor-pointer">
                            <div className="absolute inset-0 group-hover:opacity-0 opacity-100 transition-all duration-500 bg-amber-500/40 z-10"></div>
                            <Image
                                src="/project/proje1.jpg"
                                alt="Projeto Solar Real"
                                fill
                                className="object-cover z-0"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 lg:row-span-2">
                        <div className="relative h-1/2 rounded-[30px] group overflow-hidden cursor-pointer">
                            <div className="absolute inset-0 group-hover:opacity-0 opacity-100 transition-all duration-500 bg-amber-500/40 z-10"></div>
                            <Image
                                src="/project/proje2.jpg"
                                alt="Projeto Solar Real"
                                fill
                                className="object-cover z-0"
                            />
                        </div>

                        <div className="relative h-1/2 rounded-[30px] group overflow-hidden cursor-pointer">
                            <div className="absolute inset-0 group-hover:opacity-0 opacity-100 transition-all duration-500 bg-amber-500/40 z-10"></div>
                            <Image
                                src="/project/proje3.jpg"
                                alt="Projeto Solar Real"
                                fill
                                className="object-cover z-0"
                            />
                        </div>
                    </div>
                </div>
            </Section>
        </section>
    )
}