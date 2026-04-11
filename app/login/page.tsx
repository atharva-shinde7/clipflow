'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import PasswordField from '@/components/auth/PasswordField'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [registered, setRegistered] = useState(false)
  const [passwordReset, setPasswordReset] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setRegistered(params.get('registered') === '1')
    setPasswordReset(params.get('reset') === '1')
  }, [])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') || '')
    const password = String(form.get('password') || '')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen px-6 md:px-10 py-24 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h1 className="font-display text-4xl font-black uppercase tracking-tight">Login</h1>
        <p className="mt-2 text-white/45 text-sm">Sign in to your account.</p>

        {registered ? (
          <p className="mt-4 text-sm text-accent/80">Account created. You can log in now.</p>
        ) : null}
        {passwordReset ? (
          <p className="mt-4 text-sm text-accent/80">Password updated. Sign in with your new password.</p>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-accent/60"
          />
          <div className="space-y-2">
            <PasswordField
              name="password"
              required
              minLength={6}
              autoComplete="current-password"
              placeholder="Password"
            />
            <div className="text-right">
              <Link className="text-xs text-white/50 hover:text-accent transition-colors" href="/forgot-password">
                Forgot password?
              </Link>
            </div>
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl bg-accent text-black font-semibold disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-sm text-white/45">
          New here?{' '}
          <Link className="text-accent hover:text-accent/80" href="/signup">
            Create account
          </Link>
        </p>
      </div>
    </main>
  )
}

