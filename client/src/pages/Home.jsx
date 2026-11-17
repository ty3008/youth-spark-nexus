import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Church,
  GraduationCap,
  Home as HomeIcon,
  Landmark,
  MapPin,
  Monitor,
  Palette,
} from 'lucide-react';
import { useGatherings } from '../lib/GatheringsContext';
import { defaultMonth, formatDate, newestFirst } from '../lib/gatherings';
import { EQUIP_AREAS, FOUNDERS, FOUNDERS_PHOTO, HERO_PHOTO, PROGRAMS, SITE } from '../data/site';
import { CoverOrPanel, GatheringCard, StatusChip } from '../components/GatheringCard';
import MonthCalendar from '../components/MonthCalendar';
import SocialRow from '../components/SocialRow';

const LATEST_SLUG = 'nxt-africa-forum-2026';

const AREA_ICONS = {
  business: Briefcase,
  government: Landmark,
  'media-tech': Monitor,
  arts: Palette,
  education: GraduationCap,
  family: HomeIcon,
  church: Church,
};

const Home = () => {
  const { items } = useGatherings();
  const [month] = useState(() => defaultMonth(items));
  const [activeArea, setActiveArea] = useState(EQUIP_AREAS[0].key);
  const sorted = [...items].sort(newestFirst);
  const latest = items.find((g) => g.slug === LATEST_SLUG) || sorted[0];
  const selectedArea = EQUIP_AREAS.find((a) => a.key === activeArea) || EQUIP_AREAS[0];

  return (
    <>
      <Helmet>
        <title>Youth Spark Summit — Gatherings for young leaders in Nairobi</title>
        <meta
          name="description"
          content="Youth Spark Summit hosts the annual Summit, monthly Nexus, NXT Africa Forum, and Reconstructive Leadership in Nairobi. See dates and past gatherings. No registration on this site."
        />
      </Helmet>

      {/* 1. Hero */}
      <section className="border-b border-white/10">
        <div className="wrap grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="eyebrow mb-3">Nairobi</p>
            <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">Raising a generation that builds</h1>
            <p className="lead mt-5 max-w-xl">
              Youth Spark Summit gathers young leaders for faith, purpose, leadership, and enterprise — in rooms we actually host.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/events" className="btn-gold">
                See the calendar
              </Link>
              <Link to={`/events/${LATEST_SLUG}`} className="btn-ghost">
                Latest gathering
              </Link>
            </div>
          </div>
          <figure>
            <img
              src={HERO_PHOTO}
              alt="Young people seated in Nairobi Cinema at Youth Spark Summit 2025"
              width="1600"
              height="1068"
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/3] w-full rounded-xl border border-white/10 object-cover"
            />
            <figcaption className="mt-2 text-sm text-muted">Youth Spark Summit 2025, Nairobi Cinema</figcaption>
          </figure>
        </div>
      </section>

      {/* 2. Latest gathering */}
      {latest && (
        <section className="border-b border-white/10 bg-panel">
          <div className="wrap grid items-center gap-6 py-8 md:grid-cols-12 md:gap-8">
            <div className="overflow-hidden rounded-xl border border-white/10 md:col-span-4">
              <CoverOrPanel gathering={latest} />
            </div>
            <div className="md:col-span-8">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <p className="eyebrow">Latest gathering</p>
                <StatusChip gathering={latest} />
              </div>
              <h2 className="text-2xl leading-snug sm:text-3xl">{latest.title}</h2>
              <p className="mt-2 flex items-start gap-2 text-sm text-muted">
                <CalendarDays size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {formatDate(latest)}
                  {latest.time ? ` · ${latest.time}` : ''}
                </span>
              </p>
              <p className="mt-1 flex items-start gap-2 text-sm text-muted">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span>{latest.venue}</span>
              </p>
              <p className="mt-3 text-muted">{latest.summary}</p>
              <Link to={`/events/${latest.slug}`} className="btn-ghost mt-5">
                View this gathering <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 3. Four program cards with existing project photos */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow mb-2">What we host</p>
          <h2 className="mb-8 text-2xl sm:text-3xl">Four programs</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map((p) => (
              <li key={p.slug}>
                <Link to={`/programs/${p.slug}`} className="card group flex h-full flex-col overflow-hidden transition-colors hover:border-gold">
                  <img
                    src={p.cover}
                    alt={p.name}
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full border-b border-white/10 object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <span className="chip-program self-start">{p.cadence}</span>
                    <h3 className="text-lg group-hover:text-gold">{p.name}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted">{p.blurb}</p>
                    <span className="inline-flex min-h-[32px] items-center gap-1 text-sm font-medium text-gold">
                      Open program <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. How we equip — seven areas, one sentence each */}
      <section className="section border-t border-white/10 bg-panel">
        <div className="wrap">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-2">How we equip</p>
              <h2 className="text-2xl sm:text-3xl">Seven areas we focus on</h2>
            </div>
            <Link to="/about#pillars" className="link-inline inline-flex min-h-[48px] items-center text-sm">
              Read more on About
            </Link>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Seven areas">
            {EQUIP_AREAS.map((area) => {
              const Icon = AREA_ICONS[area.key];
              const isSelected = area.key === activeArea;
              return (
                <button
                  key={area.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveArea(area.key)}
                  className={`inline-flex min-h-[48px] items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors ${
                    isSelected
                      ? 'border-gold bg-gold text-ink'
                      : 'border-white/15 bg-ink text-fg hover:border-gold hover:text-gold'
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {area.name}
                </button>
              );
            })}
          </div>

          <div role="tabpanel" className="mt-4 rounded-xl border border-white/10 bg-ink p-5">
            <h3 className="text-lg text-gold">{selectedArea.name}</h3>
            <p className="mt-2 text-muted">{selectedArea.line}</p>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {EQUIP_AREAS.map((area) => {
              const Icon = AREA_ICONS[area.key];
              return (
                <li key={area.key} className="rounded-xl border border-white/10 bg-ink p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gold">
                    <Icon size={16} aria-hidden="true" />
                    <span>{area.name}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{area.line}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 5. Rooms we have held */}
      <section className="section border-t border-white/10">
        <div className="wrap">
          <p className="eyebrow mb-2">Past gatherings</p>
          <h2 className="mb-8 text-2xl sm:text-3xl">Rooms we have held</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((g) => (
              <li key={g.slug}>
                <GatheringCard gathering={g} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Founders */}
      <section className="section border-t border-white/10 bg-panel">
        <div className="wrap grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <figure>
            <img
              src={FOUNDERS_PHOTO}
              alt="Kevin Kimani and Daphne Kimani"
              width="1400"
              height="933"
              loading="lazy"
              decoding="async"
              className="aspect-[3/2] w-full rounded-xl border border-white/10 object-cover"
            />
          </figure>
          <div>
            <p className="eyebrow mb-2">Founders</p>
            <h2 className="text-2xl sm:text-3xl">Kevin Kimani and Daphne Kimani</h2>
            <p className="mt-3 text-muted">A couple in Nairobi who started Youth Spark Summit.</p>
            <dl className="mt-6 space-y-5">
              {FOUNDERS.map((f) => (
                <div key={f.name}>
                  <dt className="font-semibold">
                    {f.name} <span className="font-normal text-muted">· {f.role}</span>
                  </dt>
                  <dd className="mt-1 text-muted">{f.bio}</dd>
                </div>
              ))}
            </dl>
            <Link to="/about" className="link-inline mt-6 inline-flex min-h-[48px] items-center">
              More about us
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Current month calendar preview */}
      <section className="section border-t border-white/10">
        <div className="wrap grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="eyebrow mb-2">Calendar</p>
            <h2 className="text-2xl sm:text-3xl">Dates we have on record</h2>
            <p className="lead mt-3">Tap a highlighted day to open that gathering.</p>
            <Link to="/events" className="btn-ghost mt-6">
              Open the full calendar
            </Link>
          </div>
          <MonthCalendar items={items} month={month} controls={false} />
        </div>
      </section>

      {/* 8. Stay in touch */}
      <section className="section border-t border-white/10">
        <div className="wrap">
          <p className="eyebrow mb-2">Stay in touch</p>
          <h2 className="mb-6 text-2xl sm:text-3xl">Follow, watch, call, write</h2>
          <SocialRow />
          <p className="mt-6 text-sm text-muted">{SITE.noRegistrationLine}</p>
        </div>
      </section>
    </>
  );
};

export default Home;
