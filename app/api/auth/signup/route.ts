import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const signupSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  email: z.string().email(),
  password: z.string().min(6).max(128),
})

async function generateUniqueUserId() {
  while (true) {
    const random = Math.floor(100000 + Math.random() * 900000)
    const userId = `CF-${random}`
    const exists = await prisma.user.findUnique({ where: { userId } })
    if (!exists) return userId
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = signupSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const { name, email, password } = parsed.data
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
    }

    const passwordHash = await hash(password, 10)
    const userId = await generateUniqueUserId()
    await prisma.user.create({
      data: { name, email, passwordHash, userId },
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 })
  }
}

