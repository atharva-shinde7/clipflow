'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ABOUT = {
  eyebrow: '// About',
  title: ['A SMALL TEAM', 'WITH A BIG'],
  accent: 'OBSESSION',
  body: [
    'ClipFlow is built for creators and brands who care about pacing, story, and retention-not just cuts.',
    'We combine editing craft, motion polish, and platform-first strategy to help you publish faster while staying on-brand.',
  ],
  bullets: [
    { title: 'Creator-first edits', text: 'Hooks, pacing, captions, and pattern interrupts tuned for retention.' },
    { title: 'Cinematic polish', text: 'Clean sound, color, and motion design that feels premium.' },
    { title: 'Fast, predictable delivery', text: 'Clear timelines, clean feedback loops, and version control.' },
  ],
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      )

      const cards = cardsRef.current?.querySelectorAll('.about-card')
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-36 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="opacity-0 mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-[0.25em] text-accent/70 uppercase font-medium">{ABOUT.eyebrow}</span>
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs tracking-[0.15em] text-white/25">Who we are</span>
          </div>

          <h2
            className="font-display text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-none tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {ABOUT.title[0]}
            <br />
            {ABOUT.title[1]} <span className="text-gradient">{ABOUT.accent}</span>
          </h2>

          <div className="mt-6 grid lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="space-y-4 text-white/45 text-base md:text-lg leading-relaxed">
              {ABOUT.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="text-xs tracking-[0.2em] text-white/30 uppercase font-semibold mb-4">
                What you get
              </div>
              <ul className="space-y-3 text-sm text-white/55">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <span>Style references + first draft aligned to your brand.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/30" aria-hidden="true" />
                  <span>Organized revisions and export formats for all platforms.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-2/80" aria-hidden="true" />
                  <span>Optional motion kit to keep every video consistent.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-4 md:gap-5">
          {ABOUT.bullets.map((b, idx) => (
            <div
              key={b.title}
              className="about-card opacity-0 relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 overflow-hidden hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    idx % 2 === 0
                      ? 'radial-gradient(circle at 25% 35%, rgba(200,246,93,0.10) 0%, transparent 65%)'
                      : 'radial-gradient(circle at 25% 35%, rgba(125,249,255,0.10) 0%, transparent 65%)',
                }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="text-xs tracking-[0.2em] text-white/25 uppercase font-semibold mb-3">
                  0{idx + 1}
                </div>
                <div className="font-semibold text-white tracking-tight">{b.title}</div>
                <p className="mt-2 text-sm text-white/45 leading-relaxed">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

