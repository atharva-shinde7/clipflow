export const metadata = {
  title: 'Privacy Policy — ClipFlow',
  description: 'Privacy Policy for ClipFlow.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen px-6 md:px-10 lg:px-16 py-28 md:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-7">
          <span className="text-xs tracking-[0.25em] text-accent/70 uppercase font-medium">// Legal</span>
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-xs tracking-[0.15em] text-white/25">Privacy</span>
        </div>

        <h1
          className="font-display text-[clamp(3rem,7vw,5.5rem)] font-black uppercase leading-none tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          PRIVACY<br />
          <span className="text-gradient">POLICY</span>
        </h1>

        <p className="mt-6 text-white/45 text-base md:text-lg leading-relaxed">
          Last updated: <span className="text-white/65">April 1, 2026</span>
        </p>

        <div className="mt-10 space-y-10 text-white/55 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-white font-semibold tracking-wide">1. Information we collect</h2>
            <p>
              We may collect information you provide when you contact us (such as your name, email, and project details),
              and basic technical information (such as browser type and approximate location) for analytics and security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-semibold tracking-wide">2. How we use information</h2>
            <p>
              We use information to respond to inquiries, deliver services, improve the website, prevent abuse, and
              comply with legal obligations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-semibold tracking-wide">3. Cookies & analytics</h2>
            <p>
              We may use cookies or similar technologies to measure performance and understand how visitors use the site.
              You can control cookies through your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-semibold tracking-wide">4. Sharing</h2>
            <p>
              We do not sell your personal information. We may share information with trusted providers who help operate
              the site or deliver services (for example, hosting, email, or analytics), subject to appropriate safeguards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-semibold tracking-wide">5. Data retention</h2>
            <p>
              We keep information only as long as needed for the purposes described above, unless a longer retention
              period is required by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-semibold tracking-wide">6. Contact</h2>
            <p>
              For privacy questions, contact us at{' '}
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

