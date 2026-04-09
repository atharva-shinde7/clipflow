'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// ─── Hero content — easy to swap for any brand ───
const HERO = {
  eyebrow: '// BASED IN INDIA — NASHIK',
  headline: ['WE CRAFT', 'EDITS THAT', 'CAPTURE'],
  headlineAccent: 'ATTENTION.',
  subtext:
    'Cinematic video editing and content creation that makes your brand impossible to ignore. Clean cuts, fast delivery, zero compromise.',
  cta: { label: 'View Our Work', href: '#portfolio' },
  secondaryCta: { label: 'Get in Touch', href: '#cta' },
  stats: ['50+ Projects', '2M+ Views', '15+ Clients'],
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const accentRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Master timeline for hero entrance ───
      // Each element slides up from y:40 and fades in, staggered
      const tl = gsap.timeline({ delay: 0.5 })

      // Dot grid fades in first as atmosphere
      tl.fromTo(gridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'power2.out' }
      )

      // Eyebrow text
      tl.fromTo(eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=1.5'
      )

      // Headline lines stagger in from below (each line clips up)
      tl.fromTo(
        [line1Ref.current, line2Ref.current, line3Ref.current, accentRef.current],
        { y: 80, opacity: 0, skewY: 2 },
        {
          y: 0, opacity: 1, skewY: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.12,
        },
        '-=0.3'
      )

      // Subtext
      tl.fromTo(subtextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )

      // CTA buttons
      tl.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )

      // Stats row
      tl.fromTo(statsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )

      // Scroll indicator pulses in last
      tl.fromTo(scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.2'
      )

      // ─── Scroll indicator: continuous bounce animation ───
      const scrollDot = scrollIndicatorRef.current?.querySelector('.scroll-dot')
      if (scrollDot) {
        gsap.to(scrollDot, {
          y: 10,
          duration: 0.8,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToPortfolio = () => {
    const target = document.querySelector('#portfolio')
    if (target) {
      const y = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      {/* ─── Background dot grid ─── */}
      <div ref={gridRef} className="absolute inset-0 dot-grid opacity-0" aria-hidden="true" />

      {/* ─── Gradient orb: ambient glow ─── */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(200,246,93,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="opacity-0 mb-6 md:mb-8 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
          <span className="text-xs md:text-sm font-medium tracking-[0.2em] text-white/40 uppercase">
            {HERO.eyebrow}
          </span>
        </div>

        {/* Headline */}
        <div className="overflow-hidden">
          <div
            ref={line1Ref}
            className="opacity-0 font-display text-[clamp(4rem,12vw,9rem)] font-black leading-[0.9] tracking-tight uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {HERO.headline[0]}
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            ref={line2Ref}
            className="opacity-0 font-display text-[clamp(4rem,12vw,9rem)] font-black leading-[0.9] tracking-tight uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {HERO.headline[1]}
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            ref={line3Ref}
            className="opacity-0 font-display text-[clamp(4rem,12vw,9rem)] font-black leading-[0.9] tracking-tight uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {HERO.headline[2]}
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            ref={accentRef}
            className="opacity-0 font-display text-[clamp(4rem,12vw,9rem)] font-black leading-[0.9] tracking-tight uppercase text-gradient"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {HERO.headlineAccent}
          </div>
        </div>

        {/* Subtext + CTA row */}
        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-8 items-end">
          <p
            ref={subtextRef}
            className="opacity-0 text-base md:text-lg text-white/50 leading-relaxed max-w-md"
          >
            {HERO.subtext}
          </p>

          <div ref={ctaRef} className="opacity-0 flex flex-wrap gap-4">
            <button
              onClick={scrollToPortfolio}
              className="group inline-flex items-center gap-3 px-7 py-4 bg-accent text-black font-semibold text-sm tracking-wide rounded-full hover:scale-[1.03] transition-transform duration-300"
            >
              {HERO.cta.label}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            <a
              href="#cta"
              onClick={(e) => { e.preventDefault(); document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 px-7 py-4 border border-white/15 text-white/80 font-medium text-sm tracking-wide rounded-full hover:border-white/40 hover:text-white transition-all duration-300"
            >
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="opacity-0 mt-12 md:mt-16 flex flex-wrap gap-6 md:gap-10">
          {HERO.stats.map((stat) => (
            <div key={stat} className="flex items-center gap-2">
              <span className="w-1 h-4 bg-accent/60 rounded-full" />
              <span className="text-sm text-white/40 tracking-wide">{stat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Scroll indicator ─── */}
      <div
        ref={scrollIndicatorRef}
        className="opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1">
          <div className="scroll-dot w-1 h-1.5 bg-accent rounded-full" />
        </div>
        <span className="text-[10px] tracking-[0.2em] text-white/25 uppercase">Scroll</span>
      </div>

      {/* ─── Right edge: rotating label ─── */}
      <div className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2">
        <div
          className="text-[10px] tracking-[0.25em] text-white/20 uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Video Editing — Content Creation — 2026
        </div>
      </div>
    </section>
  )
}
