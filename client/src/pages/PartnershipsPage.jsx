import { Helmet } from 'react-helmet';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { PROGRAMS, SITE } from '../data/site';
import { PageHeader } from '../components/PageParts';
import { Link } from 'react-router-dom';

const subject = encodeURIComponent('Partnership with Youth Spark Summit');

const Partnerships = () => (
  <>
    <Helmet>
      <title>Partner with us — Youth Spark Summit</title>
      <meta
        name="description"
        content="Partner with Youth Spark Summit. Email, call, or message us on WhatsApp to talk about working together in Nairobi."
      />
    </Helmet>

    <PageHeader crumbs={[{ label: 'Partner' }]} eyebrow="Partner" title="Work with us">
      <p className="lead">
        If you want to work with Youth Spark Summit, email or call us.
      </p>
    </PageHeader>

    <section className="section">
      <div className="wrap grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-xl">Start the conversation</h2>
          <p className="mt-3 text-muted">Tell us who you are and which program interests you.</p>
          <div className="mt-6 flex flex-col gap-3">
            <a href={`mailto:${SITE.email}?subject=${subject}`} className="btn-gold">
              <Mail size={18} aria-hidden="true" /> Email {SITE.email}
            </a>
            <a href={SITE.phoneHref} className="btn-ghost">
              <Phone size={18} aria-hidden="true" /> Call {SITE.phone}
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <MessageCircle size={18} aria-hidden="true" /> Join the WhatsApp group
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

export default Partnerships;
