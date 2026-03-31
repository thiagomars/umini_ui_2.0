'use client'

import BoxOpaco from "@/components/BoxOpaco";
import Button from "@/components/button";
import { TextInput } from "@/components/input";
import Section from "@/components/section";
import listaServicos from '@/database/servicos.json';
import { useState } from "react";

export default function Servicos() {

    const [servico, setServico] = useState('');
    const [servicoError, setServicoError] = useState(false);

    const bgStyleBoxes: any = {
        backgroundColor: "#ffffff",
        opacity: 0.03,
        backgroundImage: "linear-gradient(#898989 1.9000000000000001px, transparent 1.9000000000000001px), linear-gradient(to right, #898989 1.9000000000000001px, #ffffff 1.900000000000001px)",
        backgroundSize: "38px 38px"
    }

    function replaceSpecialChars(str: string): string {
        const map: { [key: string]: string } = {
            '-': ' ',
            'a': 'á|à|ã|â|ä|À|Á|Ã|Â|Ä',
            'e': 'é|è|ê|ë|É|È|Ê|Ë',
            'i': 'í|ì|î|ï|Í|Ì|Î|Ï',
            'o': 'ó|ò|ô|õ|ö|Ó|Ò|Ô|Õ|Ö',
            'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
            'c': 'ç|Ç',
            'n': 'ñ|Ñ'
        };

        for (var pattern in map) {
            str = str.replace(new RegExp(map[pattern], 'g'), pattern);
        }

        return str;
    }

    return (
        <section id="servicos" className="py-20">
            <div className="fixed -z-10 top-0 left-0 w-full h-screen " style={bgStyleBoxes}></div>

            <Section className="px-8 lg:px-10">
                <h1 className="text-center text-2xl sm:text-4xl lg:text-6xl font-bold mt-20">Conheça nossos serviços:</h1>

                <form className="max-w-lg mx-auto mt-6 sm:mt-10" onSubmit={e => e.preventDefault()}>
                    <TextInput
                        label='Busque pelo serviço desejado:'
                        name='servico'
                        id='servico'
                        onChange={setServico}
                        placeholder="Digite aqui o serviço que você procura..."
                        value={servico}
                        hasError={servicoError}
                        setHasError={setServicoError}
                        textClassName="text-center w-full"
                    />
                </form>

                <div className="z-10 grid lg:grid-cols-2 gap-10 py-14 sm:p-10 lg:p-24">
                    {listaServicos
                        ?.filter(x =>
                            replaceSpecialChars(x.titulo).toLowerCase().includes(servico.toLowerCase()) ||
                            replaceSpecialChars(x.subtitulo).toLowerCase().includes(servico.toLowerCase()) ||
                            replaceSpecialChars(x.descricao).toLowerCase().includes(servico.toLowerCase())
                        )?.map((servico, index) => (
                            <BoxOpaco key={index} className="p-8 flex flex-col gap-2 sm:gap-4" mainClassName="rounded-[40px]">
                                <h2 className="text-xl md:text-2xl font-bold">{servico.titulo}</h2>
                                <h3 className="text-lg font-semibold leading-6 mb-2">{servico.subtitulo}</h3>
                                <p className="text-sm md:text-base text-justify sm:text-left">{servico.descricao}</p>

                                <Button
                                    className="text-white w-fit mt-4"
                                    onClick={"https://wa.me/5588988377485?text=Ol%C3%A1%2C%20preciso%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20planos%20de%20projetos"}
                                >
                                    Fale conosco
                                </Button>
                            </BoxOpaco>
                        ))}
                </div>
            </Section>
        </section>
    )
}