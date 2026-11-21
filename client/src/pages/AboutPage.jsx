import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  EQUIP_AREAS,
  FOUR_PILLARS,
  PROGRAMS,
  VENUES_USED,
  VISION_MISSION,
  WHO_WE_SERVE,
} from '../data/site';
import FoundersSection from '../components/FoundersSection';
import { PageHeader } from '../components/PageParts';

const About = () => (
  <>
    <Helmet>
      <title>About — Youth Spark Summit</title>
      <meta
        name="description"
        content="Youth Spark Summit is run by Kevin Kimani and Daphne Kimani in Nairobi. Vision: Discipling Nations through the Gospel of the Kingdom."
      />
    </Helmet>

    <PageHeader crumbs={[{ label: 'About' }]} eyebrow="About" title={VISION_MISSION.tagline}>
      <p className="lead">{VISION_MISSION.subtitle}</p>
    </PageHeader>

    {/* Vision & Mission */}
    <section className="section border-b border-white/10 bg-panel">
      <div className="wrap grid gap-6 md:grid-cols-2">
        <div className="card bg-ink p-6">
          <p className="eyebrow mb-2">Vision</p>
          <p className="text-xl font-medium leading-snug text-fg">{VISION_MISSION.vision}</p>
        </div>
        <div className="card bg-ink p-6">
          <p className="eyebrow mb-2">Mission</p>
          <p className="leading-relaxed text-muted">{VISION_MISSION.mission}</p>
        </div>
      </div>
    </section>

    {/* Founders */}
    <section className="section">
      <div className="wrap">
        <FoundersSection />
      </div>
    </section>

    {/* Five programs */}
    <section className="section border-t border-white/10 bg-panel">
      <div className="wrap">
        <p className="eyebrow mb-2">What we host</p>
        <h2 className="mb-6 text-2xl sm:text-3xl">Five programs</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {PROGRAMS.map((p) => (
            <li key={p.slug}>
              <Link to={`/programs/${p.slug}`} className="card group flex h-full flex-col gap-2 bg-ink p-5 transition-colors hover:border-gold">
                <span className="chip-program self-start">{p.cadence}</span>
                <h3 className="text-lg group-hover:text-gold">{p.name}</h3>
                <p className="text-sm leading-relaxed text-muted">{p.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          Youth Spark Nexus is one of the programs. It is not a separate organisation.
        </p>
      </div>
    </section>

    {/* Four Pillars & Seven Areas */}
    <section id="pillars" className="section border-t border-white/10">
      <div className="wrap">
        <p className="eyebrow mb-2">Pillars</p>
        <h2 className="mb-6 text-2xl sm:text-3xl">Our pillars for youth leadership</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FOUR_PILLARS.map((pillar) => (
            <li key={pillar.name} className="card p-5">
              <h3 className="text-base font-semibold text-gold">{pillar.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.line}</p>
            </li>
          ))}
        </ul>

        <h3 className="mb-4 mt-12 text-xl">Seven areas we focus on</h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EQUIP_AREAS.map((area) => (
            <li key={area.key} className="card p-5">
              <h4 className="text-base font-semibold text-fg">{area.name}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{area.line}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <figure className="overflow-hidden rounded-xl border border-white/10 bg-panel">
            <img src="/WHO WE ARE.jpg" alt="Group discussion at Youth Spark Nexus" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="p-3 text-xs text-muted">Peer discussion at Youth Spark Nexus</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-xl border border-white/10 bg-panel">
            <img src="/pillar.jpg" alt="Speaker at Youth Spark Summit 2025, Nairobi Cinema" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="p-3 text-xs text-muted">Youth Spark Summit 2025, Nairobi Cinema</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-xl border border-white/10 bg-panel">
            <img src="/pillar 2.jpg" alt="Audience seated at Nairobi Cinema during Summit 2025" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="p-3 text-xs text-muted">Summit 2025 auditorium session</figcaption>
          </figure>
        </div>
      </div>
    </section>

    {/* Who we serve */}
    <section id="who-we-serve" className="section border-t border-white/10 bg-panel">
      <div className="wrap grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <p className="eyebrow mb-2">Who we serve</p>
          <h2 className="text-2xl sm:text-3xl">Young leaders across Nairobi and Kenya</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {WHO_WE_SERVE.map((group) => (
              <li key={group} className="card bg-ink p-4 text-sm font-medium text-fg">
                {group}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <img src="/kenya-vision.png" alt="Nairobi city skyline" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-xl border border-white/10 object-cover" />
          <img src="/about-skyline.png" alt="Nairobi evening skyline" loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-xl border border-white/10 object-cover" />
        </div>
      </div>
    </section>

    {/* Venues & Past Rooms */}
    <section id="impact" className="section border-t border-white/10">
      <div className="wrap grid items-start gap-10 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-2">Where we meet</p>
          <h2 className="text-2xl sm:text-3xl">Venues we have used</h2>
          <ul className="mt-4 space-y-2 text-muted">
            {VENUES_USED.map((v) => (
              <li key={v} className="card px-4 py-3 text-sm">{v}</li>
            ))}
          </ul>
          <p className="mt-6 text-muted">
            Every gathering we have on record has its own page with the date, venue, video links when available, and photos.
          </p>
          <Link to="/events" className="btn-ghost mt-5">
            See the calendar
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-xl border border-white/10 bg-panel">
            <img src="/Impact (2).jpg" alt="Youth Spark Summit 2025 full hall at Nairobi Cinema" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="p-3 text-xs text-muted">Youth Spark Summit 2025, Nairobi Cinema</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-xl border border-white/10 bg-panel">
            <img src="/gatherings/summit-2026/03.webp" alt="Kevin and Daphne Kimani with PLO Lumumba, speaker at Youth Spark Summit 2026" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="p-3 text-xs text-muted">With PLO Lumumba, speaker at Youth Spark Summit 2026</figcaption>
          </figure>
        </div>
      </div>
    </section>
  </>
);

export default About;
