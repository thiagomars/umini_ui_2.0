'use client'

import Image from 'next/image'
import { Fragment, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import InputMask from '@mona-health/react-input-mask'

// ─── Combos ──────────────────────────────────────────────────────────────────

const COMBOS = [
    {
        id: 'kilo', name: 'KILO', projects: 5, price: 797, pixDiscount: 717.30, reports: 5, modelings: 4,
        features: ['5 projetos elétricos completos', 'ART inclusa em todos', '5 relatórios de geração', '4 modelagens 3D', 'Arquivos DWG + PDF', 'Suporte técnico'],
    },
    {
        id: 'mega', name: 'MEGA', projects: 10, price: 1497, pixDiscount: 1347.30, reports: 10, modelings: 4, featured: true,
        features: ['10 projetos elétricos completos', 'ART inclusa em todos', '10 relatórios de geração', '4 modelagens 3D', 'Arquivos DWG + PDF', 'Suporte técnico prioritário'],
    },
    {
        id: 'giga', name: 'GIGA', projects: 15, price: 2197, pixDiscount: 1977.30, reports: 15, modelings: 8,
        features: ['15 projetos elétricos completos', 'ART inclusa em todos', '15 relatórios de geração', '8 modelagens 3D', 'Arquivos DWG + PDF', 'Suporte técnico prioritário'],
    },
    {
        id: 'tera', name: 'TERA', projects: 20, price: 2797, pixDiscount: 2517.30, reports: 20, modelings: 8,
        features: ['20 projetos elétricos completos', 'ART inclusa em todos', '20 relatórios de geração', '8 modelagens 3D', 'Arquivos DWG + PDF', 'Gerente de conta dedicado'],
    },
]

type PaymentMethod = 'PIX' | 'BOLETO' | 'CREDIT_CARD'
type Combo = typeof COMBOS[number]
type Step = 'dados' | 'pagamento' | 'cartao' | 'confirmar' | 'resultado'

type PaymentResult =
    | { type: 'pix'; pixPayload: string; pixQrCodeImage: string }
    | { type: 'boleto'; boletoUrl: string }
    | { type: 'card'; status: string }

const brl = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })

const field = 'w-full mt-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition'

const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.22, ease: 'easeOut' as const } },
    exit: (dir: number) => ({ x: dir > 0 ? -30 : 30, opacity: 0, transition: { duration: 0.16, ease: 'easeIn' as const } }),
}

function Check() {
    return (
        <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
    )
}

function RadioDot({ active }: { active: boolean }) {
    return (
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${active ? 'border-primary bg-primary' : 'border-gray-300'}`}>
            {active && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
            )}
        </div>
    )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SolarPackPage() {
    const [combo, setCombo] = useState<Combo>(COMBOS[1])
    const [method, setMethod] = useState<PaymentMethod>('PIX')
    const [installments, setInst] = useState(1)
    const [loading, setLoading] = useState(false)
    const [pixCopied, setPixCopied] = useState(false)
    const [step, setStep] = useState<Step>('dados')
    const [direction, setDirection] = useState(1)
    const [result, setResult] = useState<PaymentResult | null>(null)

    const [form, setForm] = useState({ name: '', email: '', cpf: '', phone: '' })
    const [card, setCard] = useState({ holderName: '', number: '', expiryMonth: '', expiryYear: '', ccv: '' })

    const totalPrice = method === 'PIX' ? combo.pixDiscount : combo.price
    const paymentLabel = method === 'PIX' ? 'PIX à vista' : method === 'BOLETO' ? 'Boleto bancário' : 'Cartão de crédito'

    const stepList: { id: Step; label: string }[] = [
        { id: 'dados', label: 'Dados' },
        { id: 'pagamento', label: 'Pagamento' },
        ...(method === 'CREDIT_CARD' ? [{ id: 'cartao' as Step, label: 'Cartão' }] : []),
        { id: 'confirmar', label: 'Confirmar' },
    ]
    const currentStepIndex = stepList.findIndex(s => s.id === step)

    const advance = (to: Step) => { setDirection(1); setStep(to) }
    const retreat = (to: Step) => { setDirection(-1); setStep(to) }

    const validateDados = () => {
        if (!form.name.trim()) { toast.warning('Informe seu nome.'); return false }
        if (!form.email.trim()) { toast.warning('Informe seu e-mail.'); return false }
        if (form.cpf.replace(/\D/g, '').length < 11) { toast.warning('CPF inválido.'); return false }
        if (form.phone.replace(/\D/g, '').length < 10) { toast.warning('Celular inválido.'); return false }
        return true
    }

    const validateCard = () => {
        if (!card.holderName || card.number.replace(/\D/g, '').length < 16 || !card.expiryMonth || !card.expiryYear || !card.ccv) {
            toast.warning('Preencha todos os dados do cartão.')
            return false
        }
        return true
    }

    const handleFinalize = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/asaas/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    paymentMethod: method,
                    installments: method === 'CREDIT_CARD' ? installments : 1,
                    card: method === 'CREDIT_CARD' ? card : undefined,
                    amount: totalPrice,
                    description: `Plano ${combo.name} – ${combo.projects} Projetos Fotovoltaicos`,
                }),
            })
            const data = await res.json()
            if (!res.ok || data.error) { toast.error(data.error ?? 'Erro ao processar pagamento.'); return }
            if (method === 'PIX') setResult({ type: 'pix', pixPayload: data.pixData.payload, pixQrCodeImage: data.pixData.encodedImage })
            else if (method === 'BOLETO') setResult({ type: 'boleto', boletoUrl: data.payment.bankSlipUrl })
            else setResult({ type: 'card', status: data.payment.status })
            advance('resultado')
        } catch {
            toast.error('Erro de conexão. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    const copyPix = async () => {
        if (result?.type === 'pix') {
            await navigator.clipboard.writeText(result.pixPayload)
            setPixCopied(true)
            toast.success('Código copiado!')
            setTimeout(() => setPixCopied(false), 3000)
        }
    }

    return (
        <div className="min-h-screen bg-[#f5f0eb] text-gray-800">

            {/* ── Logo ── */}
            <header className="border-b border-[#e8e0d8] py-4 px-6 flex justify-center bg-[#f5f0eb]">
                <Image src="/hori_fundo-claro.png" alt="Umini" width={110} height={36} priority />
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8">

                {/* ── Título ── */}
                <div className="mb-8">
                    <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">
                        Combos de Projetos Fotovoltaicos
                    </p>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Projetos elétricos completos para seu negócio
                    </h1>
                    <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
                        ART inclusa, aprovação garantida nas distribuidoras e entrega em até 3–5 dias úteis. Escolha o combo ideal para a sua demanda.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

                    {/* ── Coluna esquerda: lista de combos ── */}
                    <div className="lg:col-span-2 space-y-4">
                        {COMBOS.map((c) => {
                            const selected = combo.id === c.id
                            return (
                                <div
                                    key={c.id}
                                    className={`rounded-2xl bg-white p-6 transition-all border-2 ${selected ? 'border-primary' : 'border-transparent shadow-sm'
                                        }`}
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-0.5">
                                                {'featured' in c && c.featured && (
                                                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                                        MAIS VENDIDO
                                                    </span>
                                                )}
                                                <h2 className="text-xl font-bold text-gray-900">{c.name}</h2>
                                            </div>
                                            <p className="text-sm text-gray-500">{c.projects} projetos fotovoltaicos</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-sm text-gray-400 line-through">R$ {brl(c.price)}</p>
                                            <p className="text-3xl font-black text-gray-900 leading-tight">
                                                <span className="text-base font-semibold text-gray-500 mr-0.5">R$</span>
                                                {brl(c.pixDiscount)}
                                            </p>
                                            <p className="text-sm text-primary font-medium mt-0.5">
                                                12x R$ {brl(c.price / 12)} sem juros
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {c.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                <Check />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        type="button"
                                        onClick={() => setCombo(c)}
                                        className={`mt-5 w-full rounded-xl py-3 text-sm font-semibold transition cursor-pointer ${selected
                                            ? 'bg-primary text-white'
                                            : 'border border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                                            }`}
                                    >
                                        {selected ? 'Combo selecionado' : 'Selecionar este combo'}
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    {/* ── Coluna direita: 2 boxes ── */}
                    <div className="lg:col-span-1 lg:sticky lg:top-6 space-y-4">

                        {/* Box 1: Resumo */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="font-bold text-gray-900 text-base mb-1">Resumo</h3>
                            <p className="text-sm text-gray-500 mb-4">{combo.name} — {combo.projects} projetos fotovoltaicos</p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Combo</span>
                                    <span className="font-medium text-gray-800">{combo.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Pagamento</span>
                                    <span className="font-medium text-gray-800">{paymentLabel}</span>
                                </div>
                                {method === 'PIX' && (
                                    <div className="flex justify-between text-primary">
                                        <span>Desconto PIX</span>
                                        <span>-10%</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-baseline border-t border-gray-100 pt-3 mt-1">
                                    <span className="font-semibold text-gray-800">Total</span>
                                    <span className="text-xl font-black text-gray-900">
                                        {method === 'CREDIT_CARD' && installments > 1
                                            ? `${installments}x R$ ${brl(combo.price / installments)}`
                                            : `R$ ${brl(totalPrice)}`}
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                                Próximo passo: nossa equipe entrará em contato em até 24h úteis após o pagamento.
                            </p>
                        </div>

                        {/* Box 2: Stepper */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 overflow-hidden">

                            {/* Indicador de etapas */}
                            {step !== 'resultado' && (
                                <div className="flex items-start mb-6">
                                    {stepList.map((s, i) => (
                                        <Fragment key={s.id}>
                                            <div className="flex flex-col items-center">
                                                <motion.div
                                                    animate={{
                                                        backgroundColor: i <= currentStepIndex ? '#de7e00' : '#f3f4f6',
                                                        color: i <= currentStepIndex ? '#ffffff' : '#9ca3af',
                                                    }}
                                                    transition={{ duration: 0.2 }}
                                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i === currentStepIndex ? 'ring-4 ring-primary/20' : ''
                                                        }`}
                                                >
                                                    {i < currentStepIndex
                                                        ? <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                        : i + 1}
                                                </motion.div>
                                                <span className={`text-[10px] mt-1 font-medium transition-colors ${i <= currentStepIndex ? 'text-primary' : 'text-gray-400'}`}>
                                                    {s.label}
                                                </span>
                                            </div>
                                            {i < stepList.length - 1 && (
                                                <motion.div
                                                    animate={{ backgroundColor: i < currentStepIndex ? '#de7e00' : '#e5e7eb' }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-1 h-0.5 mt-3.5 mx-1"
                                                />
                                            )}
                                        </Fragment>
                                    ))}
                                </div>
                            )}

                            {/* Conteúdo animado das etapas */}
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={step}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                >

                                    {/* ── Etapa 1: Dados ── */}
                                    {step === 'dados' && (
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Nome completo</label>
                                                <input
                                                    type="text"
                                                    value={form.name}
                                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                    placeholder="João da Silva"
                                                    className={field}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">E-mail</label>
                                                <input
                                                    type="email"
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                    placeholder="joao@email.com"
                                                    className={field}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">CPF</label>
                                                    <InputMask
                                                        mask="999.999.999-99"
                                                        value={form.cpf}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, cpf: e.target.value })}
                                                        maskPlaceholder={null}
                                                        alwaysShowMask={false}
                                                        className={field}
                                                        placeholder="000.000.000-00"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Celular</label>
                                                    <InputMask
                                                        mask="(99) 9 9999-9999"
                                                        value={form.phone}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, phone: e.target.value })}
                                                        maskPlaceholder={null}
                                                        alwaysShowMask={false}
                                                        className={field}
                                                        placeholder="(88) 9 9999-9999"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => { if (validateDados()) advance('pagamento') }}
                                                className="w-full mt-2 bg-primary hover:bg-[#c97000] text-white font-semibold text-sm py-3.5 rounded-xl transition cursor-pointer"
                                            >
                                                Continuar
                                            </button>
                                        </div>
                                    )}

                                    {/* ── Etapa 2: Pagamento ── */}
                                    {step === 'pagamento' && (
                                        <div className="space-y-3">
                                            {/* PIX */}
                                            <button
                                                type="button"
                                                onClick={() => setMethod('PIX')}
                                                className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 transition cursor-pointer ${method === 'PIX' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                                        </svg>
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-semibold text-gray-800">PIX à vista</p>
                                                        <p className="text-xs text-primary">10% de desconto adicional</p>
                                                    </div>
                                                </div>
                                                <RadioDot active={method === 'PIX'} />
                                            </button>

                                            {/* Cartão */}
                                            <button
                                                type="button"
                                                onClick={() => setMethod('CREDIT_CARD')}
                                                className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 transition cursor-pointer ${method === 'CREDIT_CARD' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                        </svg>
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-semibold text-gray-800">Cartão de crédito</p>
                                                        <p className="text-xs text-gray-400">Até 12x sem juros</p>
                                                    </div>
                                                </div>
                                                <RadioDot active={method === 'CREDIT_CARD'} />
                                            </button>

                                            {/* Boleto */}
                                            <button
                                                type="button"
                                                onClick={() => setMethod('BOLETO')}
                                                className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 transition cursor-pointer ${method === 'BOLETO' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-semibold text-gray-800">Boleto bancário</p>
                                                        <p className="text-xs text-gray-400">Vencimento em 3 dias úteis</p>
                                                    </div>
                                                </div>
                                                <RadioDot active={method === 'BOLETO'} />
                                            </button>

                                            <div className="flex gap-2 pt-1">
                                                <button
                                                    type="button"
                                                    onClick={() => retreat('dados')}
                                                    className="flex-1 border border-gray-200 text-gray-600 hover:border-gray-300 font-semibold text-sm py-3.5 rounded-xl transition cursor-pointer"
                                                >
                                                    Voltar
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => advance(method === 'CREDIT_CARD' ? 'cartao' : 'confirmar')}
                                                    className="flex-2 bg-primary hover:bg-[#c97000] text-white font-semibold text-sm py-3.5 rounded-xl transition cursor-pointer"
                                                >
                                                    Continuar
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* ── Etapa 3: Dados do cartão ── */}
                                    {step === 'cartao' && (
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Número do cartão</label>
                                                <InputMask
                                                    mask="9999 9999 9999 9999"
                                                    value={card.number}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCard({ ...card, number: e.target.value })}
                                                    maskPlaceholder={null}
                                                    alwaysShowMask={false}
                                                    className={field}
                                                    placeholder="0000 0000 0000 0000"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Nome no cartão</label>
                                                <input
                                                    type="text"
                                                    value={card.holderName}
                                                    onChange={(e) => setCard({ ...card, holderName: e.target.value.toUpperCase() })}
                                                    placeholder="NOME COMO NO CARTÃO"
                                                    className={field}
                                                />
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div>
                                                    <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Mês</label>
                                                    <InputMask mask="99" value={card.expiryMonth} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCard({ ...card, expiryMonth: e.target.value })} maskPlaceholder={null} alwaysShowMask={false} className={field} placeholder="MM" />
                                                </div>
                                                <div>
                                                    <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Ano</label>
                                                    <InputMask mask="9999" value={card.expiryYear} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCard({ ...card, expiryYear: e.target.value })} maskPlaceholder={null} alwaysShowMask={false} className={field} placeholder="AAAA" />
                                                </div>
                                                <div>
                                                    <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">CVV</label>
                                                    <InputMask mask="9999" value={card.ccv} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCard({ ...card, ccv: e.target.value })} maskPlaceholder={null} alwaysShowMask={false} className={field} placeholder="123" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Parcelas</label>
                                                <select value={installments} onChange={(e) => setInst(Number(e.target.value))} className={field}>
                                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                                                        <option key={n} value={n}>
                                                            {n}x de R$ {brl(combo.price / n)}{n > 1 ? ' sem juros' : ''}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex gap-2 pt-1">
                                                <button
                                                    type="button"
                                                    onClick={() => retreat('pagamento')}
                                                    className="flex-1 border border-gray-200 text-gray-600 hover:border-gray-300 font-semibold text-sm py-3.5 rounded-xl transition cursor-pointer"
                                                >
                                                    Voltar
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => { if (validateCard()) advance('confirmar') }}
                                                    className="flex-2 bg-primary hover:bg-[#c97000] text-white font-semibold text-sm py-3.5 rounded-xl transition cursor-pointer"
                                                >
                                                    Continuar
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* ── Etapa 4: Confirmar ── */}
                                    {step === 'confirmar' && (
                                        <div className="space-y-4">
                                            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Combo</span>
                                                    <span className="font-medium">{combo.name} — {combo.projects} projetos</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Pagamento</span>
                                                    <span className="font-medium">{paymentLabel}</span>
                                                </div>
                                                {method === 'PIX' && (
                                                    <div className="flex justify-between text-primary">
                                                        <span>Desconto PIX</span>
                                                        <span>-10%</span>
                                                    </div>
                                                )}
                                                {method === 'CREDIT_CARD' && installments > 1 && (
                                                    <div className="flex justify-between text-gray-500">
                                                        <span>Parcelamento</span>
                                                        <span>{installments}x sem juros</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between border-t border-gray-200 pt-2 font-semibold">
                                                    <span>Total</span>
                                                    <span className="text-primary">
                                                        {method === 'CREDIT_CARD' && installments > 1
                                                            ? `${installments}x R$ ${brl(combo.price / installments)}`
                                                            : `R$ ${brl(totalPrice)}`}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => retreat(method === 'CREDIT_CARD' ? 'cartao' : 'pagamento')}
                                                    className="flex-1 border border-gray-200 text-gray-600 hover:border-gray-300 font-semibold text-sm py-3.5 rounded-xl transition cursor-pointer"
                                                >
                                                    Voltar
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleFinalize}
                                                    disabled={loading}
                                                    className="flex-2 bg-primary hover:bg-[#c97000] disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
                                                >
                                                    {loading ? 'Processando...' : (
                                                        <>
                                                            Finalizar pedido
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                            </svg>
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            <p className="text-center text-xs text-gray-400">
                                                Ambiente seguro. Seus dados são usados apenas para emissão do projeto e contato comercial.
                                            </p>
                                        </div>
                                    )}

                                    {/* ── Resultado ── */}
                                    {step === 'resultado' && result && (
                                        <div className="text-center space-y-4">

                                            {result.type === 'pix' && (
                                                <>
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                                                        className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto"
                                                    >
                                                        <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </motion.div>
                                                    <p className="font-bold text-gray-900 text-base">PIX gerado com sucesso!</p>
                                                    {result.pixQrCodeImage && (
                                                        <img src={`data:image/png;base64,${result.pixQrCodeImage}`} alt="QR Code PIX" className="mx-auto w-44 h-44 rounded-xl border border-gray-100" />
                                                    )}
                                                    <p className="text-xs font-mono text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-3 break-all text-left">
                                                        {result.pixPayload}
                                                    </p>
                                                    <button
                                                        onClick={copyPix}
                                                        className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded-xl transition cursor-pointer"
                                                    >
                                                        {pixCopied ? 'Copiado!' : 'Copiar código PIX'}
                                                    </button>
                                                    <p className="text-xs text-gray-400">Nossa equipe entrará em contato em até 24h úteis após o pagamento.</p>
                                                </>
                                            )}

                                            {result.type === 'boleto' && (
                                                <>
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                                                        className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto"
                                                    >
                                                        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </motion.div>
                                                    <p className="font-bold text-gray-900 text-base">Boleto gerado!</p>
                                                    <p className="text-sm text-gray-500">Vencimento em 3 dias úteis.</p>
                                                    <a
                                                        href={result.boletoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-[#1e2d3a] text-white text-sm font-semibold py-3 rounded-xl transition"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                        </svg>
                                                        Visualizar / Baixar boleto
                                                    </a>
                                                    <p className="text-xs text-gray-400">Após a compensação (1–3 dias úteis), nossa equipe entrará em contato.</p>
                                                </>
                                            )}

                                            {result.type === 'card' && (
                                                <>
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                                                        className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto"
                                                    >
                                                        <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </motion.div>
                                                    <p className="font-bold text-gray-900 text-base">
                                                        {['CONFIRMED', 'RECEIVED'].includes(result.status) ? 'Pagamento aprovado!' : 'Pagamento em processamento'}
                                                    </p>
                                                    <p className="text-sm text-gray-500">Nossa equipe entrará em contato em até 24h úteis.</p>
                                                </>
                                            )}

                                        </div>
                                    )}

                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>
                </div>

            </main>

            {/* ── Rodapé ── */}
            <footer className="border-t border-[#e8e0d8] mt-12 py-6 text-center text-xs text-gray-400">
                © 2025 Umini Engenharia — Todos os direitos reservados
            </footer>
        </div>
    )
}
