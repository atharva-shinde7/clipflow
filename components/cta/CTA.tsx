'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── CTA content — swap freely ───
const CTA_CONTENT = {
  eyebrow: '// Ready to Start?',
  headline: ['READY TO', 'ELEVATE YOUR'],
  accentLine: 'CONTENT?',
  description:
    'Stop settling for mediocre edits. Join 15+ brands already growing with ClipFlow.',
  primaryCta: 'Start a Project',
  secondaryCta: 'View FAQ',
  email: 'clipflow1987@gmail.com',
  workSectionEyebrow: 'Want to work with us?',
  workSectionHeadline: 'Let\'s Work Together',
  workSectionDescription:
    'Share your idea and we will turn it into content that stands out across every platform.',
  workSectionCta: 'Work With Us',
  workSectionHref: 'https://forms.gle/5EeXvFC9WfNCMCsH8',
}

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollTo = (href: string) => {
    const target = document.querySelector(href)
    if (target) {
      const y = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%' },
        }
      )

      // ─── Floating gradient orb parallax ───
      const orb = sectionRef.current?.querySelector('.cta-orb')
      if (orb) {
        gsap.to(orb, {
          y: -60, x: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-32 md:py-48 px-6 md:px-10 overflow-hidden"
    >
      {/* Accent gradient bg */}
      <div className="absolute inset-0 bg-white/[0.015]" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      {/* Orb */}
      <div
        className="cta-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(200,246,93,0.1) 0%, rgba(125,249,255,0.05) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* Border top/bottom */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Content */}
      <div ref={contentRef} className="opacity-0 relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs tracking-[0.2em] text-accent/80 uppercase font-medium">
            {CTA_CONTENT.eyebrow}
          </span>
        </div>

        <h2
          className="font-display font-black uppercase leading-none tracking-tight"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem,10vw,9rem)' }}
        >
          <span className="block">{CTA_CONTENT.headline[0]}</span>
          <span className="block">{CTA_CONTENT.headline[1]}</span>
          <span className="block text-gradient">{CTA_CONTENT.accentLine}</span>
        </h2>

        <p className="mt-8 text-white/45 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          {CTA_CONTENT.description}
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <a
            href={`mailto:${CTA_CONTENT.email}`}
            className="group inline-flex items-center gap-3 px-8 py-5 bg-accent text-black font-semibold text-sm tracking-wide rounded-full hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(200,246,93,0.3)] transition-all duration-300"
          >
            {CTA_CONTENT.primaryCta}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <button
            onClick={() => scrollTo('#faq')}
            className="inline-flex items-center gap-2 px-8 py-5 border border-white/15 text-white/70 font-medium text-sm tracking-wide rounded-full hover:border-white/40 hover:text-white transition-all duration-300"
          >
            {CTA_CONTENT.secondaryCta}
          </button>
        </div>

        {/* Email link */}
        <div className="mt-10">
          <a
            href={`mailto:${CTA_CONTENT.email}`}
            className="text-sm text-white/30 hover:text-accent transition-colors duration-300 tracking-wide"
          >
            {CTA_CONTENT.email}
          </a>
        </div>

        <div className="mt-16 md:mt-20 max-w-3xl mx-auto">
          <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-transparent px-6 md:px-10 py-8 md:py-10 backdrop-blur-sm">
            <p className="text-xs md:text-sm uppercase tracking-[0.24em] text-accent/85 font-medium">
              {CTA_CONTENT.workSectionEyebrow}
            </p>
            <h3 className="mt-3 text-3xl md:text-5xl font-display font-black uppercase tracking-tight text-white">
              {CTA_CONTENT.workSectionHeadline}
            </h3>
            <p className="mt-4 text-sm md:text-base text-white/65 leading-relaxed max-w-xl mx-auto">
              {CTA_CONTENT.workSectionDescription}
            </p>
            <a
              href={CTA_CONTENT.workSectionHref}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center justify-center rounded-2xl px-7 py-3.5 text-sm md:text-base font-semibold uppercase tracking-wider bg-white text-black hover:scale-[1.03] transition-transform duration-300"
            >
              {CTA_CONTENT.workSectionCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
