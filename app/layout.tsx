import type { Metadata } from 'next'
import './globals.css'
import LenisProvider from '@/components/providers/LenisProvider'
import AuthSessionProvider from '@/components/providers/AuthSessionProvider'
import Cursor from '@/components/cursor/Cursor'
import ClipFlowLogo from '@/logo/ClipFlow.jpeg'

export const metadata: Metadata = {
  title: 'ClipFlow — Video Editing & Content Creation',
  description: 'Premium video editing and content creation studio. We craft cinematic edits that capture attention and drive results.',
  keywords: ['video editing', 'content creation', 'YouTube editing', 'reels', 'short-form editing'],
  icons: {
    icon: ClipFlowLogo.src,
    shortcut: ClipFlowLogo.src,
    apple: ClipFlowLogo.src,
  },
  openGraph: {
    title: 'ClipFlow — Video Editing & Content Creation',
    description: 'Premium video editing studio. Cinematic cuts, fast delivery.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AuthSessionProvider>
          <LenisProvider>
            <Cursor />
            {children}
          </LenisProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
