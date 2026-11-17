import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FOUNDERS, FOUNDERS_PHOTO, PROGRAMS, VENUES_USED } from '../data/site';
import { PageHeader } from '../components/PageParts';

const About = () => (
  <>
    <Helmet>
      <title>About — Youth Spark Summit</title>
      <meta
        name="description"
        content="Youth Spark Summit is run by Kevin Kimani and Daphne Kimani in Nairobi. It hosts the annual Summit, monthly Nexus, NXT Africa Forum, and Reconstructive Leadership."
      />
    </Helmet>

    <PageHeader crumbs={[{ label: 'About' }]} eyebrow="About" title="Youth Spark Summit">
      <p className="lead">
        We host gatherings in Nairobi for young Christian leaders, professionals, entrepreneurs, and creatives. We run four programs.
      </p>
    </PageHeader>

    <section className="section">
      <div className="wrap grid items-start gap-8 md:grid-cols-2 md:gap-12">
        <figure>
          <img
            src={FOUNDERS_PHOTO}
            alt="Kevin Kimani and Daphne Kimani"
            width="1400"
            height="933"
            loading="lazy"
            decoding="async"
            className="aspect-[3/2] w-full rounded-xl border border-white/10 object-cover"
          />
        </figure>
        <div>
          <p className="eyebrow mb-2">Founders</p>
          <h2 className="text-2xl sm:text-3xl">Kevin Kimani and Daphne Kimani</h2>
          <p className="mt-3 text-muted">A couple in Nairobi.</p>
          <dl className="mt-6 space-y-5">
            {FOUNDERS.map((f) => (
              <div key={f.name}>
                <dt className="font-semibold">
                  {f.name} <span className="font-normal text-muted">· {f.role}</span>
                </dt>
                <dd className="mt-1 text-muted">{f.bio}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>

    <section className="section border-t border-white/10">
      <div className="wrap">
        <p className="eyebrow mb-2">What we host</p>
        <h2 className="mb-6 text-2xl sm:text-3xl">Four programs</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {PROGRAMS.map((p) => (
            <li key={p.slug}>
              <Link to={`/programs/${p.slug}`} className="card group flex h-full flex-col gap-2 p-5 transition-colors hover:border-gold">
                <span className="chip-program self-start">{p.cadence}</span>
                <h3 className="text-lg group-hover:text-gold">{p.name}</h3>
                <p className="text-sm leading-relaxed text-muted">{p.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          Youth Spark Nexus is one of the programs. It is not a separate organisation.
        </p>
      </div>
    </section>

    <section className="section border-t border-white/10">
      <div className="wrap grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-xl">Venues we have used</h2>
          <ul className="mt-4 space-y-2 text-muted">
            {VENUES_USED.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl">Past gatherings</h2>
          <p className="mt-4 text-muted">
            Every gathering we have on record has its own page with the date, venue, and photos when we have them.
          </p>
          <Link to="/events" className="btn-ghost mt-5">
            See the calendar
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default About;
