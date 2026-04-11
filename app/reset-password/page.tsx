'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, Suspense, useState } from 'react'
import PasswordField from '@/components/auth/PasswordField'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!token) {
      setError('Missing reset token. Open the link from your email.')
      return
    }

    const form = new FormData(e.currentTarget)
    const password = String(form.get('password') || '')
    const confirm = String(form.get('confirm') || '')

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    })

    const data = (await res.json().catch(() => ({}))) as { error?: string }

    if (!res.ok) {
      setError(data.error ?? 'Could not reset password')
      setLoading(false)
      return
    }

    router.push('/login?reset=1')
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      {!token ? (
        <p className="text-sm text-red-400">Invalid or missing link. Request a new reset from the login page.</p>
      ) : null}

      <PasswordField
        name="password"
        required
        minLength={6}
        autoComplete="new-password"
        placeholder="New password (min 6 characters)"
      />
      <PasswordField
        name="confirm"
        required
        minLength={6}
        autoComplete="new-password"
        placeholder="Confirm new password"
      />

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <button
        type="submit"
        disabled={loading || !token}
        className="w-full px-4 py-3 rounded-xl bg-accent text-black font-semibold disabled:opacity-60"
      >
        {loading ? 'Updating...' : 'Update password'}
      </button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen px-6 md:px-10 py-24 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h1 className="font-display text-4xl font-black uppercase tracking-tight">New password</h1>
        <p className="mt-2 text-white/45 text-sm">Choose a strong password for your account.</p>

        <Suspense fallback={<p className="mt-6 text-sm text-white/45">Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>

        <p className="mt-4 text-sm text-white/45">
          <Link className="text-accent hover:text-accent/80" href="/login">
            Back to login
          </Link>
        </p>
      </div>
    </main>
  )
}
