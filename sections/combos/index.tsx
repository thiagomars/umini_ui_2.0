'use client';

import Section from "@/components/section";
import Button from "@/components/button";
import BoxOpaco from "@/components/BoxOpaco";
import Slider, { Settings } from "react-slick";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useBreakpoint } from "@/hooks/useBreackpoint";

export default function Combos() {
    const width = useBreakpoint();

    const getSlidesToShow = () => {
        if (width === "xl" || width === "2xl") return 4;
        if (width === "lg") return 3;
        if (width === "md" || width == "sm") return 2;
        return 1;
    };

    const settings: Settings = {
        infinite: false,
        slidesToShow: getSlidesToShow(),
        slidesToScroll: 1,
        autoplay: false,
        rtl: false,
        arrows: false,
        centerMode: useIsMobile(),
        initialSlide: !useIsMobile() ? 2 : 1,
        draggable: true,
    };

    return (
        <section id="combos" className="relative pt-8 pb-28">
            <div className="absolute w-full lg:w-5/12 top-0 left-0 h-full bg-primary lg:rounded-br-[60px] -z-10"></div>

            <Section className="px-8 lg:px-20 z-10 py-24">
                <h3 className="text-white lg:text-gray-700 text-5xl lg:text-6xl text-center font-bold">Combos de Projetos Fotovoltaicos</h3>
            </Section>

            <Section>
                <div className="lg:px-10">
                    <Slider {...settings} >
                        <BoxOpaco className="text-gray-800/80 text-xl text-center flex flex-col justify-center items-center gap-10" mainClassName="xl:mx-2 lg:mx-6 md:mx-8 mx-2">
                            <h3 className="text-4xl md:text-3xl xl:text-4xl">PLANO<br /><span className="text-6xl lg:text-5xl xl:text-6xl font-extrabold">KILO</span></h3>

                            <h2 className="w-fit text-nowrap">
                                <span className="text-8xl xl:text-9xl font-black float-left -mt-4">5</span>projetos <br />por mês
                            </h2>

                            <div>
                                <p>5 Relatórios de Geração</p>
                                <p>4 Modelagens 3D</p>
                            </div>

                            <Button className="text-white text-base w-full">SOLICITAR ORÇAMENTO</Button>
                        </BoxOpaco>

                        <BoxOpaco className="text-gray-800/80 text-xl text-center flex flex-col justify-center items-center gap-10" mainClassName="xl:mx-2 lg:mx-6 md:mx-8 mx-2">
                            <h3 className="text-4xl md:text-3xl xl:text-4xl">PLANO<br /><span className="text-6xl lg:text-5xl xl:text-6xl font-extrabold">MEGA</span></h3>

                            <h2 className="w-fit text-nowrap">
                                <span className="text-8xl xl:text-9xl font-black float-left -mt-4">10</span>projetos <br />por mês
                            </h2>

                            <div>
                                <p>10 Relatórios de Geração</p>
                                <p>4 Modelagens 3D</p>
                            </div>

                            <Button className="text-white text-base w-full">SOLICITAR ORÇAMENTO</Button>
                        </BoxOpaco>

                        <BoxOpaco className="text-gray-800/80 text-xl text-center flex flex-col justify-center items-center gap-10" mainClassName="xl:mx-2 lg:mx-6 md:mx-8 mx-2">
                            <h3 className="text-4xl md:text-3xl xl:text-4xl">PLANO<br /><span className="text-6xl lg:text-5xl xl:text-6xl font-extrabold">GIGA</span></h3>

                            <h2 className="w-fit text-nowrap">
                                <span className="text-8xl xl:text-9xl font-black float-left -mt-4">15</span>projetos <br />por mês
                            </h2>

                            <div>
                                <p>15 Relatórios de Geração</p>
                                <p>8 Modelagens 3D</p>
                            </div>

                            <Button className="text-white text-base w-full">SOLICITAR ORÇAMENTO</Button>
                        </BoxOpaco>

                        <BoxOpaco className="text-gray-800/80 text-xl text-center flex flex-col justify-center items-center gap-10" mainClassName="xl:mx-2 lg:mx-6 md:mx-8 mx-2">
                            <h3 className="text-4xl md:text-3xl xl:text-4xl">PLANO<br /><span className="text-6xl lg:text-5xl xl:text-6xl font-extrabold">TERA</span></h3>

                            <h2 className="w-fit text-nowrap">
                                <span className="text-8xl xl:text-9xl font-black float-left -mt-4">20</span>projetos <br />por mês
                            </h2>

                            <div>
                                <p>20 Relatórios de Geração</p>
                                <p>8 Modelagens 3D</p>
                            </div>

                            <Button className="text-white text-base w-full">SOLICITAR ORÇAMENTO</Button>
                        </BoxOpaco>
                    </Slider>
                </div>
            </Section>
        </section>
    )
}