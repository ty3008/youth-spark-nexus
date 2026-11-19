// Date and list helpers for gatherings. Dates are plain strings: YYYY-MM-DD, or YYYY-MM when only the month is known.
// Everything is computed in UTC so a visitor's time zone cannot move a date.

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const WEEKDAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const isMonthOnly = (g) => g.datePrecision === 'month' || String(g.date).length === 7;
export const isUpcoming = (g) => g.status === 'upcoming';

const parts = (g) => {
  const [y, m, d] = String(g.date).split('-').map(Number);
  return { y, m, d: isMonthOnly(g) ? null : d };
};

export function formatDate(g) {
  const { y, m, d } = parts(g);
  if (d == null) return `${MONTHS[m - 1]} ${y}`;
  const weekday = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${weekday} ${d} ${MONTHS[m - 1]} ${y}`;
}

export function formatShort(g) {
  const { y, m, d } = parts(g);
  const mon = MONTHS[m - 1].slice(0, 3);
  return d == null ? `${mon} ${y}` : `${d} ${mon} ${y}`;
}

export const monthKey = (g) => String(g.date).slice(0, 7);
export const dayOf = (g) => parts(g).d;

export const sortKey = (g) => (isMonthOnly(g) ? `${monthKey(g)}-28` : g.date);
export const newestFirst = (a, b) => sortKey(b).localeCompare(sortKey(a));
export const oldestFirst = (a, b) => sortKey(a).localeCompare(sortKey(b));

export function monthLabel(key) {
  const [y, m] = key.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function shiftMonth(key, delta) {
  const [y, m] = key.split('-').map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

export function monthsWithItems(items) {
  return [...new Set(items.map(monthKey))].sort().reverse();
}

// The month the calendar opens on: the nearest upcoming gathering, otherwise the most recent one held.
export function defaultMonth(items) {
  const upcoming = items.filter(isUpcoming).sort(oldestFirst)[0];
  if (upcoming) return monthKey(upcoming);
  const latest = [...items].sort(newestFirst)[0];
  if (latest) return monthKey(latest);
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
}

// Cells for a Monday-first month grid. null = blank cell.
export function monthGrid(key) {
  const [y, m] = key.split('-').map(Number);
  const firstDow = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  const offset = (firstDow + 6) % 7;
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

const clean = (v) => (typeof v === 'string' ? v : '');
const list = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string' && x.trim()) : []);
// Links are only ever rendered when they are plain web links.
const webUrl = (v) => (/^https?:\/\/\S+$/i.test(clean(v)) ? clean(v) : '');
const videoList = (v) =>
  Array.isArray(v)
    ? v
        .map((x) => ({ label: clean(x && x.label).trim(), url: webUrl(x && x.url) }))
        .filter((x) => x.label && x.url)
    : [];

// Turns an API record (or a seed record) into the shape the UI expects. Returns null if it cannot be shown.
export function normalizeGathering(raw) {
  if (!raw || !raw.slug || !raw.program || !raw.title || !raw.date) return null;
  return {
    id: raw._id || raw.slug,
    slug: raw.slug,
    program: raw.program,
    title: raw.title,
    date: raw.date,
    datePrecision: raw.datePrecision === 'month' || String(raw.date).length === 7 ? 'month' : 'day',
    time: clean(raw.time),
    venue: clean(raw.venue),
    status: raw.status === 'upcoming' ? 'upcoming' : 'held',
    summary: clean(raw.summary),
    details: list(raw.details),
    speakers: list(raw.speakers),
    poster: clean(raw.poster),
    cover: clean(raw.cover),
    gallery: list(raw.gallery),
    youtubeUrl: webUrl(raw.youtubeUrl),
    instagramUrl: webUrl(raw.instagramUrl),
    videos: videoList(raw.videos),
  };
}
