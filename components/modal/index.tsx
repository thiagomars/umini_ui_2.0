'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
    /** Estado de abertura */
    open: boolean
    /** Callback ao fechar */
    onClose: () => void
    /** Título principal — renderizado como Dialog.Title (acessibilidade) */
    titulo: string
    /** Conteúdo extra no header, acima do título (ex.: badge + ícone) */
    headerSlot?: React.ReactNode
    /** Conteúdo da área scrollável */
    children: React.ReactNode
    /** Classe extra aplicada ao Dialog.Content */
    className?: string
}

export default function Modal({ open, onClose, titulo, headerSlot, children, className }: ModalProps) {
    return (
        <Dialog.Root open={open} onOpenChange={(v) => { if (!v) onClose() }}>
            <Dialog.Portal>
                {/* Overlay */}
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

                {/*
                    Estrutura flex-col + max-h:
                    - header: shrink-0 (fixo, não scrolla)
                    - scroll area: flex-1 min-h-0 overflow-y-auto (scrolla)

                    overscroll-contain no scroll area impede o scroll de vazar para a página.
                    Sem zoom animation — interfere no cálculo de scrollHeight.
                */}
                <Dialog.Content
                    className={cn(
                        'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
                        'flex w-[calc(100vw-2rem)] max-w-4xl max-h-[90svh] flex-col',
                        'rounded-3xl border border-gray-200/80 bg-white shadow-2xl shadow-black/10',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out',
                        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                        className
                    )}
                >
                    {/* Glows decorativos */}
                    <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-amber-500/15 blur-[90px]" />
                    <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-amber-600/10 blur-[90px]" />

                    {/* ── HEADER FIXO — não scrolla ── */}
                    <div className="relative z-10 shrink-0 flex items-start justify-between gap-4 border-b border-gray-200 px-5 pb-4 pt-8 sm:px-10">
                        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                            {/* Slot opcional: badge, ícone, categoria */}
                            {headerSlot}

                            <Dialog.Title className="text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
                                {titulo}
                            </Dialog.Title>
                        </div>

                        {/* Botão fechar alinhado ao topo do título */}
                        <Dialog.Close
                            onClick={onClose}
                            className="mt-0.5 shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm transition hover:bg-gray-50 hover:text-gray-700"
                        >
                            <X size={17} />
                            <span className="sr-only">Fechar</span>
                        </Dialog.Close>
                    </div>

                    {/* ── ÁREA SCROLLÁVEL ── */}
                    <div
                        className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 pb-10 pt-4 sm:px-10 sm:pb-12"
                        data-lenis-prevent
                    >
                        {children}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
