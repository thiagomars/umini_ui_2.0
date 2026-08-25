'use client'

import Image from 'next/image'
import {
    CheckCircle2, ChevronRight, AlertTriangle,
    Star, BookOpen, ArrowRight, Phone
} from 'lucide-react'
import Modal from '@/components/modal'
import CarouselServico from '@/components/carousel-servico'
import Button from '@/components/button'

export type ServicoModalData = {
    tituloCard: string
    badge: string
    iconImage: string
    heroTitulo: string
    heroSubtitulo: string
    pastaImagens: string
    entregamos: string[]
    destaquesTecnicos: string[]
    etapas: string[]
    problemas: string[]
    diferenciais: string[]
    normas: string[]
    ctaTitulo: string
    ctaTexto: string
    whatsappTexto: string
}

interface ServicoModalProps {
    open: boolean
    onClose: () => void
    data: ServicoModalData | null
    className?: string
}

export default function ServicoModal({ open, onClose, data, className }: ServicoModalProps) {
    if (!data) return null

    const waBase = `https://wa.me/5588988377485?text=${data.whatsappTexto}`

    return (
        <Modal
            open={open}
            onClose={onClose}
            titulo={data.heroTitulo}
            className={className}
            headerSlot={
                <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-lg">
                        <Image src={data.iconImage} alt="" fill className="object-contain" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-600">
                        {data.badge}
                    </span>
                </div>
            }
        >
            <div className="flex flex-col gap-12">

                {/* ── SUBTÍTULO ── */}
                <section className="flex flex-col gap-3">
                    <p className="max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
                        {data.heroSubtitulo}
                    </p>
                    <div className="h-px w-20 rounded-full bg-amber-500/50" />
                </section>

                {/* ── O QUE ENTREGAMOS ── */}
                <section>
                    <SectionHeader icon={CheckCircle2} title="O que entregamos" />
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                        {data.entregamos.map((item) => (
                            <div
                                key={item}
                                className="flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 p-3 text-center transition hover:border-amber-200 hover:bg-amber-50/40"
                            >
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10">
                                    <CheckCircle2 size={14} className="text-amber-600" />
                                </div>
                                <span className="text-xs font-medium leading-snug text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── DESTAQUE TÉCNICO ── */}
                <section>
                    <SectionHeader icon={ChevronRight} title="Destaque técnico" />
                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                        <div className="relative h-52 overflow-hidden rounded-2xl sm:h-64">
                            <CarouselServico pasta={data.pastaImagens} />
                        </div>

                        <div className="flex flex-col gap-2.5">
                            {data.destaquesTecnicos.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3
                                    hover:translate-x-2 transition-transform"
                                >
                                    <ChevronRight size={14} className="mt-0.5 shrink-0 text-amber-500" />
                                    <span className="text-sm text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── COMO FUNCIONA ── */}
                <section>
                    <SectionHeader icon={ArrowRight} title="Como funciona" />
                    <div className="mt-5 flex flex-col">
                        {data.etapas.map((step, i) => (
                            <div key={step} className="flex items-start gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-amber-500 bg-amber-50 text-[11px] font-bold text-amber-600">
                                        {i + 1}
                                    </div>
                                    {i < data.etapas.length - 1 && (
                                        <div className="my-1 w-px flex-1 bg-amber-200" style={{ minHeight: 20 }} />
                                    )}
                                </div>
                                <p className="pb-4 pt-0.5 text-sm font-medium text-gray-800">{step}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── PROBLEMAS QUE EVITAMOS ── */}
                <section>
                    <SectionHeader icon={AlertTriangle} title="Problemas que evitamos" />
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {data.problemas.map((p) => (
                            <div
                                key={p}
                                className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/70 px-4 py-3 hover:scale-101 transition-transform"
                            >
                                <div className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                                <span className="text-sm text-gray-700">{p}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── DIFERENCIAIS ── */}
                <section>
                    <SectionHeader icon={Star} title="Diferenciais Umini" />
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {data.diferenciais.map((d) => (
                            <div
                                key={d}
                                className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 hover:scale-101 transition-transform"
                            >
                                <CheckCircle2 size={14} className="shrink-0 text-emerald-600" />
                                <span className="text-sm font-medium text-gray-800">{d}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── NORMAS ── */}
                <section>
                    <SectionHeader icon={BookOpen} title="Normas e referências" />
                    <div className="mt-4 flex flex-wrap gap-2">
                        {data.normas.map((n) => (
                            <span
                                key={n}
                                className="rounded-full border border-primary-dark/20 bg-primary-dark/5 px-4 py-1.5 text-xs font-semibold text-primary-dark"
                            >
                                {n}
                            </span>
                        ))}
                    </div>
                </section>

                {/* ── CTA FINAL ── */}
                <section className="relative overflow-hidden rounded-2xl border border-amber-200 bg-linear-to-br from-amber-50 to-orange-50 px-6 py-8 sm:px-8">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-amber-400/20 blur-3xl" />
                    <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-1.5">
                            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{data.ctaTitulo}</h3>
                            <p className="text-sm text-gray-600">{data.ctaTexto}</p>
                        </div>
                        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                            <Button
                                className="flex items-center gap-2 whitespace-nowrap text-white"
                                onClick={() => window.open(waBase, '_blank')}
                            >
                                <Phone size={14} />
                                Falar com engenharia
                            </Button>
                        </div>
                    </div>
                </section>

            </div>
        </Modal>
    )
}

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-dark/10 text-primary-dark">
                <Icon size={15} />
            </div>
            <h3 className="text-base font-bold text-gray-900 sm:text-lg">{title}</h3>
            <div className="h-px flex-1 bg-gray-100" />
        </div>
    )
}
