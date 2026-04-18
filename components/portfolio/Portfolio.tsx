'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { PROJECTS } from './projects'

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLAnchorElement>(null)

  return (
    <a
      ref={cardRef}
      className="project-card opacity-0 relative overflow-hidden rounded-2xl cursor-pointer"
      style={{ background: project.bg, minHeight: '260px' }}
      href={project.instagram}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 dot-grid"
        style={{ opacity: 0.3 }}
      />

      {/* Color gradient orb */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 60% 40%, ${project.color}25 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0.5,
        }}
      />

      {/* Optional card image */}
      {project.cardImage ? (
        <>
          <img
            src={project.cardImage}
            alt={`${project.title} preview`}
            className="absolute inset-0 w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-black/40" />
        </>
      ) : null}

      {/* Project number */}
      <span
        className="absolute top-4 right-5 font-display text-[5rem] font-black leading-none"
        style={{
          fontFamily: 'var(--font-display)',
          color: project.color,
          opacity: 0.08,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Content */}
      <div className="relative z-10 p-7 md:p-9 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-[11px] font-medium tracking-[0.2em] uppercase block"
              style={{ color: project.color }}
            >
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {project.logoSrc ? (
              <img
                src={project.logoSrc}
                alt={`${project.title} logo`}
                className="w-9 h-9 rounded-full object-cover border border-white/20"
              />
            ) : null}
            <h3
              className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <span className="text-sm text-white/40">{project.views}</span>

          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/25 text-white/70">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.55a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Bottom gradient overlay on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500"
        style={{
          background: project.color,
          opacity: hovered ? 0.6 : 0,
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
        }}
      />
    </a>
  )
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Header slide-up ───
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      )

      // ─── Grid cards stagger in ───
      const cards = gridRef.current?.querySelectorAll('.project-card')
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out',
            stagger: { amount: 0.5, from: 'start' },
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="portfolio" className="py-24 md:py-36 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="opacity-0 mb-14 md:mb-18 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs tracking-[0.25em] text-accent/70 uppercase font-medium">// Portfolio</span>
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-xs tracking-[0.15em] text-white/25">2024–25</span>
            </div>
            <h2
              className="font-display text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-none tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              LATEST<br />
              <span className="text-gradient">WORK</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm md:text-base max-w-xs md:text-right leading-relaxed">
            A curated selection of our most impactful projects from the past year.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-white/12 text-white/60 text-sm font-medium tracking-wide rounded-full hover:border-accent/40 hover:text-accent transition-all duration-300"
          >
            View All Projects
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
