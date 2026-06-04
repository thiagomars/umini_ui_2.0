import { NextRequest, NextResponse } from 'next/server'

const ASAAS_BASE_URL =
    process.env.ASAAS_ENV === 'production'
        ? 'https://api.asaas.com/api/v3'
        : 'https://sandbox.asaas.com/api/v3'

async function asaasGet(path: string) {
    const res = await fetch(`${ASAAS_BASE_URL}${path}`, {
        headers: { 'access_token': process.env.ASAAS_API_KEY ?? '' },
    })
    return res.json()
}

async function asaasPost(path: string, body: object) {
    const res = await fetch(`${ASAAS_BASE_URL}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'access_token': process.env.ASAAS_API_KEY ?? '',
        },
        body: JSON.stringify(body),
    })
    return res.json()
}

export async function POST(req: NextRequest) {
    try {
        const { name, email, cpf, phone, paymentMethod, installments, card, amount, description } =
            await req.json()

        const cpfCnpj = cpf.replace(/\D/g, '')
        const mobilePhone = phone.replace(/\D/g, '')

        // 1. Criar cliente
        const customer = await asaasPost('/customers', { name, email, cpfCnpj, mobilePhone })

        if (customer.errors?.length) {
            return NextResponse.json({ error: customer.errors[0].description }, { status: 400 })
        }

        // 2. Montar payload do pagamento
        const dueDate = new Date()
        dueDate.setDate(dueDate.getDate() + 3)
        const dueDateStr = dueDate.toISOString().split('T')[0]

        const paymentPayload: Record<string, unknown> = {
            customer: customer.id,
            billingType: paymentMethod,
            value: amount,
            dueDate: dueDateStr,
            description: description ?? 'Combo de Projetos Fotovoltaicos - Umini',
        }

        if (paymentMethod === 'CREDIT_CARD' && card) {
            const qty = installments ?? 1
            paymentPayload.installmentCount = qty
            paymentPayload.installmentValue = Number((amount / qty).toFixed(2))
            paymentPayload.creditCard = {
                holderName: card.holderName,
                number: card.number.replace(/\s/g, ''),
                expiryMonth: card.expiryMonth,
                expiryYear: card.expiryYear,
                ccv: card.ccv,
            }
            paymentPayload.creditCardHolderInfo = {
                name,
                email,
                cpfCnpj,
                phone: mobilePhone,
            }
        }

        // 3. Criar pagamento
        const payment = await asaasPost('/payments', paymentPayload)

        if (payment.errors?.length) {
            return NextResponse.json({ error: payment.errors[0].description }, { status: 400 })
        }

        // 4. Para PIX, buscar QR Code
        let pixData = null
        if (paymentMethod === 'PIX') {
            pixData = await asaasGet(`/payments/${payment.id}/pixQrCode`)
        }

        return NextResponse.json({ success: true, payment, pixData })
    } catch (err) {
        console.error('[ASAAS checkout]', err)
        return NextResponse.json({ error: 'Erro interno ao processar pagamento.' }, { status: 500 })
    }
}
