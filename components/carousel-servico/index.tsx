'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselServicoProps {
    /** Nome da subpasta dentro de /public/servicos/ */
    pasta: string
}

export default function CarouselServico({ pasta }: CarouselServicoProps) {
    const [images, setImages] = useState<string[]>([])
    const [current, setCurrent] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!pasta) { setLoading(false); return }

        setLoading(true)
        fetch(`/api/servico-imagens?pasta=${encodeURIComponent(pasta)}`)
            .then(r => r.json())
            .then((imgs: string[]) => {
                setImages(imgs)
                setCurrent(0)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [pasta])

    const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length])
    const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length])

    if (loading) {
        return <div className="w-full h-full animate-pulse rounded-2xl bg-gray-100" />
    }

    // Sem imagens → exibe default.png com o mesmo visual
    if (!images.length) {
        return (
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <Image src="/default.png" alt="" fill className="object-cover" sizes="100vw" />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="h-1 w-5 rounded-full bg-amber-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Umini Engenharia</span>
                </div>
            </div>
        )
    }

    const src = `/servicos/${pasta}/${images[current]}`

    return (
        /* w-full h-full: adapta ao container pai sem forçar dimensões */
        <div className="group relative w-full h-full overflow-hidden rounded-2xl">

            {/* Imagem atual — onError cai para default.png */}
            <Image
                key={src}
                src={src}
                alt={images[current].replace(/\.\w+$/, '')}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={current === 0}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/default.png' }}
            />

            {/* Gradiente inferior */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

            {/* Label Umini */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="h-1 w-5 rounded-full bg-amber-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                    Umini Engenharia
                </span>
            </div>

            {/* Navegação — só aparece com mais de 1 imagem */}
            {images.length > 1 && (
                <>
                    {/* Seta anterior */}
                    <button
                        onClick={prev}
                        aria-label="Imagem anterior"
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/60"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {/* Seta próxima */}
                    <button
                        onClick={next}
                        aria-label="Próxima imagem"
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/60"
                    >
                        <ChevronRight size={16} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                aria-label={`Ir para imagem ${i + 1}`}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === current
                                        ? 'w-4 bg-white'
                                        : 'w-1.5 bg-white/50 hover:bg-white/75'
                                }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
