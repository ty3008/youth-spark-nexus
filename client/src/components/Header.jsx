import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/events', label: 'Events' },
  { to: '/partnerships', label: 'Partner' },
  { to: '/contact', label: 'Contact' },
];

const linkClass = ({ isActive }) =>
  `flex min-h-[48px] items-center rounded-lg px-3 text-sm font-medium transition-colors ${
    isActive ? 'text-gold' : 'text-fg hover:text-gold'
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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 backdrop-blur">
      <div className="wrap flex min-h-[64px] items-center justify-between gap-4">
        <Link to="/" onClick={() => setOpen(false)} className="flex min-h-[48px] items-center gap-3" aria-label="Youth Spark Summit, home">
          <img src="/logo.png" alt="" width="44" height="44" className="h-11 w-11 object-contain" />
          <span className="text-base font-semibold leading-tight">Youth Spark Summit</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-lg text-fg hover:text-gold md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-white/10 bg-ink md:hidden" aria-label="Main">
          <div className="wrap flex flex-col py-2">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={linkClass} onClick={() => setOpen(false)}>
                <span className="text-base">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
