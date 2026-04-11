'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') || '')

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string }

    if (!res.ok) {
      setError(data.error ?? 'Something went wrong')
      setLoading(false)
      return
    }

    setMessage(data.message ?? 'Check your email for next steps.')
    setLoading(false)
  }

  return (
    <main className="min-h-screen px-6 md:px-10 py-24 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h1 className="font-display text-4xl font-black uppercase tracking-tight">Forgot password</h1>
        <p className="mt-2 text-white/45 text-sm">
          Enter your email and we will send you a link to set a new password.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-accent/60"
          />

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          {message ? <p className="text-sm text-accent/90">{message}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl bg-accent text-black font-semibold disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>

        <p className="mt-4 text-sm text-white/45">
          <Link className="text-accent hover:text-accent/80" href="/login">
            Back to login
          </Link>
        </p>
      </div>
    </main>
  )
}
