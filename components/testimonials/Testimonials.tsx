'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Testimonials — replace with real client data ───
const TESTIMONIALS = [
  {
    quote: 'ClipFlow completely transformed our YouTube channel. Our average view duration jumped by 40% in the first month.',
    author: 'Aryan Sharma',
    role: 'YouTube Creator, 500K subs',
    initials: 'AS',
    color: '#c8f65d',
  },
  {
    quote: 'The fastest turnaround I have ever seen. They delivered 10 reels in 3 days without sacrificing quality.',
    author: 'Priya Mehta',
    role: 'Brand Manager, SportFit',
    initials: 'PM',
    color: '#7df9ff',
  },
  {
    quote: 'Not just editors — they are content strategists. They suggested hooks and formats I had never tried, and they worked.',
    author: 'KillBill Pandey',
    role: 'Gaming Creator, 1.2M views',
    initials: 'KB',
    color: '#8b5cf6',
  },
  {
    quote:
      'Very good editor...I get my edits on time. Would love if the beat syncs are more on line otherwise I got 88k views plus a 334k views on my first two videos thanks to the editor and my uploading skills. Happy to work with u and wish to continue our relationship in future',
    author: 'Detox.vm',
    role: 'Gaming Content',
    initials: 'DV',
    color: '#22d3ee',
    logo: '/sponsors-logo/detox.vm.jpeg',
  },
  {
    quote: 'Professional, responsive, and genuinely invested in your growth. Feel like I have an in-house team now.',
    author: 'Rohan Gupta',
    role: 'Tech Influencer',
    initials: 'RG',
    color: '#ff6b35',
  },
  {
    quote: 'We went viral twice in one month. The thumbnail + edit combo they crafted was pure genius.',
    author: 'TownTow Studio',
    role: 'Entertainment Channel',
    initials: 'TT',
    color: '#c8f65d',
  },
  {
    quote: 'Clean, cinematic edits that match our brand perfectly. They understand aesthetics at a level we couldn\'t find elsewhere.',
    author: 'Neel Verma',
    role: 'Lifestyle Creator',
    initials: 'NV',
    color: '#7df9ff',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)
  const animRef1 = useRef<gsap.core.Tween | null>(null)
  const animRef2 = useRef<gsap.core.Tween | null>(null)

  const firstHalf = TESTIMONIALS.slice(0, 3)
  const secondHalf = TESTIMONIALS.slice(3)

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

      // ─── Infinite horizontal scroll for both tracks ───
      // We duplicate the cards (CSS via HTML) and animate to -50% then reset
      // Track 1: scrolls left
      if (track1Ref.current) {
        const totalWidth = track1Ref.current.scrollWidth / 2
        animRef1.current = gsap.to(track1Ref.current, {
          x: -totalWidth,
          duration: 25,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: (x) => `${parseFloat(x) % totalWidth}px`,
          },
        })
      }

      // Track 2: scrolls right (reverse direction)
      if (track2Ref.current) {
        const totalWidth = track2Ref.current.scrollWidth / 2
        gsap.set(track2Ref.current, { x: -totalWidth / 2 })
        animRef2.current = gsap.to(track2Ref.current, {
          x: 0,
          duration: 25,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: (x) => `${parseFloat(x) % totalWidth}px`,
          },
        })
      }

      // Pause on hover
      const section = sectionRef.current
      const pauseAnims = () => {
        animRef1.current?.pause()
        animRef2.current?.pause()
      }
      const resumeAnims = () => {
        animRef1.current?.resume()
        animRef2.current?.resume()
      }
      section?.addEventListener('mouseenter', pauseAnims)
      section?.addEventListener('mouseleave', resumeAnims)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const TestimonialCard = ({ t }: { t: typeof TESTIMONIALS[0] }) => (
    <div
      className="flex-none w-[320px] md:w-[420px] p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.02] mx-3 group hover:border-white/15 hover:bg-white/[0.03] transition-all duration-400"
    >
      {/* Quote marks */}
      <div
        className="text-5xl font-black leading-none mb-4 font-display"
        style={{ fontFamily: 'var(--font-display)', color: t.color, opacity: 0.4 }}
      >
        "
      </div>

      <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 italic">
        "{t.quote}"
      </p>

      <div className="flex items-center gap-3">
        {/* Avatar */}
        {t.logo ? (
          <img
            src={t.logo}
            alt={`${t.author} logo`}
            className="w-10 h-10 rounded-full object-cover border border-white/15 flex-none"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-black flex-none"
            style={{ background: t.color }}
          >
            {t.initials}
          </div>
        )}
        <div>
          <div className="text-sm font-semibold text-white">{t.author}</div>
          <div className="text-xs text-white/35 mt-0.5">{t.role}</div>
        </div>
        {/* 5 stars */}
        <div className="ml-auto flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3 h-3" style={{ fill: t.color }} viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 md:py-36 overflow-hidden">
      {/* Header */}
      <div ref={headerRef} className="opacity-0 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto mb-14 md:mb-18">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs tracking-[0.25em] text-accent/70 uppercase font-medium">// Testimonials</span>
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-xs tracking-[0.15em] text-white/25">Client Love</span>
        </div>
        <h2
          className="font-display text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-none tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          WHAT CLIENTS<br />
          <span className="text-gradient">SAY</span>
        </h2>
      </div>

      {/* Slider Track 1 — left scroll */}
      <div className="relative mb-4 overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div ref={track1Ref} className="flex will-change-transform">
          {/* Duplicate cards for infinite loop */}
          {[...firstHalf, ...firstHalf].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Slider Track 2 — right scroll */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div ref={track2Ref} className="flex will-change-transform">
          {[...secondHalf, ...secondHalf].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
