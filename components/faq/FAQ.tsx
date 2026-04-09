'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const FAQ_CONTENT = {
  eyebrow: '// FAQ',
  titleLines: ['QUESTIONS,', 'ANSWERED'],
  subtitle: 'Everything you need to know before we start. If you have something else, just email us.',
  items: [
    {
      q: 'What do you need from me to start?',
      a: 'A folder with your raw clips (Drive/Dropbox), brand references (fonts/colors), and 2–3 examples of edits you love. If you don’t have a style yet, we’ll propose one.',
    },
    {
      q: 'How fast is the turnaround time?',
      a: 'Most short-form edits deliver in 48–72 hours. Larger batches and long-form timelines depend on complexity, but we always agree on delivery before starting.',
    },
    {
      q: 'Do you offer revisions?',
      a: 'Yes. Every plan includes revisions. We iterate quickly and keep changes organized so you can approve with minimal back-and-forth.',
    },
    {
      q: 'Can you match my existing style?',
      a: 'Absolutely. Send 2–5 reference videos and we’ll replicate pacing, captions, transitions, and grading. We can also build a reusable motion kit for consistency.',
    },
    {
      q: 'What if I need a custom plan?',
      a: 'No problem. If you need long-form, thumbnails, podcast multi-cam, or high-volume monthly output, we’ll create a custom retainer.',
    },
  ],
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  const [openIndex, setOpenIndex] = useState<number>(0)
  const ids = useMemo(
    () =>
      FAQ_CONTENT.items.map((_, i) => ({
        buttonId: `faq-btn-${i}`,
        panelId: `faq-panel-${i}`,
      })),
    []
  )

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

      const rows = itemsRef.current?.querySelectorAll('.faq-row')
      if (rows) {
        gsap.fromTo(
          rows,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: itemsRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="relative py-24 md:py-36 px-6 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-white/[0.01]" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1fr,1.2fr] gap-10 lg:gap-16 items-start">
        <div ref={headerRef} className="opacity-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-[0.25em] text-accent/70 uppercase font-medium">
              {FAQ_CONTENT.eyebrow}
            </span>
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs tracking-[0.15em] text-white/25">Help</span>
          </div>

          <h2
            className="font-display text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-none tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {FAQ_CONTENT.titleLines[0]}
            <br />
            <span className="text-gradient">{FAQ_CONTENT.titleLines[1]}</span>
          </h2>

          <p className="mt-6 text-white/45 max-w-md text-base md:text-lg leading-relaxed">
            {FAQ_CONTENT.subtitle}
          </p>
        </div>

        <div ref={itemsRef} className="space-y-3">
          {FAQ_CONTENT.items.map((item, i) => {
            const open = openIndex === i
            return (
              <div
                key={item.q}
                className="faq-row opacity-0 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 hover:bg-white/[0.035] transition-all duration-500"
              >
                <button
                  id={ids[i]?.buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={ids[i]?.panelId}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6 p-5 md:p-6 text-left"
                >
                  <span className="font-medium tracking-wide text-white/80">{item.q}</span>
                  <span className="text-white/50">
                    <Chevron open={open} />
                  </span>
                </button>

                <div
                  id={ids[i]?.panelId}
                  role="region"
                  aria-labelledby={ids[i]?.buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base text-white/45 leading-relaxed">
                      <div className="h-px bg-white/10 mb-4" />
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

