export const metadata = {
  title: 'Terms & Conditions — ClipFlow',
  description: 'Terms & Conditions for ClipFlow.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen px-6 md:px-10 lg:px-16 py-28 md:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-7">
          <span className="text-xs tracking-[0.25em] text-accent/70 uppercase font-medium">// Legal</span>
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-xs tracking-[0.15em] text-white/25">Terms</span>
        </div>

        <h1
          className="font-display text-[clamp(3rem,7vw,5.5rem)] font-black uppercase leading-none tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          TERMS &<br />
          <span className="text-gradient">CONDITIONS</span>
        </h1>

        <p className="mt-6 text-white/45 text-base md:text-lg leading-relaxed">
          Last updated: <span className="text-white/65">April 1, 2026</span>
        </p>

        <div className="mt-10 space-y-10 text-white/55 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-white font-semibold tracking-wide">1. Services</h2>
            <p>
              ClipFlow provides creative services (e.g., video editing, podcast editing, content packages) as agreed in
              writing per project or retainer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-semibold tracking-wide">2. Payments</h2>
            <p>
              Fees, payment schedules, and deliverables are confirmed before work starts. Late payments may pause
              delivery timelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-semibold tracking-wide">3. Revisions</h2>
            <p>
              Revisions included in your plan or agreement are honored within the scope of the original brief. Major
              scope changes may require a revised quote.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-semibold tracking-wide">4. Client content & rights</h2>
            <p>
              You confirm you have the rights to all materials you provide. Unless agreed otherwise, you retain
              ownership of your source content and final deliverables upon full payment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-semibold tracking-wide">5. Portfolio use</h2>
            <p>
              Unless you request otherwise in writing, we may showcase completed work for portfolio/marketing purposes.
              We can respect NDA requests on approval.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-semibold tracking-wide">6. Contact</h2>
            <p>
              Questions? Email{' '}
              <a className="text-accent/80 hover:text-accent transition-colors" href="mailto:clipflow1987@gmail.com">
                clipflow1987@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

