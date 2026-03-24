'use client'

import BoxOpaco from "@/components/BoxOpaco";
import { useBreakpoint } from "@/hooks/useBreackpoint";
import { useIsMobile } from "@/hooks/useIsMobile";
import Slider, { Settings } from "react-slick";

export default function Comentarios() {

    const width = useBreakpoint();
    const isMobile = useIsMobile();

    const getSlidesToShow = () => {
        if (width === "xl" || width === "2xl") return 2;
        if (width === "lg") return 2;
        if (width === "md" || width == "sm") return 1;
        return 1;
    };

    const settings: Settings = {
        infinite: true,
        className: "slider variable-width",
        variableWidth: false,
        adaptiveHeight: false,
        draggable: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        slidesToShow: getSlidesToShow(),
        slidesToScroll: 1,
        rtl: false,
        arrows: false,
        centerMode: isMobile,
        initialSlide: 2,
    };

    const comments1 = [
        {
            name: "Thiago Marques Sousa",
            location: "★★★★★",
            comment: "Nota 10. Time super competente, super atenciosos, espaço muito acolhedor e serviço de qualidade."
        },
        {
            name: "Alisson Sales",
            location: "★★★★★",
            comment: "Meu projeto ficou perfeitooo! Muito obrigado pelos serviços prestados. Recomendei para todos os amigos e familiares, pois me senti bastante acolhido do atendimento inicial até a entrega do projeto."
        },
        {
            name: "Marcelo Silva",
            location: "★★★★★",
            comment: "Qualidade e integridade são ótimas palavras para definir os trabalhos da UMINI, sou muito satisfeito como cliente."
        },
        {
            name: "Clevia Alves Do Nascimento",
            location: "★★★★★",
            comment: "Uma das melhores empresas de engenharia elétrica da região. Profissionais extremamente capacitados e dedicados."
        },
        {
            name: "Rafaela Bayer",
            location: "★★★★★",
            comment: "Excelência e profissionalismo! Os melhores de Itapipoca e região 👏🏼👏🏼"
        },
        {
            name: "Bruna Marques",
            location: "★★★★★",
            comment: "A melhor de Itapipoca e toda região! Excelentes profissionais!"
        },
    ]

    const comments2 = [
        {
            name: "arthur peixoto",
            location: "★★★★★",
            comment: "Ótimo atendimento, profissionais qualificados!"
        },
        {
            name: "Carlos Victor",
            location: "★★★★★",
            comment: "👏👏👏"
        },
        {
            name: "William Migge",
            location: "★★★★★",
            comment: "Muito bem atendido, equipe atenciosa, recomendo!"
        },
        {
            name: "Daniel Ribeiro",
            location: "★★★★★",
            comment: "Quando o requisito for qualidade, chame a Umini!"
        },
        {
            name: "Saulo Cunha",
            location: "★★★★★",
            comment: "Excelentes profissionais! Atendimento impecável!"
        },
        {
            name: "Heitor Araújo",
            location: "★★★★★",
            comment: "Empresa e engenheiros de confiança!"
        },
    ];

    const CardPersonComment = ({ name, location, comment }: { name: string, location: string, comment: string }) => (
        <div className="max-w-44 md:max-w-80">
            <div className="flex flex-row items-center gap-2 pb-4">
                <div className="size-14 aspect-square rounded-full bg-primary hidden lg:block"></div>
                <div>
                    <p className="font-bold">{name}</p>
                    <p className="text-sm">{location}</p>
                </div>
            </div>

            <p className="lg:line-clamp-3 line-clamp-5">{comment}</p>
        </div>
    )

    return (
        <div>
            <div className="relative w-full h-full">
                <div className="absolute bg-primary rounded-t-4xl h-full w-full md:w-3/5 md:translate-x-1/3"></div>

                <div className="hidden md:block absolute top-0 left-0 h-full w-20 bg-linear-to-r from-white via-white/90 to-transparent z-11"></div>
                <div className="hidden md:block absolute top-0 right-0 h-full w-20 bg-linear-to-l from-white via-white/90 to-transparent z-11"></div>

                <div>
                    <Slider {...settings} infinite={!isMobile} autoplay={!isMobile} speed={isMobile ? 0 : 30000}>
                        {comments1?.map((x, i) => (
                            <div key={i} className="p-2 pt-10">
                                <div className="backdrop-blur-xl rounded-4xl w-full h-full z-10 bg-white/20 p-6 border-2 border-gray-200/40">
                                    <CardPersonComment {...x} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <div className="relative w-full h-full -mt-0.5">
                <div className="absolute bg-primary rounded-b-4xl h-full w-full md:w-3/5 md:translate-x-1/3"></div>

                <div className="hidden md:block absolute top-0 left-0 h-full w-20 bg-linear-to-r from-white via-white/90 to-transparent z-11"></div>
                <div className="hidden md:block absolute top-0 right-0 h-full w-20 bg-linear-to-l from-white via-white/90 to-transparent z-11"></div>

                <div>
                    <Slider {...settings} rtl infinite={!isMobile} autoplay={!isMobile} speed={isMobile ? 0 : 30000}>
                        {comments2?.map((x, i) => (
                            <div key={i} className="p-2 pb-10 pt-4">
                                <div className="backdrop-blur-xl rounded-4xl w-full h-full z-10 bg-white/20 p-6 border-2 border-gray-200/40">
                                    <CardPersonComment {...x} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}