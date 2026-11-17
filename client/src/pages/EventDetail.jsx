import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CalendarDays, Camera, Clock, ExternalLink, MapPin, Play } from 'lucide-react';
import { useGatherings } from '../lib/GatheringsContext';
import { formatDate } from '../lib/gatherings';
import { SITE, programBySlug } from '../data/site';
import { StatusChip } from '../components/GatheringCard';
import Gallery from '../components/Gallery';
import { EmptyState, PageHeader } from '../components/PageParts';
import NotFound from './NotFound';

const EventDetail = () => {
  const { slug } = useParams();
  const { items } = useGatherings();
  const g = items.find((x) => x.slug === slug);
  if (!g) return <NotFound />;

  const program = programBySlug(g.program);
  const hasFilm = Boolean(g.youtubeUrl || g.instagramUrl || g.videos.length);

  return (
    <>
      <Helmet>
        <title>{`${g.title} — Youth Spark Summit`}</title>
        <meta name="description" content={`${formatDate(g)}. ${g.venue}. ${g.summary}`} />
      </Helmet>

      <PageHeader
        crumbs={[{ label: 'Events', to: '/events' }, { label: g.title }]}
        title={g.title}
      >
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip gathering={g} />
          {program && (
            <Link to={`/programs/${program.slug}`} className="chip-program hover:border-gold">
              {program.name}
            </Link>
          )}
        </div>
      </PageHeader>

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {g.cover && (
              <figure className="mb-8">
                <img
                  src={g.cover}
                  alt={g.title}
                  width="1200"
                  height="900"
                  decoding="async"
                  className="aspect-[16/10] w-full rounded-xl border border-white/10 object-cover"
                />
              </figure>
            )}
            <p className="text-lg leading-relaxed">{g.summary}</p>

            {/* Films and recap links sit under the summary and above the gallery. */}
            {(g.youtubeUrl || g.instagramUrl) && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {g.youtubeUrl && (
                  <a href={g.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
                    <Play size={18} aria-hidden="true" /> Watch the gathering
                  </a>
                )}
                {g.instagramUrl && (
                  <a href={g.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <Camera size={18} aria-hidden="true" /> See the recap
                  </a>
                )}
              </div>
            )}

            {g.videos.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg">More from this gathering</h2>
                <ul className="mt-3 space-y-1">
                  {g.videos.map((v) => (
                    <li key={v.url}>
                      <a
                        href={v.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[48px] items-center gap-2 text-gold underline underline-offset-4 hover:text-gold-dark"
                      >
                        {v.label}
                        <ExternalLink size={14} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!hasFilm && <p className="mt-6 text-sm text-muted">The film from this gathering will be added.</p>}

            {g.details.length > 0 && (
              <ul className="mt-8 list-disc space-y-2 pl-5 text-muted">
                {g.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            )}

            {g.speakers.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg">Speakers on the official highlights</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                  {g.speakers.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            <h2 className="mb-4 mt-12 text-xl">Photos</h2>
            {g.gallery.length ? (
              <Gallery images={g.gallery} alt={g.title} />
            ) : (
              <EmptyState>Photos from this gathering will be added.</EmptyState>
            )}
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <dl className="card space-y-4 p-5">
              <div className="flex gap-3">
                <CalendarDays size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">Date</dt>
                  <dd className="font-medium">{formatDate(g)}</dd>
                </div>
              </div>
              {g.time && (
                <div className="flex gap-3">
                  <Clock size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Time</dt>
                    <dd className="font-medium">{g.time}</dd>
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">Venue</dt>
                  <dd className="font-medium">{g.venue}</dd>
                </div>
              </div>
            </dl>

            <div className="card space-y-3 p-5">
              <h2 className="text-lg">Follow us</h2>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full">
                <Camera size={18} aria-hidden="true" /> Follow {SITE.instagramHandle}
              </a>
              <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full">
                <Play size={18} aria-hidden="true" /> Our YouTube channel
              </a>
            </div>

            <Link to="/events" className="link-inline inline-flex min-h-[48px] items-center">
              Back to the calendar
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="wrap py-6 text-sm text-muted">{SITE.noRegistrationLine}</div>
      </section>
    </>
  );
};

export default EventDetail;
