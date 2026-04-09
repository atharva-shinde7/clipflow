import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { PROJECTS } from '@/components/portfolio/projects'

export const metadata = {
  title: 'Projects — ClipFlow',
  description: 'All projects and case studies by ClipFlow.',
}

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />

      <section className="pt-28 md:pt-32 pb-20 md:pb-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 md:mb-18 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs tracking-[0.25em] text-accent/70 uppercase font-medium">// Projects</span>
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-xs tracking-[0.15em] text-white/25">All Work</span>
              </div>
              <h1
                className="font-display text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-none tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                VIEW ALL<br />
                <span className="text-gradient">PROJECTS</span>
              </h1>
            </div>
            <p className="text-white/40 text-sm md:text-base max-w-md md:text-right leading-relaxed">
              Explore our edits across YouTube, short-form, brand content, and podcast formats. Replace these with your
              real client work anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
                <div
                  className="absolute inset-0 opacity-80"
                  style={{
                    background: `radial-gradient(circle at 60% 40%, ${project.color}22 0%, transparent 62%)`,
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10 p-7 md:p-8">
                  <span
                    className="text-[11px] font-medium tracking-[0.2em] uppercase mb-3 block"
                    style={{ color: project.color }}
                  >
                    {project.category}
                  </span>
                  <h3
                    className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {project.title}
                  </h3>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-white/40">{project.views}</span>
                    <span className="text-xs font-medium tracking-widest uppercase text-white/25">Case study</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

