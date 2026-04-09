'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Process steps — adapt for any workflow ───
const STEPS = [
  {
    number: '01',
    title: 'Strategy',
    description:
      'We align on your goals, audience, and brand voice. Deep-dive brief, reference gathering, format planning.',
    tags: ['Brief call', 'Moodboard', 'Timeline'],
    icon: '◉',
  },
  {
    number: '02',
    title: 'Editing',
    description:
      'Our editors get to work — color grading, sound design, and precision cuts. Every frame crafted with intent.',
    tags: ['Premiere Pro', 'After Effects', 'DaVinci'],
    icon: '✦',
  },
  {
    number: '03',
    title: 'Revision',
    description:
      'Unlimited revisions until it is perfect. We review together, iterate fast, and refine every detail.',
    tags: ['Frame.io review', 'Feedback', 'Iterations'],
    icon: '↻',
  },
  {
    number: '04',
    title: 'Delivery',
    description:
      'Final export in platform-native formats. We deliver ahead of deadline, ready to post immediately.',
    tags: ['All formats', 'Fast delivery', 'Ready to post'],
    icon: '→',
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineLineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Header ───
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      )

      // ─── Timeline line draws itself downward as you scroll ───
      gsap.fromTo(timelineLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.5, ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 0.5, // Smooth scrub tied to scroll position
          },
        }
      )

      // ─── Steps: each animates in sequentially as the line passes ───
      const stepEls = stepsRef.current?.querySelectorAll('.process-step')
      if (stepEls) {
        stepEls.forEach((step, i) => {
          gsap.fromTo(step,
            { x: -30, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="py-24 md:py-36 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="opacity-0 mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-[0.25em] text-accent/70 uppercase font-medium">// Process</span>
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs tracking-[0.15em] text-white/25">Three Phases</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="font-display text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-none tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              HOW WE<br />
              <span className="text-gradient">WORK</span>
            </h2>
            <p className="text-white/40 text-base max-w-xs md:text-right leading-relaxed">
              A proven system that makes collaboration seamless and results predictable.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">

          {/* Vertical timeline line */}
          <div
            className="absolute left-5 md:left-10 top-0 bottom-0 w-px bg-white/6"
            aria-hidden="true"
          >
            <div
              ref={timelineLineRef}
              className="absolute inset-0 origin-top"
              style={{
                background: 'linear-gradient(to bottom, var(--accent), var(--accent-2))',
                transformOrigin: 'top',
              }}
            />
          </div>

          {/* Step cards */}
          <div className="space-y-6 md:space-y-8">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="process-step opacity-0 relative pl-14 md:pl-24"
              >
                {/* Dot on timeline */}
                <div
                  className="absolute left-3 md:left-[34px] top-8 w-4 h-4 rounded-full border-2 border-accent bg-bg"
                  aria-hidden="true"
                />

                {/* Card */}
                <div className="group p-7 md:p-9 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.03] transition-all duration-400">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                    <div>
                      <span
                        className="font-display text-[3.5rem] font-black leading-none tracking-tight opacity-15 text-accent block -mb-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {step.number}
                      </span>
                      <h3
                        className="font-display text-2xl md:text-4xl font-black uppercase tracking-tight text-white mt-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <span className="text-3xl text-accent/30 group-hover:text-accent/60 transition-colors duration-300">
                      {step.icon}
                    </span>
                  </div>

                  <p className="text-white/45 text-base leading-relaxed mb-5 max-w-2xl">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-full bg-white/5 text-white/40 border border-white/6"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
