import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useGatherings } from '../lib/GatheringsContext';
import { isUpcoming, newestFirst, oldestFirst } from '../lib/gatherings';
import { PROGRAMS, SITE } from '../data/site';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '../components/BrandIcons';
import { GatheringCard } from '../components/GatheringCard';
import { EmptyState, PageHeader } from '../components/PageParts';

const Events = () => {
  const { items } = useGatherings();
  const [yearFilter, setYearFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');

  const visibleItems = items.filter((g) => {
    const matchYear = yearFilter === 'all' || String(g.date).startsWith(yearFilter);
    const matchProgram = programFilter === 'all' || g.program === programFilter;
    return matchYear && matchProgram;
  });

  const upcoming = visibleItems.filter(isUpcoming).sort(oldestFirst);
  const archive = visibleItems.filter((g) => !isUpcoming(g)).sort(newestFirst);
  const years = [...new Set(archive.map((g) => String(g.date).slice(0, 4)))].sort().reverse();
  const hasFilters = yearFilter !== 'all' || programFilter !== 'all';

  return (
    <>
      <Helmet>
        <title>Events &amp; Gatherings — Youth Spark Summit</title>
        <meta
          name="description"
          content="Explore past and upcoming Youth Spark Summit gatherings in Nairobi: the annual Summit, monthly Nexus, NXT Africa Forum, Reconstructive Leadership, Let Her Conference, and Becoming Limitless."
        />
      </Helmet>

      <PageHeader eyebrow="Gatherings" title="Events &amp; archive">
        <p className="lead">
          Open any gathering for full photo galleries, talks, dates, and venues across Nairobi.
        </p>

        <div className="mt-6 flex flex-col items-start gap-3">
          <div className="inline-flex flex-wrap rounded-xl border border-white/10 bg-panel p-1" role="group" aria-label="Filter gatherings by year">
            {[
              { key: 'all', label: 'All years' },
              { key: '2026', label: '2026' },
              { key: '2025', label: '2025' },
            ].map((opt) => {
              const active = yearFilter === opt.key;
              const isYear = opt.key !== 'all';
              return (
                <button
                  key={opt.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setYearFilter(opt.key)}
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

          <div className="inline-flex flex-wrap gap-1 rounded-xl border border-white/10 bg-panel p-1" role="group" aria-label="Filter gatherings by program">
            <button
              type="button"
              aria-pressed={programFilter === 'all'}
              onClick={() => setProgramFilter('all')}
              className={`min-h-[44px] rounded-lg px-3.5 text-sm font-medium transition-colors ${
                programFilter === 'all'
                  ? 'bg-white/10 text-fg ring-1 ring-white/15'
                  : 'text-muted hover:text-fg'
              }`}
            >
              All programs
            </button>
            {PROGRAMS.map((p) => (
              <button
                key={p.slug}
                type="button"
                aria-pressed={programFilter === p.slug}
                onClick={() => setProgramFilter(p.slug)}
                className={`min-h-[44px] rounded-lg px-3.5 text-sm font-medium transition-colors ${
                  programFilter === p.slug
                    ? 'bg-white/10 text-fg ring-1 ring-white/15'
                    : 'text-muted hover:text-fg'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted">
              Showing {visibleItems.length} of {items.length} {items.length === 1 ? 'gathering' : 'gatherings'}
            </span>
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setYearFilter('all');
                  setProgramFilter('all');
                }}
                className="inline-flex min-h-[44px] items-center rounded-lg px-2.5 text-xs font-medium text-gold underline underline-offset-4 hover:text-gold-dark"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </PageHeader>

      {/* Upcoming gatherings or "What's next" channel banner */}
      <section className="section pb-0">
        <div className="wrap">
          {upcoming.length > 0 ? (
            <>
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <h2 className="text-2xl sm:text-3xl">Upcoming</h2>
                <span className="text-sm text-muted">
                  {upcoming.length} {upcoming.length === 1 ? 'gathering' : 'gatherings'}
                </span>
              </div>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((g) => (
                  <li key={g.slug}>
                    <GatheringCard gathering={g} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="card flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow mb-2">What’s next</p>
                <h2 className="text-xl sm:text-2xl">New gathering dates are shared first on our channels</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Join our WhatsApp community or follow Instagram and Facebook for upcoming dates and venues in Nairobi.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:shrink-0">
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  <WhatsAppIcon size={18} /> Join WhatsApp community
                </a>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <InstagramIcon size={18} className="text-gold" /> {SITE.instagramHandle}
                </a>
                <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <FacebookIcon size={18} className="text-gold" /> {SITE.facebookHandle}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Year-grouped visual archive */}
      <section className="section">
        <div className="wrap space-y-12">
          {years.length > 0 ? (
            years.map((yr) => {
              const inYear = archive.filter((g) => String(g.date).startsWith(yr));
              return (
                <div key={yr}>
                  <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                    <h2 className="text-2xl sm:text-3xl">{yr}</h2>
                    <span className="text-sm text-muted">
                      {inYear.length} {inYear.length === 1 ? 'gathering' : 'gatherings'}
                    </span>
                  </div>
                  <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {inYear.map((g) => (
                      <li key={g.slug}>
                        <GatheringCard gathering={g} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          ) : (
            !upcoming.length && (
              <EmptyState>
                <p>No gatherings match the selected filter.</p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      setYearFilter('all');
                      setProgramFilter('all');
                    }}
                    className="btn-ghost mt-4"
                  >
                    Reset filters
                  </button>
                )}
              </EmptyState>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default Events;
