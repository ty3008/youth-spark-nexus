import { Link } from 'react-router-dom';
import { CalendarDays, Camera, Clock, MapPin, Play } from 'lucide-react';
import { formatDate, formatShort, isUpcoming } from '../lib/gatherings';
import { BORROWED_COVERS, programName } from '../data/site';

export const StatusChip = ({ gathering }) =>
  isUpcoming(gathering) ? <span className="chip-upcoming">Upcoming</span> : <span className="chip-held">Held</span>;

// Uses the gathering's cover photo, falling back to a verified program photo when a dedicated cover has not been uploaded.
export const CoverOrPanel = ({ gathering, eager = false }) => {
  const photo = gathering.cover || BORROWED_COVERS[gathering.slug];
  return photo ? (
    <div className="aspect-[4/3] w-full overflow-hidden border-b border-white/10 bg-ink">
      <img
        src={photo}
        alt={gathering.title}
        width="800"
        height="600"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  ) : (
    <div className="flex aspect-[4/3] w-full flex-col justify-between border-b border-white/10 bg-ink p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-gold">{formatShort(gathering)}</span>
        <span className="text-xs text-muted">{programName(gathering.program)}</span>
      </div>
      <p className="text-base font-semibold leading-snug text-fg">{gathering.title}</p>
      <p className="text-xs text-muted">{gathering.venue}</p>
    </div>
  );
};

export const GatheringCard = ({ gathering: g }) => {
  const photoCount = g.gallery?.length || 0;
  const videoCount = (g.youtubeUrl ? 1 : 0) + (g.videos?.length || 0);

  return (
    <Link
      to={`/events/${g.slug}`}
      className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
    >
      <CoverOrPanel gathering={g} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip-program">{programName(g.program)}</span>
          <StatusChip gathering={g} />
        </div>
        <h3 className="text-lg leading-snug text-fg transition-colors group-hover:text-gold">{g.title}</h3>
        {g.summary && <p className="line-clamp-2 text-sm leading-relaxed text-muted">{g.summary}</p>}
        <div className="mt-auto space-y-1.5 pt-2">
          <p className="flex items-start gap-2 text-sm text-muted">
            <CalendarDays size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            <span>{formatShort(g)}</span>
          </p>
          <p className="flex items-start gap-2 text-sm text-muted">
            <MapPin size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            <span>{g.venue}</span>
          </p>
        </div>
        {(photoCount > 0 || videoCount > 0 || g.poster) && (
          <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-3 text-xs font-medium text-muted">
            {photoCount > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Camera size={14} className="text-gold" aria-hidden="true" />
                {photoCount} photos
              </span>
            )}
            {videoCount > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Play size={14} className="text-gold" aria-hidden="true" />
                {videoCount === 1 ? 'Watch film' : `${videoCount} videos`}
              </span>
            )}
            {g.poster && photoCount === 0 && videoCount === 0 && <span>Official poster</span>}
          </div>
        )}
      </div>
    </Link>
  );
};

// Compact row kept for list summaries.
export const GatheringRow = ({ gathering: g }) => (
  <Link
    to={`/events/${g.slug}`}
    className="card group flex min-h-[64px] flex-col gap-1.5 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/50"
  >
    <div className="flex flex-wrap items-center gap-2">
      <StatusChip gathering={g} />
      <span className="text-sm font-medium text-gold">{formatDate(g)}</span>
    </div>
    <span className="text-base font-semibold leading-snug text-fg group-hover:text-gold">{g.title}</span>
    <span className="flex items-start gap-2 text-sm text-muted">
      <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>{g.venue}</span>
    </span>
    {g.time && (
      <span className="flex items-center gap-2 text-sm text-muted">
        <Clock size={16} aria-hidden="true" />
        {g.time}
      </span>
    )}
  </Link>
);
