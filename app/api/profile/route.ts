import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const phoneSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(7)
    .max(20)
    .regex(/^[0-9+\-\s()]+$/),
})

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = phoneSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
    }

    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: { phone: parsed.data.phone },
      select: { phone: true, userId: true },
    })

    return NextResponse.json({ ok: true, profile: updated })
  } catch {
    return NextResponse.json({ error: 'Could not update profile' }, { status: 500 })
  }
}

