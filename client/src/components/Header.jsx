import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, MessageCircle, X } from 'lucide-react';
import { SITE } from '../data/site';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/programs', label: 'Programs' },
  { to: '/events', label: 'Events' },
  { to: '/about', label: 'About' },
  { to: '/partnerships', label: 'Partner' },
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
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
      <div className="wrap flex min-h-[72px] items-center justify-between gap-4">
        {/* Left: Crisp emblem + balanced wordmark */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex min-h-[48px] shrink-0 items-center gap-3 group"
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

        {/* Right: Balanced action link on desktop */}
        <div className="hidden shrink-0 items-center md:flex">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/15 bg-panel/70 px-4 text-sm font-medium text-fg transition-colors hover:border-gold hover:text-gold"
          >
            <MessageCircle size={16} className="text-gold" aria-hidden="true" />
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
        <nav id="mobile-nav" className="border-t border-white/10 bg-ink md:hidden" aria-label="Main">
          <div className="wrap flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={mobileTabClass} onClick={() => setOpen(false)}>
                <span>{item.label}</span>
              </NavLink>
            ))}
            <div className="mt-3 border-t border-white/10 pt-3">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-gold w-full"
              >
                <MessageCircle size={18} aria-hidden="true" /> Join WhatsApp community
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
