import { randomBytes } from 'crypto'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/send-reset-email'

const bodySchema = z.object({
  email: z.string().email(),
})

const RESET_TTL_MS = 60 * 60 * 1000

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const { email } = parsed.data
    const user = await prisma.user.findUnique({ where: { email } })

    const genericMessage =
      'If an account exists for that email, you will receive reset instructions shortly.'

    if (!user) {
      return NextResponse.json({ ok: true, message: genericMessage })
    }

    const token = randomBytes(32).toString('hex')
    const passwordResetExpires = new Date(Date.now() + RESET_TTL_MS)

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordResetToken: token, passwordResetExpires },
    })

    const baseUrl = process.env.NEXTAUTH_URL?.replace(/\/$/, '')
    if (!baseUrl) {
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordResetToken: null, passwordResetExpires: null },
      })
      return NextResponse.json(
        { error: 'Server is missing NEXTAUTH_URL. Add it to environment variables.' },
        { status: 500 }
      )
    }

    const resetUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`
    const { sent, reason } = await sendPasswordResetEmail(user.email, resetUrl)

    if (!sent && reason === 'missing_config') {
      if (process.env.NODE_ENV === 'production') {
        await prisma.user.update({
          where: { id: user.id },
          data: { passwordResetToken: null, passwordResetExpires: null },
        })
        return NextResponse.json(
          {
            error:
              'Password reset email is not configured. Add RESEND_API_KEY and RESEND_FROM_EMAIL on the server.',
          },
          { status: 503 }
        )
      }
    }

    if (!sent && reason === 'send_failed') {
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordResetToken: null, passwordResetExpires: null },
      })
      return NextResponse.json(
        { error: 'Could not send reset email. Try again later or contact support.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true, message: genericMessage })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
