'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PRICING = {
  eyebrow: '// Pricing',
  titleLines: ['PACKAGES', 'THAT SCALE'],
  subtitle:
    'Pick a plan that matches your publishing cadence. Custom retainers available for agencies and high-volume creators.',
  plans: [
    {
      name: 'Starter',
      price: '₹9,999',
      cadence: '/month',
      highlight: false,
      description: 'Perfect for consistent weekly uploads.',
      features: ['4 short-form videos', 'Basic captions', '1 revision', '48–72h delivery'],
    },
    {
      name: 'Pro',
      price: '₹24,999',
      cadence: '/month',
      highlight: true,
      description: 'Best for creators scaling fast with premium polish.',
      features: ['12 short-form videos', 'Advanced captions', '2 revisions', 'Priority delivery'],
    },
    {
      name: 'Studio',
      price: '₹49,999',
      cadence: '/month',
      highlight: false,
      description: 'For brands that need volume + strategy support.',
      features: ['30 short-form videos', 'Brand motion kit', 'Unlimited revisions', 'Dedicated editor'],
    },
  ],
  note: 'Need long-form YouTube edits, thumbnails, or podcast multi-cam? We’ll quote a custom bundle.',
}

export default function Pricing() {
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
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      const cards = cardsRef.current?.querySelectorAll('.pricing-card')
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
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
    <section ref={sectionRef} id="pricing" className="relative py-24 md:py-36 px-6 md:px-10 lg:px-16">
      {/* Subtle panel */}
      <div className="absolute inset-0 bg-white/[0.012]" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-10" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={headerRef} className="opacity-0 mb-14 md:mb-18">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-[0.25em] text-accent/70 uppercase font-medium">
              {PRICING.eyebrow}
            </span>
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs tracking-[0.15em] text-white/25">Plans</span>
          </div>

          <h2
            className="font-display text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-none tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {PRICING.titleLines[0]}
            <br />
            <span className="text-gradient">{PRICING.titleLines[1]}</span>
          </h2>

          <p className="mt-6 text-white/45 max-w-2xl text-base md:text-lg leading-relaxed">
            {PRICING.subtitle}
          </p>
        </div>

        <div ref={cardsRef} className="grid lg:grid-cols-3 gap-4 md:gap-5 items-stretch">
          {PRICING.plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card opacity-0 group relative rounded-2xl border overflow-hidden transition-all duration-500 ${
                plan.highlight
                  ? 'border-accent/30 bg-white/[0.05]'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: plan.highlight
                    ? 'radial-gradient(circle at 30% 30%, rgba(200,246,93,0.14) 0%, transparent 65%)'
                    : 'radial-gradient(circle at 25% 35%, rgba(125,249,255,0.10) 0%, transparent 65%)',
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3
                      className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/45">{plan.description}</p>
                  </div>

                  {plan.highlight ? (
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-accent/25 bg-accent/10 text-accent">
                      Most Popular
                    </span>
                  ) : null}
                </div>

                <div className="mt-7 flex items-end gap-2">
                  <div className="font-display font-black tracking-tight text-white" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem,4.2vw,3.4rem)' }}>
                    {plan.price}
                  </div>
                  <div className="pb-2 text-sm text-white/35">{plan.cadence}</div>
                </div>

                <div className="mt-6 h-px bg-white/10" />

                <ul className="mt-6 space-y-3 text-sm text-white/55">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full ${
                          plan.highlight ? 'bg-accent' : 'bg-white/30'
                        }`}
                        aria-hidden="true"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  <a
                    href="#cta"
                    className={`inline-flex items-center justify-center w-full px-6 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                      plan.highlight
                        ? 'bg-accent text-black hover:shadow-[0_0_40px_rgba(200,246,93,0.25)] hover:scale-[1.02]'
                        : 'border border-white/15 text-white/75 hover:text-white hover:border-white/35'
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-white/35 max-w-3xl">{PRICING.note}</p>
      </div>
    </section>
  )
}

