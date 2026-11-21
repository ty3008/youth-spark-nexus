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
        content="The six Youth Spark Summit programs: the annual Summit, monthly Nexus, NXT Africa Forum, Reconstructive Leadership, Let Her Conference, and Becoming Limitless."
      />
    </Helmet>

    <PageHeader crumbs={[{ label: 'Programs' }]} eyebrow="Programs" title="Six programs, one city">
      <p className="lead">All of our gatherings are hosted from Nairobi.</p>
    </PageHeader>

    <section id="engagements" className="section">
      <div className="wrap">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p) => (
            <li key={p.slug}>
              <Link to={`/programs/${p.slug}`} className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
                <div className="aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-ink">
                  <img
                    src={p.cover}
                    alt={p.name}
                    width="1200"
                    height="900"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
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
                  <span className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 pt-2 text-sm font-medium text-gold">
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
