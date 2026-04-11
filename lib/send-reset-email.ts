const RESEND_API = 'https://api.resend.com/emails'

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[password reset] RESEND not configured. Reset link:', resetUrl)
    }
    return { sent: false as const, reason: 'missing_config' as const }
  }

  const res = await fetch(RESEND_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: 'Reset your ClipFlow password',
      html: `
        <p>You requested a password reset for your ClipFlow account.</p>
        <p><a href="${resetUrl}">Set a new password</a> (link expires in 1 hour).</p>
        <p>If you did not request this, you can ignore this email.</p>
      `,
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    console.error('[password reset] Resend error:', res.status, text)
    return { sent: false as const, reason: 'send_failed' as const }
  }

  return { sent: true as const }
}
