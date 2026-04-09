'use client'

import { FormEvent, useState } from 'react'

type Props = {
  userId: string
  initialPhone: string
}

export default function ProfileSection({ userId, initialPhone }: Props) {
  const [phone, setPhone] = useState(initialPhone)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const onSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    })

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      setMessage(data.error ?? 'Failed to update')
      setSaving(false)
      return
    }

    setMessage('Profile updated successfully')
    setSaving(false)
  }

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
      <h2 className="text-xl font-semibold text-white">Profile</h2>
      <p className="mt-1 text-sm text-white/45">Your account details</p>

      <div className="mt-5 grid gap-4">
        <div>
          <label className="block text-xs tracking-wide text-white/40 uppercase mb-2">User ID</label>
          <div className="px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-white/85 font-medium">
            {userId}
          </div>
        </div>

        <form onSubmit={onSave}>
          <label className="block text-xs tracking-wide text-white/40 uppercase mb-2">Phone Number</label>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
              className="flex-1 px-4 py-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-accent/60"
            />
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-3 rounded-xl bg-accent text-black font-semibold disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
          {message ? <p className="mt-2 text-sm text-accent/80">{message}</p> : null}
        </form>
      </div>
    </section>
  )
}

