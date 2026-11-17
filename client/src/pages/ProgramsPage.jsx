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
        content="The four Youth Spark Summit programs: the annual Summit, monthly Nexus, NXT Africa Forum, and Reconstructive Leadership."
      />
    </Helmet>

    <PageHeader crumbs={[{ label: 'Programs' }]} eyebrow="Programs" title="Four programs, one city">
      <p className="lead">All of our gatherings are in Nairobi.</p>
    </PageHeader>

    <section className="section">
      <div className="wrap">
        <ul className="grid gap-4 md:grid-cols-2">
          {PROGRAMS.map((p) => (
            <li key={p.slug}>
              <Link to={`/programs/${p.slug}`} className="card group flex h-full flex-col gap-3 p-6 transition-colors hover:border-gold">
                <span className="chip-program self-start">{p.cadence}</span>
                <h2 className="text-xl group-hover:text-gold">{p.name}</h2>
                <p className="flex-1 leading-relaxed text-muted">{p.blurb}</p>
                <span className="inline-flex min-h-[32px] items-center gap-1 text-sm font-medium text-gold">
                  Open program <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </>
);

export default ProgramsPage;
