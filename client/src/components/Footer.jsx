import { Link } from 'react-router-dom';
import { SITE } from '../data/site';

const Footer = () => (
  <footer className="mt-auto border-t border-white/10 bg-ink">
    <div className="wrap grid gap-10 py-12 md:grid-cols-3">
      <div>
        <Link to="/" className="inline-flex items-center gap-3">
          <img src="/logo.png" alt="" width="40" height="40" loading="lazy" className="h-10 w-10 object-contain" />
          <span className="text-base font-semibold">Youth Spark Summit</span>
        </Link>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
          Gatherings for young leaders in Nairobi.
        </p>
      </div>

      <nav aria-label="Footer">
        <h2 className="text-sm font-semibold">Pages</h2>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 text-sm text-muted md:grid-cols-1">
          {[
            ['/about', 'About'],
            ['/programs', 'Programs'],
            ['/events', 'Events'],
            ['/partnerships', 'Partner'],
            ['/contact', 'Contact'],
          ].map(([to, label]) => (
            <li key={to}>
              <Link to={to} className="flex min-h-[48px] items-center hover:text-gold md:min-h-[36px]">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <h2 className="text-sm font-semibold">Reach us</h2>
        <ul className="mt-3 text-sm text-muted">
          {[
            [SITE.whatsapp, 'WhatsApp', true],
            [SITE.instagram, `Instagram ${SITE.instagramHandle}`, true],
            [SITE.youtube, 'YouTube', true],
            [SITE.phoneHref, SITE.phone, false],
            [`mailto:${SITE.email}`, SITE.email, false],
          ].map(([href, label, external]) => (
            <li key={href}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex min-h-[48px] items-center break-all hover:text-gold md:min-h-[36px]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="wrap flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <p>{SITE.noRegistrationLine}</p>
        <p>© {new Date().getFullYear()} Youth Spark Summit, Nairobi.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
