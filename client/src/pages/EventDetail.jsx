import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CalendarDays, ChevronRight, Clock, MapPin, Play } from 'lucide-react';
import { useGatherings } from '../lib/GatheringsContext';
import { formatDate } from '../lib/gatherings';
import { SITE, programBySlug } from '../data/site';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from '../components/BrandIcons';
import { StatusChip } from '../components/GatheringCard';
import Gallery from '../components/Gallery';
import VideoModal from '../components/VideoModal';
import { EmptyState } from '../components/PageParts';
import NotFound from './NotFound';

function findSpeakerVideo(speakerName, videos) {
  const cleanSpeaker = speakerName.replace(/\s*\(.*?\)\s*/g, '').trim().toLowerCase();
  if (!cleanSpeaker) return null;
  return videos.find((v) => v.label.toLowerCase().includes(cleanSpeaker)) || null;
}

const EventDetail = () => {
  const { slug } = useParams();
  const { items } = useGatherings();
  const [activeVideo, setActiveVideo] = useState(null);

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

      {/* Event header: pairs the headline with the official gathering poster when present */}
      <section className="border-b border-white/10">
        <div className="wrap py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted">
            <Link to="/" className="inline-flex min-h-[32px] items-center hover:text-gold">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link to="/events" className="inline-flex min-h-[32px] items-center hover:text-gold">Events</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page" className="text-fg">{g.title}</span>
          </nav>

          <div className={g.poster ? 'grid items-center gap-8 md:grid-cols-12' : ''}>
            <div className={g.poster ? 'md:col-span-8' : ''}>
              <h1 className="max-w-3xl text-3xl leading-tight sm:text-5xl">{g.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <StatusChip gathering={g} />
                {program && (
                  <Link to={`/programs/${program.slug}`} className="chip-program hover:border-gold">
                    {program.name}
                  </Link>
                )}
              </div>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} className="text-gold" aria-hidden="true" />
                  {formatDate(g)}
                </span>
                {g.time && (
                  <span className="inline-flex items-center gap-2">
                    <Clock size={16} className="text-gold" aria-hidden="true" />
                    {g.time}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} className="text-gold" aria-hidden="true" />
                  {g.venue}
                </span>
              </div>
            </div>

            {g.poster && (
              <figure className="md:col-span-4">
                <img
                  src={g.poster}
                  alt={`${g.title} official poster`}
                  decoding="async"
                  className="mx-auto w-full max-w-xs rounded-xl border border-white/10 bg-panel object-cover shadow-2xl md:max-w-none"
                />
              </figure>
            )}
          </div>
        </div>
      </section>

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

            {/* Primary film and Instagram recap controls sit under the summary and above the gallery. */}
            {(g.youtubeUrl || g.instagramUrl) && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {g.youtubeUrl && (
                  <button
                    type="button"
                    onClick={() => setActiveVideo({ label: g.title, url: g.youtubeUrl })}
                    className="btn-gold"
                  >
                    <Play size={18} aria-hidden="true" /> Watch the gathering
                  </button>
                )}
                {g.instagramUrl && (
                  <a href={g.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <InstagramIcon size={18} className="text-gold" /> See the recap
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
                      <button
                        type="button"
                        onClick={() => setActiveVideo(v)}
                        className="inline-flex min-h-[48px] items-center gap-2 text-left text-gold underline underline-offset-4 hover:text-gold-dark"
                      >
                        <Play size={15} className="shrink-0" aria-hidden="true" />
                        <span>{v.label}</span>
                      </button>
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
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.speakers.map((speaker) => {
                    const clip = findSpeakerVideo(speaker, g.videos);
                    return clip ? (
                      <li key={speaker}>
                        <button
                          type="button"
                          onClick={() => setActiveVideo(clip)}
                          className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-white/15 bg-panel px-4 text-sm font-medium text-fg transition-colors hover:border-gold hover:text-gold"
                        >
                          <Play size={14} className="text-gold" aria-hidden="true" />
                          <span>{speaker}</span>
                        </button>
                      </li>
                    ) : (
                      <li
                        key={speaker}
                        className="inline-flex min-h-[48px] items-center rounded-lg border border-white/10 bg-ink px-4 text-sm text-muted"
                      >
                        {speaker}
                      </li>
                    );
                  })}
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

            <div className="card space-y-2.5 p-5">
              <h2 className="text-lg">Follow &amp; reach us</h2>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full justify-start">
                <InstagramIcon size={18} className="text-gold" /> {SITE.instagramHandle}
              </a>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full justify-start">
                <FacebookIcon size={18} className="text-gold" /> Facebook · {SITE.facebookHandle}
              </a>
              <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full justify-start">
                <YouTubeIcon size={18} className="text-gold" /> YouTube channel
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full justify-start">
                <WhatsAppIcon size={18} className="text-gold" /> Join WhatsApp community
              </a>
              <a href={SITE.whatsappDirect} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full justify-start">
                <WhatsAppIcon size={18} className="text-gold" /> Reach us on WhatsApp
              </a>
            </div>

            <Link to="/events" className="link-inline inline-flex min-h-[48px] items-center">
              Back to all gatherings
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="wrap py-6 text-sm text-muted">{SITE.noRegistrationLine}</div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
};

export default EventDetail;
