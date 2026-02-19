'use client';

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Parceiros() {
    const settings: Settings = {
        infinite: true,
        slidesToShow: !useIsMobile() ? 5 : 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 0,
        cssEase: "linear",
        rtl: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    return (
        <section id="parceiros" className="py-20 overflow-hidden bg-white">
            <h1 className="w-full text-center my-6 text-2xl">Nossos parceiros:</h1>

            <div className="bg-gray-100 py-10 hidden md:block">
                <Slider {...settings} key="slider_1">
                    {Array.from({ length: 12 }, (_, i) => (
                        <div key={i + 1 + "img1"} className="px-8 outline-none">
                            <div className="relative h-32 w-full">
                                <Image
                                    src={`/parceiros/parceiro_${i + 1}.png`}
                                    alt={`Parceiro ${i + 1}`}
                                    fill
                                    sizes="(max-width: 768px), 25vw"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="bg-gray-100 py-10 md:hidden block space-y-10">
                <Slider {...settings} key="slider_2">
                    {Array.from({ length: 6 }, (_, i) => (
                        <div key={i + 1 + "img2"} className="px-8 outline-none">
                            <div className="relative h-32 w-full">
                                <Image
                                    src={`/parceiros/parceiro_${i + 1}.png`}
                                    alt={`Parceiro ${i + 1}`}
                                    fill
                                    sizes="(max-width: 768px), 25vw"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>

                <Slider {...settings} rtl key="slider_3">
                    {Array.from({ length: 6 }, (_, i) => (
                        <div key={i + 7 + "img3"} className="px-8 outline-none">
                            <div className="relative h-32 w-full">
                                <Image
                                    src={`/parceiros/parceiro_${i + 7}.png`}
                                    alt={`Parceiro ${i + 7}`}
                                    fill
                                    sizes="(max-width: 768px), 25vw"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}