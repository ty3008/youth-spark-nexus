import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Check, Copy, Mail } from 'lucide-react';
import { PARTNERSHIP_DECK, PROGRAMS, SITE } from '../data/site';
import { PageHeader } from '../components/PageParts';
import { WhatsAppIcon } from '../components/BrandIcons';

const PARTNER_CHANNELS = [
  { label: 'Corporate or Sponsor Inquiry', subject: 'Corporate / Sponsor Partnership — Youth Spark Summit' },
  { label: 'Speaker or Mentor Inquiry', subject: 'Speaker / Mentor Partnership — Youth Spark Summit' },
  { label: 'Church or Faith Group', subject: 'Church / Faith Group Partnership — Youth Spark Summit' },
  { label: 'University or Student Group', subject: 'University Partnership — Youth Spark Summit' },
];

const Partnerships = () => {
  const [copied, setCopied] = useState('');

  const copyValue = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(''), 2000);
    } catch {
      /* clipboard may be blocked in insecure context */
    }
  };

  return (
    <>
      <Helmet>
        <title>Partner with us — Youth Spark Summit</title>
        <meta
          name="description"
          content="Strategic partnerships with Youth Spark Summit across faith groups, universities, corporates, and NGOs. Email or message us directly on WhatsApp."
        />
      </Helmet>

      <PageHeader crumbs={[{ label: 'Partner' }]} eyebrow="Partner" title="Strategic partnerships">
        <p className="lead">
          Partner with Youth Spark Summit to support young leaders in Nairobi across faith, leadership, enterprise, and the creative economy.
        </p>
      </PageHeader>

      <section className="section border-b border-white/10 bg-panel">
        <div className="wrap">
          <ul className="grid gap-4 md:grid-cols-3">
            {PARTNERSHIP_DECK.map((item) => (
              <li key={item.title} className="card bg-ink p-6">
                <h2 className="text-lg text-gold">{item.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{item.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl">Start a conversation</h2>
            <p className="mt-3 text-muted">Choose a topic below to open a pre-addressed email, or message us directly on WhatsApp.</p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {PARTNER_CHANNELS.map((ch) => (
                <a
                  key={ch.label}
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(ch.subject)}`}
                  className="btn-ghost justify-start text-left text-xs sm:text-sm"
                >
                  <Mail size={16} className="shrink-0 text-gold" aria-hidden="true" />
                  <span>{ch.label}</span>
                </a>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <a href={`mailto:${SITE.email}?subject=${encodeURIComponent('Partnership with Youth Spark Summit')}`} className="btn-gold flex-1">
                  <Mail size={18} aria-hidden="true" /> Email {SITE.email}
                </a>
                <button
                  type="button"
                  onClick={() => copyValue('email', SITE.email)}
                  aria-label="Copy email address"
                  className="btn-ghost !px-4"
                >
                  {copied === 'email' ? <Check size={18} className="text-gold" /> : <Copy size={18} />}
                </button>
              </div>

              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <WhatsAppIcon size={18} className="text-gold" /> Join the WhatsApp community
              </a>

              <a href={SITE.whatsappDirect} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <WhatsAppIcon size={18} className="text-gold" /> Reach us on WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xl">Our programs</h2>
            <ul className="mt-4 space-y-2">
              {PROGRAMS.map((p) => (
                <li key={p.slug}>
                  <Link to={`/programs/${p.slug}`} className="card flex min-h-[48px] items-center justify-between gap-3 px-4 py-3 hover:border-gold">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-sm text-muted">{p.cadence}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Partnerships;
