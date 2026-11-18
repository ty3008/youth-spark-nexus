import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, CalendarDays, MapPin, Play } from 'lucide-react';
import { useGatherings } from '../lib/GatheringsContext';
import { formatDate, formatShort, newestFirst } from '../lib/gatherings';
import { BORROWED_COVERS, FOUNDERS, FOUNDERS_PHOTO, HERO_PHOTO, SITE, WATCH_REELS, programName } from '../data/site';
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
          content="Youth Spark Summit hosts the annual Summit, monthly Nexus, NXT Africa Forum, and Reconstructive Leadership in Nairobi. See dates and past gatherings. No registration on this site."
        />
      </Helmet>

      {/* 1. Full-viewport photo hero with headline and one context line on darkened bottom edge */}
      <section className="relative flex min-h-[calc(100svh-64px)] items-end overflow-hidden border-b border-white/10 bg-ink">
        <img
          src={HERO_PHOTO}
          alt="Young people seated in Nairobi Cinema at Youth Spark Summit 2025"
          width="1600"
          height="1068"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/20"
          aria-hidden="true"
        />

        <div className="wrap relative z-10 pb-10 pt-24 sm:pb-16">
          <h1 className="max-w-3xl text-4xl leading-[1.08] text-fg sm:text-6xl lg:text-7xl">
            Raising a generation that builds
          </h1>

          {latest && (
            <p className="mt-4 max-w-2xl text-sm text-fg/85 sm:text-base">
              <Link to={`/events/${latest.slug}`} className="underline decoration-white/30 underline-offset-4 hover:text-gold hover:decoration-gold">
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
              className="btn-gold"
            >
              <Play size={18} aria-hidden="true" /> Watch the gathering
            </button>
            <Link to="/events" className="btn-ghost bg-ink/60 backdrop-blur-sm">
              See the calendar
            </Link>
          </div>
        </div>
      </section>

      {/* 2. One pathway */}
      <section className="border-b border-white/10 bg-panel">
        <div className="wrap py-8 sm:py-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted">One movement, four rooms</p>
          <nav aria-label="Movement rhythm" className="flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-medium sm:text-2xl">
            <Link to="/programs/youth-spark-summit" className="inline-flex min-h-[48px] items-center text-fg transition-colors hover:text-gold">
              Summit
            </Link>
            <ArrowRight size={18} className="text-muted" aria-hidden="true" />
            <Link to="/programs/youth-spark-nexus" className="inline-flex min-h-[48px] items-center text-fg transition-colors hover:text-gold">
              Nexus
            </Link>
            <ArrowRight size={18} className="text-muted" aria-hidden="true" />
            <span className="inline-flex min-h-[48px] flex-wrap items-center gap-2">
              <Link to="/programs/nxt-africa-forum" className="text-fg transition-colors hover:text-gold">
                NXT
              </Link>
              <span className="text-muted">and</span>
              <Link to="/programs/reconstructive-leadership" className="text-fg transition-colors hover:text-gold">
                Reconstructive Leadership
              </Link>
            </span>
            <ArrowRight size={18} className="text-muted" aria-hidden="true" />
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center text-fg underline decoration-white/30 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
            >
              WhatsApp
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
              className="inline-flex min-h-[48px] items-center text-sm text-muted underline underline-offset-4 hover:text-fg"
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
                  className="card group flex h-full w-full flex-col overflow-hidden text-left transition-colors hover:border-white/30"
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

            <div className="inline-flex gap-2" role="group" aria-label="Filter rooms by year">
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
                    className={`min-h-[48px] rounded-lg border px-4 text-sm font-semibold transition-colors ${
                      active
                        ? isYear
                          ? 'border-gold bg-gold text-ink'
                          : 'border-white/40 bg-white/10 text-fg'
                        : 'border-white/15 bg-panel text-muted hover:border-white/30 hover:text-fg'
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
                    className="card group flex h-full flex-col overflow-hidden transition-colors hover:border-white/30"
                  >
                    {photo && (
                      <img
                        src={photo}
                        alt={g.title}
                        width="800"
                        height="600"
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full border-b border-white/10 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
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

      {/* 5. Founders, then WhatsApp, email, and phone */}
      <section className="section bg-panel">
        <div className="wrap">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
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
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">Founders</p>
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
              <Link to="/about" className="mt-6 inline-flex min-h-[48px] items-center text-sm text-fg underline underline-offset-4 hover:text-gold">
                More about us
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-10">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted">Reach us</p>
            <SocialRow keys={['wa', 'mail', 'tel']} />
            <p className="mt-6 text-sm text-muted">{SITE.noRegistrationLine}</p>
          </div>
        </div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
};

export default Home;
