import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SignOutButton from './SignOutButton'
import ProfileSection from './ProfileSection'
import ClipFlowLogo from '@/logo/ClipFlow.jpeg'
import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { userId: true, phone: true },
  })
  if (!dbUser) redirect('/login')

  return (
    <main className="min-h-screen px-6 md:px-10 py-24">
      <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <Link href="/" className="inline-flex items-center">
          <Image
            src={ClipFlowLogo}
            alt="ClipFlow logo"
            className="h-12 w-12 object-cover rounded-full border border-white/15"
            priority
          />
        </Link>

        <h1 className="font-display text-4xl font-black uppercase tracking-tight">Dashboard</h1>
        <p className="mt-3 text-white/45">
          You are signed in as <span className="text-white/80">{session.user.email}</span>
        </p>

        <ProfileSection userId={dbUser.userId ?? `CF-${session.user.id.slice(0, 6).toUpperCase()}`} initialPhone={dbUser.phone ?? ''} />

        <div className="mt-6">
          <SignOutButton />
        </div>
      </div>
    </main>
  )
}

