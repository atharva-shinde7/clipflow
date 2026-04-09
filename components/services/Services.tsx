'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Services content — swap freely ───
const SERVICES = [
  {
    number: '01',
    title: 'YouTube Editing',
    description: 'Long-form content optimized for retention. Dynamic pacing, clean cuts, colour grading.',
    tags: ['Retention hooks', 'B-roll', 'Color grade'],
    accent: '#c8f65d',
  },
  {
    number: '02',
    title: 'Short-Form Reels',
    description: 'Vertical video that stops the scroll. Fast cuts, trend-aware formats for IG & TikTok.',
    tags: ['Reels', 'TikTok', 'Shorts'],
    accent: '#7df9ff',
  },
  {
    number: '03',
    title: 'Thumbnail Design',
    description: 'Click-bait thumbnails designed with psychology. Higher CTR, more impressions.',
    tags: ['Photoshop', 'CTR optimized', 'A/B tested'],
    accent: '#7df9ff',
  },
  {
    number: '04',
    title: 'Podcast Editing',
    description: 'Professional audio cleanup, multi-cam sync, animated captions for maximum shareability.',
    tags: ['Captions', 'Multi-cam', 'Audiogram'],
    accent: '#c8f65d',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Header reveal ───
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ─── Cards stagger up on scroll ───
      // Each card slides up from y:60 with a stagger delay
      const cards = cardsRef.current?.querySelectorAll('.service-card')
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-24 md:py-36 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* ─── Header ─── */}
        <div ref={headerRef} className="opacity-0 mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-[0.25em] text-accent/70 uppercase font-medium">// Services</span>
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs tracking-[0.15em] text-white/25">What We Do</span>
          </div>
          <h2
            className="font-display text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-none tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            OUR<br />
            <span className="text-gradient">EXPERTISE</span>
          </h2>
          <p className="mt-6 text-white/45 max-w-lg text-base md:text-lg leading-relaxed">
            End-to-end video production services designed for creators, brands, and agencies who refuse to be average.
          </p>
        </div>

        {/* ─── Service Cards ─── */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-4 md:gap-5">
          {SERVICES.map((service, i) => (
            <div
              key={service.number}
              className="service-card opacity-0 group relative p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 30% 50%, ${service.accent}10 0%, transparent 70%)`,
                }}
              />

              {/* Number */}
              <span
                className="block font-display text-[4rem] font-black leading-none tracking-tight mb-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{ fontFamily: 'var(--font-display)', color: service.accent }}
              >
                {service.number}
              </span>

              {/* Title */}
              <h3
                className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 text-white group-hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-white/45 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium tracking-wide px-3 py-1 rounded-full"
                    style={{
                      background: `${service.accent}12`,
                      color: service.accent,
                      border: `1px solid ${service.accent}20`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow on hover */}
              <div className="mt-8 flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-white/25 group-hover:text-white/60 transition-colors duration-300">
                <span>Explore</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
