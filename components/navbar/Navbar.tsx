'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import ClipFlowLogo from '@/logo/ClipFlow.jpeg'

// ─── Site navigation content (swap for any brand) ───
const NAV_LINKS = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'FAQ', href: '#faq' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { status } = useSession()
  const isLoggedIn = status === 'authenticated'

  // ─── Scroll detection: add blur/dark background after 60px ───
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ─── Entrance animation: fade + slide down on mount ───
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  // ─── Smooth scroll to section ───
  const scrollTo = (href: string) => {
    const target = document.querySelector(href)
    if (target) {
      const y = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
        style={{ opacity: 0 }} // GSAP sets to 1
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <Image
            src={ClipFlowLogo}
            alt="ClipFlow logo"
            priority
            className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border border-white/15"
          />
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 tracking-wide uppercase"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Auth + CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2.5 rounded-full border border-accent/25 bg-accent/10 text-sm font-semibold text-accent hover:bg-accent/20 transition-all duration-300"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="inline-flex items-center px-4 py-2.5 rounded-full border border-white/15 text-sm font-medium text-white/70 hover:text-white hover:border-white/35 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2.5 rounded-full border border-white/15 text-sm font-medium text-white/70 hover:text-white hover:border-white/35 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center px-4 py-2.5 rounded-full border border-accent/25 bg-accent/10 text-sm font-semibold text-accent hover:bg-accent/20 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
          <a
            href="https://forms.gle/5EeXvFC9WfNCMCsH8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
          >
            Work With Us
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col justify-center items-center gap-8 transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link, i) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="font-display text-5xl font-black tracking-tight text-white/80 hover:text-accent transition-colors duration-200"
            style={{
              fontFamily: 'var(--font-display)',
              transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
              transition: 'all 0.4s ease',
            }}
          >
            {link.label}
          </button>
        ))}

        {isLoggedIn ? (
          <div className="mt-4 flex flex-col items-center gap-4">
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-accent hover:text-accent/80 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="inline-flex items-center px-6 py-3 rounded-full border border-white/20 text-sm font-semibold tracking-wide text-white/80 hover:text-white transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-4">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-white/80 hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center px-6 py-3 rounded-full border border-accent/30 bg-accent/10 text-sm font-semibold tracking-wide text-accent hover:bg-accent/20 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
