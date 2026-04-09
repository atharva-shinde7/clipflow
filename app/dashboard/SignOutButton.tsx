'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="px-5 py-3 rounded-xl border border-white/15 text-white/75 hover:text-white hover:border-white/35 transition-colors"
    >
      Sign out
    </button>
  )
}

