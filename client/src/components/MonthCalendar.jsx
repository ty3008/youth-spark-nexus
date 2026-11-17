import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WEEKDAY_SHORT, dayOf, formatDate, isMonthOnly, isUpcoming, monthGrid, monthKey, monthLabel, shiftMonth } from '../lib/gatherings';

// Month grid. Days with a gathering are links to /events/:slug. No forms, no modal.
// Held days are outlined in gold, upcoming days are filled gold.
const MonthCalendar = ({ items, month, onMonthChange, controls = true }) => {
  const inMonth = items.filter((g) => monthKey(g) === month && !isMonthOnly(g));
  const byDay = new Map();
  inMonth.forEach((g) => {
    const d = dayOf(g);
    byDay.set(d, [...(byDay.get(d) || []), g]);
  });
  const weeks = monthGrid(month);

  return (
    <div className="card p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        {controls ? (
          <button
            type="button"
            onClick={() => onMonthChange(shiftMonth(month, -1))}
            aria-label={`Previous month, ${monthLabel(shiftMonth(month, -1))}`}
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 hover:border-gold hover:text-gold"
          >
            <ChevronLeft size={22} />
          </button>
        ) : (
          <span className="h-12 w-12" aria-hidden="true" />
        )}
        <h3 className="text-center text-lg font-semibold" aria-live="polite">
          {monthLabel(month)}
        </h3>
        {controls ? (
          <button
            type="button"
            onClick={() => onMonthChange(shiftMonth(month, 1))}
            aria-label={`Next month, ${monthLabel(shiftMonth(month, 1))}`}
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 hover:border-gold hover:text-gold"
          >
            <ChevronRight size={22} />
          </button>
        ) : (
          <span className="h-12 w-12" aria-hidden="true" />
        )}
      </div>

      <table className="w-full table-fixed border-separate border-spacing-1" aria-label={`Calendar for ${monthLabel(month)}`}>
        <thead>
          <tr>
            {WEEKDAY_SHORT.map((d) => (
              <th key={d} scope="col" className="pb-1 text-center text-[11px] font-medium uppercase tracking-wide text-muted">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => {
                if (day == null) return <td key={di} />;
                const hits = byDay.get(day);
                if (!hits) {
                  return (
                    <td key={di} className="h-12 rounded-md text-center align-middle text-sm text-muted">
                      {day}
                    </td>
                  );
                }
                const first = hits[0];
                const upcoming = hits.some(isUpcoming);
                return (
                  <td key={di} className="h-12 p-0 text-center align-middle">
                    <Link
                      to={`/events/${first.slug}`}
                      aria-label={`${formatDate(first)}: ${hits.map((h) => h.title).join('; ')} (${upcoming ? 'upcoming' : 'held'})`}
                      className={`flex h-12 w-full items-center justify-center rounded-md text-sm font-semibold ${
                        upcoming
                          ? 'bg-gold text-ink hover:bg-gold-dark'
                          : 'border border-gold bg-gold/15 text-gold hover:bg-gold/30'
                      }`}
                    >
                      {day}
                    </Link>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-sm border border-gold bg-gold/15" aria-hidden="true" /> Held
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-sm bg-gold" aria-hidden="true" /> Upcoming
        </span>
      </p>
    </div>
  );
};

export default MonthCalendar;
