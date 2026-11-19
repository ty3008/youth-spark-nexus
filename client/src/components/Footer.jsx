import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { SITE } from '../data/site';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from './BrandIcons';

const SOCIAL_BADGES = [
  { label: 'Instagram (@youthsparksummitofficial)', href: SITE.instagram, icon: InstagramIcon },
  { label: 'Facebook (Youth Spark Summit)', href: SITE.facebook, icon: FacebookIcon },
  { label: 'YouTube (Youth Spark Summit)', href: SITE.youtube, icon: YouTubeIcon },
  { label: 'WhatsApp Community', href: SITE.whatsapp, icon: WhatsAppIcon },
];

const Footer = () => (
  <footer className="mt-auto border-t border-white/10 bg-ink">
    <div className="wrap grid gap-10 py-12 md:grid-cols-12">
      <div className="md:col-span-5">
        <Link to="/" className="inline-flex items-center gap-3">
          <img src="/favicon.svg" alt="" width="40" height="40" loading="lazy" className="h-10 w-10 rounded-xl object-contain" />
          <div className="flex flex-col">
            <span className="text-base font-semibold leading-tight text-fg">
              Youth Spark <span className="text-gold">Summit</span>
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
              Nairobi
            </span>
          </div>
        </Link>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
          Empowering a generation of Kingdom-minded young leaders across faith, enterprise, governance, and the creative economy in Nairobi.
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5" aria-label="Social media platforms">
          {SOCIAL_BADGES.map((s) => {
            const IconComponent = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-panel text-fg transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
              >
                <IconComponent size={20} />
              </a>
            );
          })}
        </div>
      </div>

      <nav aria-label="Footer" className="md:col-span-3">
        <h2 className="text-sm font-semibold text-fg">Explore</h2>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 text-sm text-muted md:grid-cols-1">
          {[
            ['/about', 'About'],
            ['/programs', 'Programs'],
            ['/events', 'Events'],
            ['/partnerships', 'Partner'],
            ['/contact', 'Contact'],
          ].map(([to, label]) => (
            <li key={to}>
              <Link to={to} className="flex min-h-[48px] items-center hover:text-gold md:min-h-[38px]">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="md:col-span-4">
        <h2 className="text-sm font-semibold text-fg">Connect</h2>
        <ul className="mt-3 space-y-1 text-sm text-muted">
          {[
            { href: SITE.whatsapp, label: 'WhatsApp · Join community', icon: WhatsAppIcon, external: true },
            { href: SITE.whatsappDirect, label: 'WhatsApp · Reach us', icon: WhatsAppIcon, external: true },
            { href: SITE.instagram, label: `Instagram · ${SITE.instagramHandle}`, icon: InstagramIcon, external: true },
            { href: SITE.facebook, label: `Facebook · ${SITE.facebookHandle}`, icon: FacebookIcon, external: true },
            { href: SITE.youtube, label: 'YouTube · Youth Spark Summit', icon: YouTubeIcon, external: true },
            { href: `mailto:${SITE.email}`, label: SITE.email, icon: Mail, external: false },
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex min-h-[48px] items-center gap-2.5 break-words transition-colors hover:text-gold md:min-h-[38px]"
                >
                  <IconComponent size={16} className="shrink-0 text-gold" aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="wrap flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{SITE.noRegistrationLine}</p>
        <p>© {new Date().getFullYear()} Youth Spark Summit, Nairobi.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
