'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import {
    X, CheckCircle2, ChevronRight, AlertTriangle,
    Star, BookOpen, ArrowRight, Phone
} from 'lucide-react'
import Button from '@/components/button'

export type ServicoModalData = {
    tituloCard: string
    badge: string
    iconImage: string
    heroTitulo: string
    heroSubtitulo: string
    imagemPrincipal: string
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
}

export default function ServicoModal({ open, onClose, data }: ServicoModalProps) {
    if (!data) return null

    const waBase = `https://wa.me/5588988377485?text=${data.whatsappTexto}`

    return (
        <Dialog.Root open={open} onOpenChange={(v) => { if (!v) onClose() }}>
            <Dialog.Portal>
                {/* Overlay */}
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

                <Dialog.Content
                    aria-describedby="servico-modal-desc"
                    className="fixed left-1/2 top-1/2 z-50 flex w-[calc(100vw-2rem)] max-w-4xl max-h-[90svh] flex-col rounded-3xl border border-gray-200/80 bg-white shadow-2xl shadow-black/10 -translate-x-1/2 -translate-y-1/2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                >
                    {/* Glows */}
                    <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-amber-500/15 blur-[90px]" />
                    <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-amber-600/10 blur-[90px]" />

                    {/* Botão fechar — absolute flutuando fora do fluxo de scroll */}
                    <div className="absolute right-0 top-0 z-30 p-4 sm:p-5">
                        <Dialog.Close
                            onClick={onClose}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-400 shadow-sm backdrop-blur-sm transition hover:bg-gray-50 hover:text-gray-700"
                        >
                            <X size={17} />
                            <span className="sr-only">Fechar</span>
                        </Dialog.Close>
                    </div>

                    {/* Conteúdo com área exclusiva de scroll */}
                    <div
                        className="relative z-10 flex-1 min-h-0 overflow-y-auto  rounded-3xl px-5 pb-10 pt-16 sm:px-10 sm:pb-12 sm:pt-16 scrollbar-suave"
                        // style={{ WebkitOverflowScrolling: 'touch' }}
                        data-lenis-prevent
                    >
                        <div className="flex flex-col gap-12">

                            {/* ── HERO ── */}
                            <section className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl">
                                        <Image src={data.iconImage} alt="" fill className="object-contain" />
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
                                        {data.badge}
                                    </span>
                                </div>

                                <Dialog.Title className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl lg:text-4xl">
                                    {data.heroTitulo}
                                </Dialog.Title>

                                <Dialog.Description
                                    id="servico-modal-desc"
                                    className="max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base"
                                >
                                    {data.heroSubtitulo}
                                </Dialog.Description>

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

                            {/* ── SESSÃO TÉCNICA VISUAL ── */}
                            <section>
                                <SectionHeader icon={ChevronRight} title="Destaque técnico" />
                                <div className="mt-5 grid gap-5 md:grid-cols-2">
                                    <div className="relative h-52 overflow-hidden rounded-2xl sm:h-64">
                                        <Image
                                            src={data.imagemPrincipal}
                                            alt={data.tituloCard}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                            <div className="h-1 w-5 rounded-full bg-amber-500" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                                                Umini Engenharia
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2.5">
                                        {data.destaquesTecnicos.map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
                                            >
                                                <ChevronRight size={14} className="mt-0.5 shrink-0 text-amber-500" />
                                                <span className="text-sm text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* ── COMO FUNCIONA (TIMELINE) ── */}
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
                                            className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/70 px-4 py-3"
                                        >
                                            <div className="h-2 w-2 shrink-0 rounded-full bg-red-400" />
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
                                            className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3"
                                        >
                                            <CheckCircle2 size={14} className="shrink-0 text-amber-600" />
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
                                            className="rounded-full border border-[#263e54]/20 bg-[#263e54]/5 px-4 py-1.5 text-xs font-semibold text-[#263e54]"
                                        >
                                            {n}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* ── CTA FINAL ── */}
                            <section className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 px-6 py-8 sm:px-8">
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
                                        <Button
                                            className="whitespace-nowrap text-[#263e54]"
                                            outline
                                            onClick={() => window.open(`https://wa.me/5588988377485?text=Solicitar%20projeto%20-%20${data.whatsappTexto}`, '_blank')}
                                        >
                                            Solicitar projeto
                                        </Button>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#263e54]/10 text-[#263e54]">
                <Icon size={15} />
            </div>
            <h3 className="text-base font-bold text-gray-900 sm:text-lg">{title}</h3>
            <div className="h-px flex-1 bg-gray-100" />
        </div>
    )
}