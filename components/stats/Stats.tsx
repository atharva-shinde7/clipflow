'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Stats content — fully replaceable ───
const STATS = [
  { value: 15, suffix: '+', label: 'Global Clients', description: 'Brands across 8 countries' },
  { value: 50, suffix: '+', label: 'Projects', description: 'Delivered on time, every time' },
  { value: 2, suffix: 'M+', label: 'Impressions', description: 'Combined views generated' },
  { value: 500, suffix: 'K+', label: 'Views', description: 'Organic reach driven' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Header ───
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      )

      // ─── Number counters: count from 0 to target when scrolled into view ───
      // Uses GSAP's ability to tween plain objects and update DOM via onUpdate
      STATS.forEach((stat, i) => {
        const el = numbersRef.current[i]
        if (!el) return

        const counter = { val: 0 }

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(counter, {
              val: stat.value,
              duration: 2.2,
              ease: 'power2.out',
              delay: i * 0.15,
              onUpdate: () => {
                el.textContent = Math.round(counter.val).toString()
              },
            })
          },
          once: true, // Only count once
        })
      })

      // ─── Stat cards stagger in ───
      const cards = sectionRef.current?.querySelectorAll('.stat-card')
      if (cards) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-24 md:py-36 px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      {/* Background: full-width dark strip with subtle gradient */}
      <div className="absolute inset-0 bg-white/[0.02]" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="opacity-0 mb-16 md:mb-20 flex items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs tracking-[0.25em] text-accent/70 uppercase font-medium">// Stats</span>
              <div className="w-16 h-px bg-white/8" />
              <span className="text-xs tracking-[0.15em] text-white/25">Facts</span>
            </div>
            <h2
              className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-none tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              BY THE<br />
              <span className="text-gradient">NUMBERS</span>
            </h2>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card opacity-0 p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.02] group hover:border-accent/20 transition-all duration-400"
            >
              {/* Counter */}
              <div className="flex items-end gap-1 mb-4">
                <span
                  ref={(el) => { numbersRef.current[i] = el }}
                  className="stat-num text-[clamp(3.5rem,8vw,6rem)] text-white group-hover:text-accent transition-colors duration-400"
                >
                  0
                </span>
                <span
                  className="stat-num text-[clamp(2rem,5vw,3.5rem)] text-accent pb-1"
                >
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <div className="font-semibold text-white text-base md:text-lg mb-1 tracking-tight">
                {stat.label}
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-white/35 leading-relaxed">
                {stat.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="mt-5 h-px transition-all duration-500 origin-left"
                style={{
                  background: 'var(--accent)',
                  opacity: 0.2,
                  transform: 'scaleX(0.3)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
