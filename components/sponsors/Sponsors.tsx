'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const SPONSORS = {
  eyebrow: '// Sponsors',
  title: ['TRUSTED BY', 'PARTNERS'],
  subtitle:
    'A few brands and creators we collaborate with.',
  items: [
    {
      name: 'Detox.vm',
      type: 'Gaming Content',
      image: '/sponsors-logo/detox.vm.jpeg',
      instagram: 'https://www.instagram.com/detox.vm',
    },
    {
      name: 'Bimbo',
      type: 'YouTube Editing',
      image: '/sponsors-logo/bimbo.jpeg',
      instagram: 'https://www.instagram.com/bimbo7675',
    },
  ],
}

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      )

      const chips = rowRef.current?.querySelectorAll('.sponsor-chip')
      if (chips) {
        gsap.fromTo(
          chips,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: rowRef.current, start: 'top 85%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="sponsors" className="py-24 md:py-36 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="opacity-0 mb-14 md:mb-18">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-[0.25em] text-accent/70 uppercase font-medium">
              {SPONSORS.eyebrow}
            </span>
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs tracking-[0.15em] text-white/25">Support</span>
          </div>

          <h2
            className="font-display text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-none tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {SPONSORS.title[0]}
            <br />
            <span className="text-gradient">{SPONSORS.title[1]}</span>
          </h2>

          <p className="mt-6 text-white/45 max-w-2xl text-base md:text-lg leading-relaxed">
            {SPONSORS.subtitle}
          </p>
        </div>

        <div ref={rowRef} className="flex flex-wrap justify-center gap-6 md:gap-10">
          {SPONSORS.items.map((s) => (
            <a
              key={s.name}
              href={s.instagram}
              target="_blank"
              rel="noreferrer"
              className="sponsor-chip flex flex-col items-center gap-3 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-[3px] overflow-hidden bg-gradient-to-br from-accent/50 to-cyan-300/40 shadow-[0_8px_28px_rgba(0,0,0,0.35)]">
                <img
                  src={s.image}
                  alt={`${s.name} logo`}
                  className={`w-full h-full object-cover rounded-full border border-white/15 ${
                    s.name === 'Detox.vm' ? 'scale-[1.05]' : ''
                  }`}
                />
              </div>
              <div className="text-sm text-white/70 tracking-wide">{s.name}</div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-accent/40 text-accent/85">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.55a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

