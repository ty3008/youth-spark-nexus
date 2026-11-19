import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useGatherings } from '../lib/GatheringsContext';
import { newestFirst } from '../lib/gatherings';
import { SITE, programBySlug } from '../data/site';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from '../components/BrandIcons';
import { GatheringCard } from '../components/GatheringCard';
import Gallery from '../components/Gallery';
import { EmptyState, PageHeader } from '../components/PageParts';
import NotFound from './NotFound';

// One template for all program pages: /programs/:slug
const ProgramPage = () => {
  const { slug } = useParams();
  const program = programBySlug(slug);
  const { items } = useGatherings();
  if (!program) return <NotFound />;

  const gatherings = items.filter((g) => g.program === program.slug).sort(newestFirst);

  return (
    <>
      <Helmet>
        <title>{`${program.name} — Youth Spark Summit`}</title>
        <meta name="description" content={`${program.name}. ${program.blurb}`} />
      </Helmet>

      <PageHeader
        crumbs={[{ label: 'Programs', to: '/programs' }, { label: program.name }]}
        eyebrow={program.cadence}
        title={program.name}
      >
        <p className="lead">{program.blurb}</p>
        {program.facts.length > 0 && (
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            {program.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
      </PageHeader>

      <section className="section">
        <div className="wrap">
          <h2 className="mb-6 text-2xl">Gatherings</h2>
          {gatherings.length ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gatherings.map((g) => (
                <li key={g.slug}>
                  <GatheringCard gathering={g} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState>No gatherings are on record for this program yet.</EmptyState>
          )}
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="wrap">
          <h2 className="mb-6 text-2xl">Photos</h2>
          {program.photos ? (
            <Gallery images={program.photos.images} alt={program.photos.alt} caption={program.photos.caption} />
          ) : (
            <EmptyState>Photos will be added</EmptyState>
          )}
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="wrap">
          <h2 className="mb-6 text-2xl">Watch and follow</h2>
          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <YouTubeIcon size={18} className="text-gold" /> Watch on YouTube
            </a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <InstagramIcon size={18} className="text-gold" /> {SITE.instagramHandle}
            </a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <FacebookIcon size={18} className="text-gold" /> Facebook · {SITE.facebookHandle}
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WhatsAppIcon size={18} className="text-gold" /> Join WhatsApp community
            </a>
            <a href={SITE.whatsappDirect} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WhatsAppIcon size={18} className="text-gold" /> Reach us on WhatsApp
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">{SITE.noRegistrationLine}</p>
        </div>
      </section>
    </>
  );
};

export default ProgramPage;
