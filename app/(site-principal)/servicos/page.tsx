'use client'

import BoxOpaco from "@/components/BoxOpaco";
import Button from "@/components/button";
import { TextInput } from "@/components/input";
import Section from "@/components/section";
import ServicoModal, { type ServicoModalData } from "@/components/modais/servico";
import listaServicos from '@/database/servicos.json';
import servicosModal from '@/database/servicos-modal.json';
import { useState, useEffect } from "react";

// Pré-indexa os dados do modal pelo título do card para lookup O(1)
const modalPorTitulo = new Map<string, ServicoModalData>(
    (servicosModal as ServicoModalData[]).map((s) => [s.tituloCard, s])
);

export default function Servicos() {

    const [servico, setServico] = useState('');
    const [servicoDebounced, setServicoDebounced] = useState('');
    const [servicoError, setServicoError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [animatedKeys, setAnimatedKeys] = useState<Set<number>>(new Set());
    const [modalData, setModalData] = useState<ServicoModalData | null>(null);

    const bgStyleBoxes: React.CSSProperties = {
        backgroundColor: "#ffffff",
        opacity: 0.03,
        backgroundImage: "linear-gradient(#898989 1.9px, transparent 1.9px), linear-gradient(to right, #898989 1.9px, #ffffff 1.9px)",
        backgroundSize: "38px 38px"
    }

    useEffect(() => {
        if (servico !== servicoDebounced) setIsLoading(true);

        const timer = setTimeout(() => {
            setServicoDebounced(servico);
            setIsLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [servico]);

    useEffect(() => {
        setAnimatedKeys(new Set());
        const timeouts: ReturnType<typeof setTimeout>[] = [];

        servicosFiltrados.forEach((_, index) => {
            const t = setTimeout(() => {
                setAnimatedKeys(prev => new Set([...prev, index]));
            }, index * 80);
            timeouts.push(t);
        });

        return () => timeouts.forEach(clearTimeout);
    }, [servicoDebounced]);

    function replaceSpecialChars(str: string): string {
        const map: Record<string, string> = {
            '-': ' ',
            'a': 'á|à|ã|â|ä|À|Á|Ã|Â|Ä',
            'e': 'é|è|ê|ë|É|È|Ê|Ë',
            'i': 'í|ì|î|ï|Í|Ì|Î|Ï',
            'o': 'ó|ò|ô|õ|ö|Ó|Ò|Ô|Õ|Ö',
            'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
            'c': 'ç|Ç',
            'n': 'ñ|Ñ'
        };

        for (const pattern in map) {
            str = str.replace(new RegExp(map[pattern], 'g'), pattern);
        }

        return str;
    }

    const servicosFiltrados = listaServicos?.filter(x =>
        replaceSpecialChars(x.titulo).toLowerCase().includes(servicoDebounced.toLowerCase()) ||
        replaceSpecialChars(x.subtitulo).toLowerCase().includes(servicoDebounced.toLowerCase()) ||
        replaceSpecialChars(x.descricao).toLowerCase().includes(servicoDebounced.toLowerCase())
    );

    function handleCardClick(titulo: string) {
        const data = modalPorTitulo.get(titulo);
        if (data) setModalData(data);
    }

    return (
        <section id="servicos" className="py-20">
            <div className="fixed -z-10 top-0 left-0 w-full h-screen" style={bgStyleBoxes} />

            <ServicoModal
                open={modalData !== null}
                onClose={() => setModalData(null)}
                data={modalData}
            />

            <Section className="px-8 lg:px-10">
                <h1 className="text-center text-2xl sm:text-4xl lg:text-6xl font-bold mt-20">
                    Conheça nossos serviços:
                </h1>

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

                    <div className="mt-2 h-0.5 w-full rounded-full overflow-hidden bg-white/10">
                        <div
                            className="h-full bg-white/60 rounded-full"
                            style={{
                                width: isLoading ? '80%' : '0%',
                                opacity: isLoading ? 1 : 0,
                                transition: isLoading
                                    ? 'width 0.35s ease-out, opacity 0.1s'
                                    : 'width 0.2s ease-in, opacity 0.3s 0.1s'
                            }}
                        />
                    </div>
                </form>

                <div className="z-10 grid lg:grid-cols-2 gap-10 py-14 sm:p-10 lg:p-24">
                    {servicosFiltrados.length === 0 && !isLoading ? (
                        <div className="lg:col-span-2 flex justify-center items-center py-20">
                            <span className="text-secondary text-sm">
                                Nenhum serviço encontrado para "<strong>{servicoDebounced}</strong>"
                            </span>
                        </div>
                    ) : (
                        servicosFiltrados.map((servico, index) => {
                            const temModal = modalPorTitulo.has(servico.titulo);

                            return (
                                <div
                                    id={`servico_${index}`}
                                    key={index}
                                    style={{
                                        opacity: animatedKeys.has(index) ? 1 : 0,
                                        transform: animatedKeys.has(index) ? 'translateY(0px)' : 'translateY(16px)',
                                        transition: 'opacity 0.35s ease, transform 0.35s ease',
                                        filter: isLoading ? 'blur(2px)' : 'blur(0px)',
                                    }}
                                    onClick={temModal ? () => handleCardClick(servico.titulo) : undefined}
                                    className={temModal ? 'cursor-pointer group' : undefined}
                                >
                                    <BoxOpaco
                                        className="p-8 flex flex-col gap-2 sm:gap-4"
                                        mainClassName="rounded-[40px]"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <h2 className="text-xl md:text-2xl font-bold">{servico.titulo}</h2>
                                            {temModal && (
                                                <span className="shrink-0 mt-1 rounded-full border border-amber-400/40 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-600 opacity-0 transition-opacity group-hover:opacity-100">
                                                    Ver detalhes
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-semibold leading-6 mb-2">{servico.subtitulo}</h3>
                                        <p className="text-sm md:text-base text-justify sm:text-left">{servico.descricao}</p>

                                        <div onClick={e => e.stopPropagation()}>
                                            <Button
                                                className="text-white w-fit mt-4"
                                                onClick="https://wa.me/5588988377485?text=Ol%C3%A1%2C%20preciso%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20planos%20de%20projetos"
                                            >
                                                Fale conosco
                                            </Button>
                                        </div>
                                    </BoxOpaco>
                                </div>
                            )
                        })
                    )}
                </div>
            </Section>
        </section>
    )
}
