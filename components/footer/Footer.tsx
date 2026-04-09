'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import ClipFlowLogo from '@/logo/ClipFlow.jpeg'

// ─── Footer content — fully replaceable ───
const FOOTER = {
  tagline: 'Crafting edits that move people.',
  email: 'clipflow1987@gmail.com',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/clipflow07/' },
  ],
  links: [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
  copyright: `© ${new Date().getFullYear()} ClipFlow. All rights reserved.`,
  location: 'Nashik, India',
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = footerRef.current?.querySelectorAll('.footer-col')
      if (cols) {
        gsap.fromTo(cols,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
          }
        )
      }
    }, footerRef)
    return () => ctx.revert()
  }, [])

  const scrollTo = (href: string) => {
    const target = document.querySelector(href)
    if (target) {
      const y = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <footer ref={footerRef} className="relative border-t border-white/6 pt-16 pb-8 px-6 md:px-10 lg:px-16">
      {/* Top section */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-16">

          {/* Brand col */}
          <div className="footer-col opacity-0 md:col-span-2">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
              <Image
                src={ClipFlowLogo}
                alt="ClipFlow logo"
                className="h-12 w-12 md:h-14 md:w-14 object-cover rounded-full border border-white/15"
              />
            </a>
            <p className="mt-4 text-white/40 text-sm leading-relaxed max-w-xs">
              {FOOTER.tagline}
            </p>
            <a
              href={`mailto:${FOOTER.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-accent/80 hover:text-accent transition-colors duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {FOOTER.email}
            </a>

            {/* Socials */}
            <div className="mt-8 flex gap-5">
              {FOOTER.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/35 inline-flex items-center justify-center transition-all duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="footer-col opacity-0">
            <div className="text-xs font-semibold tracking-[0.2em] text-white/25 uppercase mb-5">Navigate</div>
            <ul className="space-y-3">
              {FOOTER.links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + location */}
          <div className="footer-col opacity-0">
            <div className="text-xs font-semibold tracking-[0.2em] text-white/25 uppercase mb-5">Legal</div>
            <ul className="space-y-3 mb-8">
              {FOOTER.legal.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/45 hover:text-white transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-xs text-white/25">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {FOOTER.location}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/20">{FOOTER.copyright}</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-white/20">Available for new projects</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
