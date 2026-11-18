import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useGatherings } from '../lib/GatheringsContext';
import {
  defaultMonth,
  isMonthOnly,
  isUpcoming,
  monthKey,
  monthLabel,
  monthsWithItems,
  newestFirst,
  oldestFirst,
} from '../lib/gatherings';
import { PROGRAMS, SITE } from '../data/site';
import MonthCalendar from '../components/MonthCalendar';
import { GatheringRow } from '../components/GatheringCard';
import { EmptyState, PageHeader } from '../components/PageParts';

const Events = () => {
  const { items } = useGatherings();
  const [picked, setPicked] = useState(null);
  const [yearFilter, setYearFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');

  const visibleItems = items.filter((g) => {
    const matchYear = yearFilter === 'all' || String(g.date).startsWith(yearFilter);
    const matchProgram = programFilter === 'all' || g.program === programFilter;
    return matchYear && matchProgram;
  });

  const month = picked ?? defaultMonth(visibleItems);
  const upcoming = visibleItems.filter(isUpcoming).sort(oldestFirst);
  const thisMonth = visibleItems.filter((g) => monthKey(g) === month).sort(oldestFirst);
  const monthOnlyNote = thisMonth.some(isMonthOnly);
  const everything = [...visibleItems].sort(newestFirst);
  const availableMonths = monthsWithItems(visibleItems);

  const handleYearChange = (y) => {
    setYearFilter(y);
    setPicked(null);
  };

  const handleProgramChange = (slug) => {
    setProgramFilter(slug);
    setPicked(null);
  };

  return (
    <>
      <Helmet>
        <title>Events calendar — Youth Spark Summit</title>
        <meta
          name="description"
          content="Dates and venues for Youth Spark Summit gatherings in Nairobi: the annual Summit, monthly Nexus, NXT Africa Forum, and Reconstructive Leadership."
        />
      </Helmet>

      <PageHeader eyebrow="Calendar" title="Our gatherings">
        <p className="lead">Tap a highlighted day, or pick from the list. {SITE.noRegistrationLine}</p>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gatherings by year">
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
                  onClick={() => handleYearChange(opt.key)}
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

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gatherings by program">
            <button
              type="button"
              aria-pressed={programFilter === 'all'}
              onClick={() => handleProgramChange('all')}
              className={`min-h-[48px] rounded-lg border px-4 text-sm font-medium transition-colors ${
                programFilter === 'all'
                  ? 'border-white/40 bg-white/10 text-fg'
                  : 'border-white/15 bg-panel text-muted hover:border-white/30 hover:text-fg'
              }`}
            >
              All programs
            </button>
            {PROGRAMS.map((p) => (
              <button
                key={p.slug}
                type="button"
                aria-pressed={programFilter === p.slug}
                onClick={() => handleProgramChange(p.slug)}
                className={`min-h-[48px] rounded-lg border px-4 text-sm font-medium transition-colors ${
                  programFilter === p.slug
                    ? 'border-white/40 bg-white/10 text-fg'
                    : 'border-white/15 bg-panel text-muted hover:border-white/30 hover:text-fg'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </PageHeader>

      <section className="section pb-0">
        <div className="wrap">
          <h2 className="mb-4 text-xl">Upcoming</h2>
          {upcoming.length ? (
            <ul className="grid gap-3 md:grid-cols-2">
              {upcoming.map((g) => (
                <li key={g.slug}>
                  <GatheringRow gathering={g} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState>
              The next date will appear here when we publish it. Follow{' '}
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link-inline">
                {SITE.instagramHandle}
              </a>
              .
            </EmptyState>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-4">
              <label htmlFor="month-jump" className="mb-1 block text-sm text-muted">
                Jump to a month with gatherings
              </label>
              <select
                id="month-jump"
                value={availableMonths.includes(month) ? month : ''}
                onChange={(e) => e.target.value && setPicked(e.target.value)}
                className="min-h-[48px] w-full rounded-lg border border-white/20 bg-panel px-3 text-fg"
              >
                {!availableMonths.includes(month) && <option value="">Choose a month</option>}
                {availableMonths.map((k) => (
                  <option key={k} value={k}>
                    {monthLabel(k)}
                  </option>
                ))}
              </select>
            </div>
            <MonthCalendar items={visibleItems} month={month} onMonthChange={setPicked} />
          </div>

          <div className="lg:col-span-5">
            <h2 className="mb-4 text-xl">Gatherings in {monthLabel(month)}</h2>
            {thisMonth.length ? (
              <ul className="space-y-3">
                {thisMonth.map((g) => (
                  <li key={g.slug}>
                    <GatheringRow gathering={g} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState>No gatherings are on record for this month.</EmptyState>
            )}
            {monthOnlyNote && (
              <p className="mt-3 text-sm text-muted">
                A gathering shown with only a month has no day on record, so it is listed here and not on a calendar day.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="wrap">
          <h2 className="mb-4 text-xl">All gatherings, newest first</h2>
          {everything.length ? (
            <ul className="grid gap-3 md:grid-cols-2">
              {everything.map((g) => (
                <li key={g.slug}>
                  <GatheringRow gathering={g} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState>No gatherings match the selected filter.</EmptyState>
          )}
        </div>
      </section>
    </>
  );
};

export default Events;
