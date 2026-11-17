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
import { SITE } from '../data/site';
import MonthCalendar from '../components/MonthCalendar';
import { GatheringRow } from '../components/GatheringCard';
import { EmptyState, PageHeader } from '../components/PageParts';

const Events = () => {
  const { items } = useGatherings();
  const [picked, setPicked] = useState(null);
  const month = picked ?? defaultMonth(items);

  const upcoming = items.filter(isUpcoming).sort(oldestFirst);
  const thisMonth = items.filter((g) => monthKey(g) === month).sort(oldestFirst);
  const monthOnlyNote = thisMonth.some(isMonthOnly);
  const everything = [...items].sort(newestFirst);

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
                value={monthsWithItems(items).includes(month) ? month : ''}
                onChange={(e) => e.target.value && setPicked(e.target.value)}
                className="min-h-[48px] w-full rounded-lg border border-white/20 bg-panel px-3 text-fg"
              >
                {!monthsWithItems(items).includes(month) && <option value="">Choose a month</option>}
                {monthsWithItems(items).map((k) => (
                  <option key={k} value={k}>
                    {monthLabel(k)}
                  </option>
                ))}
              </select>
            </div>
            <MonthCalendar items={items} month={month} onMonthChange={setPicked} />
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
          <ul className="grid gap-3 md:grid-cols-2">
            {everything.map((g) => (
              <li key={g.slug}>
                <GatheringRow gathering={g} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Events;
