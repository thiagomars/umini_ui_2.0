'use client'

import * as Dialog from '@radix-ui/react-dialog'
import {
    X, Sun, FileText, Zap, Shield, CheckCircle2, ChevronRight,
    AlertTriangle, Star, BookOpen, ArrowRight, Phone
} from 'lucide-react'
import Button from '@/components/button'

interface ModalFotovoltaicoProps {
    open: boolean
    onClose: () => void
}

const deliverables = [
    { icon: FileText, label: 'Diagrama unifilar' },
    { icon: FileText, label: 'Memorial descritivo' },
    { icon: FileText, label: 'ART' },
    { icon: Zap, label: 'Dimensionamento completo' },
    { icon: Shield, label: 'String box e proteção' },
    { icon: CheckCircle2, label: 'Homologação junto à concessionária' },
    { icon: Sun, label: 'Análise de inversores' },
    { icon: Sun, label: 'Layout fotovoltaico' },
    { icon: Shield, label: 'Compatibilização normativa' },
    { icon: FileText, label: 'Lista de materiais' },
]

const technicalHighlights = [
    'Proteções CA e CC corretamente dimensionadas',
    'Compatibilização com padrão da concessionária',
    'Verificação de queda de tensão',
    'Análise de geração',
    'Distribuição otimizada das strings',
]

const timelineSteps = [
    'Recebimento das informações',
    'Análise técnica',
    'Desenvolvimento do projeto',
    'Revisão de engenharia',
    'Emissão de ART',
    'Homologação',
    'Entrega final',
]

const problems = [
    'Reprovação na concessionária',
    'Sobredimensionamento de cabos',
    'Proteções incorretas',
    'Erros de string',
    'Problemas de aterramento',
    'Queda excessiva de tensão',
    'Incompatibilidade normativa',
]

const differentials = [
    'Engenharia especializada',
    'Atendimento técnico rápido',
    'Compatibilização completa',
    'Experiência em concessionárias',
    'Projetos organizados e padronizados',
    'Suporte pós-entrega',
    'Comunicação clara com integradores',
]

const norms = ['NBR 16690', 'NBR 5410', 'NR10', 'Padrões da concessionária', 'Requisitos de homologação']

export default function ModalFotovoltaico({ open, onClose }: ModalFotovoltaicoProps) {
    return (
        <Dialog.Root open={open} onOpenChange={(v) => { if (!v) onClose() }}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

                <Dialog.Content
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
                    aria-describedby="modal-fotovoltaico-desc"
                >
                    <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-gray-200/80 bg-gray-50/95 shadow-2xl shadow-amber-500/10 backdrop-blur-3xl">

                        {/* Glow de fundo */}
                        <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-amber-500/20 blur-[80px]" />
                        <div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-amber-600/10 blur-[80px]" />

                        {/* Botão fechar */}
                        <Dialog.Close
                            onClick={onClose}
                            className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white/80 text-gray-500 shadow-sm transition hover:bg-white hover:text-gray-800"
                        >
                            <X size={18} />
                            <span className="sr-only">Fechar</span>
                        </Dialog.Close>

                        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 flex flex-col gap-14">

                            {/* ── HERO ── */}
                            <section className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600">
                                        <Sun size={22} />
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
                                        Serviço de Engenharia
                                    </span>
                                </div>

                                <Dialog.Title className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900">
                                    Projetos fotovoltaicos completos para homologação segura e instalação eficiente.
                                </Dialog.Title>

                                <Dialog.Description id="modal-fotovoltaico-desc" className="text-base text-gray-600 leading-relaxed max-w-2xl">
                                    Dimensionamento, proteção, documentação e compatibilização técnica com foco em aprovação rápida e máxima confiabilidade.
                                </Dialog.Description>

                                {/* Linha decorativa */}
                                <div className="mt-2 h-px w-24 rounded-full bg-amber-500/60" />
                            </section>

                            {/* ── O QUE ENTREGAMOS ── */}
                            <section>
                                <SectionHeader icon={CheckCircle2} title="O que entregamos" />
                                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                    {deliverables.map(({ icon: Icon, label }) => (
                                        <div
                                            key={label}
                                            className="flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white/70 p-4 text-center shadow-sm hover:border-amber-200 hover:shadow-amber-100/60 transition-all"
                                        >
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                                                <Icon size={16} />
                                            </div>
                                            <span className="text-xs font-medium leading-snug text-gray-700">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* ── SESSÃO TÉCNICA VISUAL ── */}
                            <section>
                                <SectionHeader icon={Zap} title="Destaque técnico" />
                                <div className="mt-5 grid md:grid-cols-2 gap-5 items-start">
                                    {/* Bloco visual esquerdo */}
                                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-[#263e54] to-[#1a2e40] p-6 flex flex-col gap-3 shadow-lg min-h-[200px]">
                                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-500/20 blur-3xl" />
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-1.5 w-6 rounded-full bg-amber-500" />
                                            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Engenharia Solar</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 flex-1">
                                            {['Geração (kWh/mês)', 'Irradiação solar', 'Eficiência do sistema', 'Índice de aprovação'].map((label, i) => (
                                                <div key={label} className="rounded-xl bg-white/5 border border-white/10 px-3 py-3">
                                                    <div className="text-[10px] text-gray-400 mb-1">{label}</div>
                                                    <div className="text-sm font-bold text-white">
                                                        {['— kWh', '— kWh/m²', '— %', '≥ 95%'][i]}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-2 text-[10px] text-gray-500">Dados calculados por projeto</div>
                                    </div>

                                    {/* Bullet técnicos direita */}
                                    <div className="flex flex-col gap-3">
                                        {technicalHighlights.map((item) => (
                                            <div key={item} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white/60 px-4 py-3 shadow-sm">
                                                <ChevronRight size={16} className="mt-0.5 shrink-0 text-amber-500" />
                                                <span className="text-sm text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* ── COMO FUNCIONA (TIMELINE) ── */}
                            <section>
                                <SectionHeader icon={ArrowRight} title="Como funciona" />
                                <div className="mt-5 relative flex flex-col gap-0">
                                    {timelineSteps.map((step, i) => (
                                        <div key={step} className="flex items-start gap-4">
                                            {/* Linha vertical */}
                                            <div className="flex flex-col items-center">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-amber-500 bg-amber-50 text-xs font-bold text-amber-600">
                                                    {i + 1}
                                                </div>
                                                {i < timelineSteps.length - 1 && (
                                                    <div className="w-0.5 flex-1 my-1 bg-amber-200 min-h-[24px]" />
                                                )}
                                            </div>
                                            <div className="pb-5 pt-1">
                                                <span className="text-sm font-medium text-gray-800">{step}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* ── PROBLEMAS QUE EVITAMOS ── */}
                            <section>
                                <SectionHeader icon={AlertTriangle} title="Problemas que evitamos" />
                                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {problems.map((p) => (
                                        <div key={p} className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/60 px-4 py-3">
                                            <div className="h-2 w-2 shrink-0 rounded-full bg-red-400" />
                                            <span className="text-sm text-gray-700">{p}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* ── DIFERENCIAIS ── */}
                            <section>
                                <SectionHeader icon={Star} title="Diferenciais Umini" />
                                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {differentials.map((d) => (
                                        <div key={d} className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3">
                                            <CheckCircle2 size={15} className="shrink-0 text-amber-600" />
                                            <span className="text-sm font-medium text-gray-800">{d}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* ── NORMAS ── */}
                            <section>
                                <SectionHeader icon={BookOpen} title="Normas e referências" />
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {norms.map((n) => (
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
                            <section className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 px-8 py-8">
                                <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-amber-400/20 blur-3xl" />
                                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Pronto para um projeto seguro e profissional?
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Transforme sua instalação em um projeto aprovado com agilidade e confiabilidade.
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                                        <Button
                                            className="text-white whitespace-nowrap flex items-center gap-2"
                                            onClick="https://wa.me/5588988377485?text=Ol%C3%A1%2C%20preciso%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20projetos%20fotovoltaicos"
                                        >
                                            <Phone size={15} />
                                            Falar com engenharia
                                        </Button>
                                        <Button
                                            className="text-white whitespace-nowrap"
                                            outline
                                            onClick="https://wa.me/5588988377485?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20projeto%20fotovoltaico"
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

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType, title: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#263e54]/10 text-[#263e54]">
                <Icon size={16} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <div className="flex-1 h-px bg-gray-100" />
        </div>
    )
}
