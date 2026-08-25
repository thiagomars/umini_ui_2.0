import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const IMAGE_EXTENSIONS = /\.(png|jpe?g|webp|gif|svg|avif)$/i

export async function GET(req: NextRequest) {
    const pasta = req.nextUrl.searchParams.get('pasta') ?? ''

    // Previne path traversal
    if (!pasta || pasta.includes('..') || path.isAbsolute(pasta)) {
        return NextResponse.json([])
    }

    const dir = path.join(process.cwd(), 'public', 'servicos', pasta)

    try {
        const files = fs.readdirSync(dir)
        const images = files
            .filter(f => IMAGE_EXTENSIONS.test(f))
            .sort()
        return NextResponse.json(images)
    } catch {
        return NextResponse.json([])
    }
}
