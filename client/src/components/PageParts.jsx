import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const PageHeader = ({ crumbs = [], eyebrow, title, children }) => (
  <section className="border-b border-white/10">
    <div className="wrap py-10 sm:py-14">
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted">
          <Link to="/" className="inline-flex min-h-[32px] items-center hover:text-gold">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="inline-flex items-center gap-1">
              <ChevronRight size={14} aria-hidden="true" />
              {c.to ? (
                <Link to={c.to} className="inline-flex min-h-[32px] items-center hover:text-gold">{c.label}</Link>
              ) : (
                <span aria-current="page" className="text-fg">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h1 className="max-w-3xl text-3xl leading-tight sm:text-5xl">{title}</h1>
      {children && <div className="mt-4 max-w-2xl">{children}</div>}
    </div>
  </section>
);

export const EmptyState = ({ children }) => (
  <div className="rounded-xl border border-dashed border-white/20 p-6 text-center text-sm text-muted">{children}</div>
);
