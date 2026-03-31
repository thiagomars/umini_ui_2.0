// import Section from "@/components/section";
// import Image from "next/image";


// export default function Modelagem3d() {


//     return (
//         <section id="modelagem3d">
//             <Section>
//                 <div className="px-4 md:px-28 grid grid-cols-1 lg:grid-cols-2 gap-4 pb-28">
//                     <div className="flex flex-col gap-4 lg:row-span-2">
//                         <div className="rounded-[30px] p-8 bg-[#E38405] text-white flex flex-col justify-center md:h-1/3">
//                             <h1 className="text-4xl font-bold mb-4">Modelagem 3D</h1>
//                             <p className="text-sm leading-relaxed text-left">
//                                 Transforme propostas em vendas garantidas. Com nossas modelagens 3D,
//                                 integradores conseguem apresentar ao cliente exatamente como o sistema
//                                 fotovoltaico ficará instalado - incluindo a disposição real das placas
//                                 e todo o estudo de sombreamento.
//                             </p>
//                         </div>

//                         <div className="relative min-h-96 rounded-[30px] group overflow-hidden cursor-pointer">
//                             <div className="absolute inset-0 group-hover:opacity-0 opacity-100 transition-all duration-500 bg-amber-500/40 z-10"></div>
//                             <Image
//                                 src="/project/proje1.jpg"
//                                 alt="Projeto Solar Real"
//                                 fill
//                                 className="object-cover z-0"
//                             />
//                         </div>
//                     </div>

//                     <div className="flex flex-col gap-4 lg:row-span-2">
//                         <div className="relative h-1/2 rounded-[30px] group overflow-hidden cursor-pointer">
//                             <div className="absolute inset-0 group-hover:opacity-0 opacity-100 transition-all duration-500 bg-amber-500/40 z-10"></div>
//                             <Image
//                                 src="/project/proje2.jpg"
//                                 alt="Projeto Solar Real"
//                                 fill
//                                 className="object-cover z-0"
//                             />
//                         </div>

//                         <div className="relative h-1/2 rounded-[30px] group overflow-hidden cursor-pointer">
//                             <div className="absolute inset-0 group-hover:opacity-0 opacity-100 transition-all duration-500 bg-amber-500/40 z-10"></div>
//                             <Image
//                                 src="/project/proje3.jpg"
//                                 alt="Projeto Solar Real"
//                                 fill
//                                 className="object-cover z-0"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </Section>
//         </section>
//     )
// }

"use client";

import Section from "@/components/section";
import Image from "next/image";

interface CardImagemProps {
    imgPrimaria: string;
    imgSecundaria?: string;
    alt: string;
    className?: string;
}

const CardImagem = ({ imgPrimaria, imgSecundaria, alt, className }: CardImagemProps) => {
    return (
        <a
            href={imgSecundaria || imgPrimaria}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative rounded-[30px] group overflow-hidden cursor-pointer block ${className}`}
        >
            <div className="absolute inset-0 bg-amber-500/30 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />

            <Image
                src={imgPrimaria}
                alt={alt}
                fill
                className={`object-cover z-0 ${imgSecundaria ? "group-hover:opacity-0" : ""} transition-opacity duration-500`}
            />

            {imgSecundaria && (
                <Image
                    src={imgSecundaria}
                    alt={`${alt} - detalhe`}
                    fill
                    className="object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
            )}
        </a>
    );
};

interface CardVideoProps {
    thumbnail: string;
    videoUrl: string;
    alt: string;
    className?: string;
}

const CardVideo = ({ thumbnail, videoUrl, alt, className }: CardVideoProps) => {
    return (
        <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative rounded-[30px] group overflow-hidden cursor-pointer block ${className}`}
        >
            <div className="absolute inset-0 bg-amber-500/40 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />

            <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
            </div>

            <Image
                src={thumbnail}
                alt={alt}
                fill
                className="object-cover z-0 transition-transform duration-700 group-hover:scale-105"
            />
        </a>
    );
};

export default function Modelagem3d() {
    return (
        <section id="modelagem3d">
            <Section>
                <div className="px-4 md:px-28 grid grid-cols-1 lg:grid-cols-2 gap-4 pb-28">

                    <div className="flex flex-col gap-4">
                        <div className="rounded-[30px] p-8 bg-[#E38405] text-white flex flex-col justify-center min-h-[200px]">
                            <h1 className="text-4xl font-bold mb-4">Modelagem 3D</h1>
                            <p className="text-sm leading-relaxed">
                                Transforme propostas em vendas garantidas. Com nossas modelagens 3D,
                                integradores conseguem apresentar ao cliente exatamente como o sistema
                                fotovoltaico ficará instalado.
                            </p>
                        </div>

                        <CardImagem
                            imgPrimaria="/project/proje1.jpeg"
                            imgSecundaria="/project/proje2.jpeg"
                            alt="Projeto Solar 1"
                            className="min-h-96"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        {/* Exemplo de Card de Vídeo */}
                        <CardVideo
                            thumbnail="/project/proje2.jpg"
                            videoUrl="https://youtube.com/seu-video"
                            alt="Vídeo Demonstração"
                            className="h-1/2 min-h-[250px]"
                        />

                        <CardImagem
                            imgPrimaria="/project/proje3.jpeg"
                            imgSecundaria="/project/proje4.jpeg"
                            alt="Projeto Solar 3"
                            className="h-1/2 min-h-[250px]"
                        />
                    </div>

                </div>
            </Section>
        </section>
    );
}