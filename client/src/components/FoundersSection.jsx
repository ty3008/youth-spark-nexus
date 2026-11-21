import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FOUNDERS, FOUNDERS_PHOTO } from '../data/site';

const FoundersSection = ({ showMoreLink = false }) => (
  <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-[0_20px_50px_rgba(0,0,0,0.45)] lg:col-span-5">
      <img
        src={FOUNDERS_PHOTO}
        alt="Kevin Kimani and Daphne Kimani studio portrait"
        width="1200"
        height="1406"
        loading="lazy"
        decoding="async"
        className="aspect-[4/5] w-full object-cover object-top"
      />
      <figcaption className="border-t border-white/10 px-4 py-3 text-xs font-medium tracking-wide text-muted">
        Kevin &amp; Daphne Kimani · Co-founders, Nairobi
      </figcaption>
    </figure>

    <div className="lg:col-span-7">
      <p className="eyebrow mb-2">Founders</p>
      <h2 className="text-2xl sm:text-4xl">Kevin Kimani and Daphne Kimani</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">
        A husband-and-wife team in Nairobi stewarding Youth Spark Summit—raising young leaders to lead with clarity, empowering them to transform industries, shape culture, influence societies, and advance nation-building with excellence.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {FOUNDERS.map((f) => (
          <article
            key={f.name}
            className="card flex flex-row overflow-hidden bg-ink/85 transition-colors hover:border-gold/40 sm:flex-col"
          >
            <div className="w-28 shrink-0 overflow-hidden border-r border-white/10 bg-ink sm:aspect-[4/5] sm:w-full sm:border-b sm:border-r-0">
              <img
                src={f.image}
                alt={f.name}
                width="1200"
                height="1500"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-4 sm:justify-start sm:p-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{f.role}</span>
              <h3 className="mt-1 text-base font-semibold text-fg sm:text-lg">{f.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.bio}</p>
            </div>
          </article>
        ))}
      </div>

      {showMoreLink && (
        <Link
          to="/about"
          className="mt-6 inline-flex min-h-[48px] items-center gap-1.5 text-sm font-medium text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-dark hover:decoration-gold"
        >
          <span>More about us</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </div>
  </div>
);

export default FoundersSection;
