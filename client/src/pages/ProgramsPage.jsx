import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import { PROGRAMS } from '../data/site';
import { PageHeader } from '../components/PageParts';

const ProgramsPage = () => (
  <>
    <Helmet>
      <title>Programs — Youth Spark Summit</title>
      <meta
        name="description"
        content="The five Youth Spark Summit programs: the annual Summit, monthly Nexus, NXT Africa Forum, Reconstructive Leadership, and Let Her Conference."
      />
    </Helmet>

    <PageHeader crumbs={[{ label: 'Programs' }]} eyebrow="Programs" title="Five programs, one city">
      <p className="lead">All of our gatherings are hosted from Nairobi.</p>
    </PageHeader>

    <section id="engagements" className="section">
      <div className="wrap">
        <ul className="grid gap-6 md:grid-cols-2">
          {PROGRAMS.map((p) => (
            <li key={p.slug}>
              <Link to={`/programs/${p.slug}`} className="card group flex h-full flex-col overflow-hidden transition-colors hover:border-gold">
                <img
                  src={p.cover}
                  alt={p.name}
                  width="1200"
                  height="900"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full border-b border-white/10 object-cover"
                />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className="chip-program self-start">{p.cadence}</span>
                  <h2 className="text-xl group-hover:text-gold">{p.name}</h2>
                  <p className="flex-1 leading-relaxed text-muted">{p.blurb}</p>
                  {p.facts.length > 0 && (
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
                      {p.facts.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  )}
                  <span className="inline-flex min-h-[32px] items-center gap-1 pt-2 text-sm font-medium text-gold">
                    Open program <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </>
);

export default ProgramsPage;
