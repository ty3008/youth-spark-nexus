import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SITE } from '../data/site';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from './BrandIcons';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/programs', label: 'Programs' },
  { to: '/events', label: 'Events' },
  { to: '/about', label: 'About' },
  { to: '/partnerships', label: 'Partner' },
];

const MOBILE_SOCIALS = [
  { label: 'Instagram', href: SITE.instagram, icon: InstagramIcon },
  { label: 'Facebook', href: SITE.facebook, icon: FacebookIcon },
  { label: 'YouTube', href: SITE.youtube, icon: YouTubeIcon },
  { label: 'WhatsApp', href: SITE.whatsapp, icon: WhatsAppIcon },
];

const desktopTabClass = ({ isActive }) =>
  `inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 text-sm font-medium transition-all ${
    isActive
      ? 'bg-white/10 text-fg ring-1 ring-white/15'
      : 'text-muted hover:bg-white/[0.04] hover:text-fg'
  }`;

const mobileTabClass = ({ isActive }) =>
  `flex min-h-[48px] items-center justify-between rounded-xl border px-4 text-base font-medium transition-colors ${
    isActive
      ? 'border-gold/40 bg-panel text-gold'
      : 'border-transparent text-fg hover:bg-panel hover:text-gold'
  }`;

const Header = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
      <div className="wrap flex min-h-[72px] items-center justify-between gap-4">
        {/* Left: Crisp emblem + balanced wordmark */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="group flex min-h-[48px] shrink-0 items-center gap-3"
          aria-label="Youth Spark Summit, home"
        >
          <img
            src="/favicon.svg"
            alt=""
            width="40"
            height="40"
            className="h-9 w-9 shrink-0 rounded-xl shadow-[0_0_20px_rgba(252,209,42,0.18)] transition-transform duration-200 group-hover:scale-105 sm:h-10 sm:w-10"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-fg sm:text-base">
              Youth Spark <span className="text-gold">Summit</span>
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
              Nairobi
            </span>
          </div>
        </Link>

        {/* Center: Clean segmented pill tab bar */}
        <nav
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-panel/90 p-1 shadow-[0_4px_24px_rgba(0,0,0,0.45)] md:flex"
          aria-label="Main"
        >
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={desktopTabClass}>
              {({ isActive }) => (
                <>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />}
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right: Balanced community action on desktop */}
        <div className="hidden shrink-0 items-center md:flex">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/15 bg-panel/70 px-4 text-sm font-medium text-fg transition-colors hover:border-gold hover:text-gold"
          >
            <WhatsAppIcon size={17} className="text-gold" />
            <span>Community</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-panel/80 text-fg transition-colors hover:border-gold hover:text-gold md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-x-0 bottom-0 top-[73px] z-30 bg-black/70 backdrop-blur-sm md:hidden"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <nav id="mobile-nav" className="relative z-40 max-h-[calc(100svh-73px)] overflow-y-auto border-t border-white/10 bg-ink md:hidden" aria-label="Main">
            <div className="wrap flex flex-col gap-1 py-4">
              {NAV.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className={mobileTabClass} onClick={() => setOpen(false)}>
                  <span>{item.label}</span>
                </NavLink>
              ))}
              <div className="mt-3 space-y-2.5 border-t border-white/10 pt-3">
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-gold w-full"
                >
                  <WhatsAppIcon size={18} /> Join WhatsApp community
                </a>
                <a
                  href={SITE.whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-ghost w-full"
                >
                  <WhatsAppIcon size={18} className="text-gold" /> Reach us on WhatsApp
                </a>
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {MOBILE_SOCIALS.map((s) => {
                    const IconComponent = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        aria-label={s.label}
                        className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/10 bg-panel text-fg transition-colors hover:border-gold hover:text-gold"
                      >
                        <IconComponent size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
