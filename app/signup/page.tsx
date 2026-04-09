'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const payload = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      password: String(form.get('password') || ''),
    }

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      setError(data.error ?? 'Could not create account')
      setLoading(false)
      return
    }

    router.push('/login?registered=1')
  }

  return (
    <main className="min-h-screen px-6 md:px-10 py-24 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h1 className="font-display text-4xl font-black uppercase tracking-tight">Sign Up</h1>
        <p className="mt-2 text-white/45 text-sm">Create your account to access the dashboard.</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input
            name="name"
            placeholder="Name"
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-accent/60"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-accent/60"
          />
          <input
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="Password (min 6 chars)"
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-accent/60"
          />

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl bg-accent text-black font-semibold disabled:opacity-60"
          >
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <p className="mt-4 text-sm text-white/45">
          Already have an account?{' '}
          <Link className="text-accent hover:text-accent/80" href="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  )
}

