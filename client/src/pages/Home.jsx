import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, CalendarDays, MapPin, Play } from 'lucide-react';
import { useGatherings } from '../lib/GatheringsContext';
import { formatDate, formatShort, newestFirst } from '../lib/gatherings';
import { BORROWED_COVERS, HERO_PHOTO, SITE, WATCH_REELS, programName } from '../data/site';
import FoundersSection from '../components/FoundersSection';
import SocialRow from '../components/SocialRow';
import VideoModal from '../components/VideoModal';

const LATEST_SLUG = 'nxt-africa-forum-2026';

const Home = () => {
  const { items } = useGatherings();
  const [year, setYear] = useState('all');
  const [activeVideo, setActiveVideo] = useState(null);

  const sorted = [...items].sort(newestFirst);
  const latest = items.find((g) => g.slug === LATEST_SLUG) || sorted[0];
  const latestWithFilm = sorted.find((g) => g.youtubeUrl) || {
    title: WATCH_REELS[0].title,
    youtubeUrl: WATCH_REELS[0].url,
  };

  const rooms = year === 'all' ? sorted : sorted.filter((g) => String(g.date).startsWith(year));

  return (
    <>
      <Helmet>
        <title>Youth Spark Summit — Gatherings for young leaders in Nairobi</title>
        <meta
          name="description"
          content="Youth Spark Summit hosts the annual Summit, monthly Nexus, NXT Africa Forum, Reconstructive Leadership, Let Her Conference, and Becoming Limitless in Nairobi."
        />
      </Helmet>

      {/* 1. Full-viewport photo hero with headline and one context line on darkened bottom edge */}
      <section className="relative flex min-h-[calc(100svh-72px)] items-end overflow-hidden border-b border-white/10 bg-ink">
        <img
          src={HERO_PHOTO}
          alt="Young people gathered at Youth Spark Summit in Nairobi"
          width="1600"
          height="1068"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/25"
          aria-hidden="true"
        />

        <div className="wrap relative z-10 pb-12 pt-24 sm:pb-16">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/70 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
            Nairobi · Youth Spark Summit
          </p>
          <h1 className="max-w-3xl text-4xl leading-[1.06] text-fg sm:text-6xl lg:text-7xl">
            Raising a generation that builds
          </h1>

          {latest && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg/85 sm:text-base">
              <Link to={`/events/${latest.slug}`} className="underline decoration-gold/50 underline-offset-4 hover:text-gold hover:decoration-gold">
                {latest.title}
              </Link>
              {' · '}
              {formatDate(latest)}
              {' · '}
              {latest.venue}
            </p>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                setActiveVideo({
                  label: latestWithFilm.title,
                  url: latestWithFilm.youtubeUrl,
                })
              }
              className="btn-gold w-full sm:w-auto"
            >
              <Play size={18} aria-hidden="true" /> Watch the gathering
            </button>
            <Link to="/events" className="btn-ghost w-full bg-ink/65 backdrop-blur-sm sm:w-auto">
              See all gatherings
            </Link>
          </div>
        </div>
      </section>

      {/* 2. One pathway */}
      <section className="border-b border-white/10 bg-panel">
        <div className="wrap py-8 sm:py-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted">One movement, six rooms</p>
          <nav aria-label="Movement rhythm" className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {[
              ['/programs/youth-spark-summit', 'Summit'],
              ['/programs/youth-spark-nexus', 'Nexus'],
              ['/programs/nxt-africa-forum', 'NXT Africa'],
              ['/programs/reconstructive-leadership', 'Reconstructive'],
              ['/programs/let-her', 'Let Her'],
              ['/programs/becoming-limitless', 'Becoming Limitless'],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="inline-flex min-h-[44px] items-center rounded-full border border-white/10 bg-ink/80 px-4 text-sm font-medium text-fg transition-colors hover:border-gold hover:text-gold"
              >
                {label}
              </Link>
            ))}
            <ArrowRight size={16} className="hidden text-muted sm:inline" aria-hidden="true" />
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-full border border-gold/40 bg-gold/10 px-4 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              WhatsApp Community
            </a>
          </nav>
        </div>
      </section>

      {/* 3. Watch & Relive — three stills, inline video modal */}
      <section className="section border-b border-white/10">
        <div className="wrap">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">Films</p>
              <h2 className="text-2xl sm:text-4xl">Watch &amp; Relive</h2>
            </div>
            <a
              href={SITE.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center text-sm text-muted underline underline-offset-4 hover:text-gold"
            >
              Full YouTube channel
            </a>
          </div>

          <ul className="grid gap-5 md:grid-cols-3">
            {WATCH_REELS.map((reel) => (
              <li key={reel.slug}>
                <button
                  type="button"
                  onClick={() => setActiveVideo({ label: `${reel.title} — ${reel.theme}`, url: reel.url })}
                  className="card group flex h-full w-full flex-col overflow-hidden text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-ink">
                    <img
                      src={reel.image}
                      alt={reel.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className="absolute bottom-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink/85 text-fg ring-1 ring-white/25 transition-colors group-hover:bg-gold group-hover:text-ink"
                      aria-hidden="true"
                    >
                      <Play size={18} className="translate-x-0.5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-5">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted">{reel.theme}</span>
                    <h3 className="text-lg text-fg group-hover:text-gold">{reel.title}</h3>
                    <p className="mt-1 text-sm text-muted">{reel.meta}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Rooms — switcher for 2026 and 2025, borrowed photos when cover is blank */}
      <section className="section border-b border-white/10">
        <div className="wrap">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">Archive</p>
              <h2 className="text-2xl sm:text-4xl">Rooms we have held</h2>
            </div>

            <div className="inline-flex rounded-xl border border-white/10 bg-panel p-1" role="group" aria-label="Filter rooms by year">
              {[
                { key: 'all', label: 'All' },
                { key: '2026', label: '2026' },
                { key: '2025', label: '2025' },
              ].map((opt) => {
                const active = year === opt.key;
                const isYear = opt.key !== 'all';
                return (
                  <button
                    key={opt.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setYear(opt.key)}
                    className={`min-h-[44px] rounded-lg px-4 text-sm font-semibold transition-colors ${
                      active
                        ? isYear
                          ? 'bg-gold text-ink shadow-sm'
                          : 'bg-white/10 text-fg ring-1 ring-white/15'
                        : 'text-muted hover:text-fg'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((g) => {
              const photo = g.cover || BORROWED_COVERS[g.slug];
              return (
                <li key={g.slug}>
                  <Link
                    to={`/events/${g.slug}`}
                    className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
                  >
                    {photo && (
                      <div className="aspect-[4/3] w-full overflow-hidden border-b border-white/10 bg-ink">
                        <img
                          src={photo}
                          alt={g.title}
                          width="800"
                          height="600"
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col gap-2.5 p-5">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted">
                        {programName(g.program)}
                      </span>
                      <h3 className="text-lg leading-snug text-fg group-hover:text-gold">{g.title}</h3>
                      <p className="mt-auto flex items-start gap-2 pt-2 text-sm text-muted">
                        <CalendarDays size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{formatShort(g)}</span>
                      </p>
                      <p className="flex items-start gap-2 text-sm text-muted">
                        <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{g.venue}</span>
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 5. Founders, then social platforms and direct reach */}
      <section className="section bg-panel">
        <div className="wrap">
          <FoundersSection showMoreLink />

          <div className="mt-12 border-t border-white/10 pt-10">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted">Follow &amp; reach us</p>
            <SocialRow />
            <p className="mt-6 text-sm text-muted">{SITE.noRegistrationLine}</p>
          </div>
        </div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
};

export default Home;
