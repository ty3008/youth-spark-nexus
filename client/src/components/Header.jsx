import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!isMenuOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Pillars', path: '/pillars' },
        { name: 'Impact', path: '/impact' },
        { name: 'Programs', path: '/programs' },
        { name: 'Events', path: '/events' },
    ];

    const closeMenu = () => setIsMenuOpen(false);

    const renderNavItems = (variant) => {
        const isDesktop = variant === 'desktop';

        return (
            <>
                {navLinks
                    .filter((link) => !(isDesktop && link.name === 'Events'))
                    .map((link) => (
                        <li key={`${variant}-${link.path}`}>
                            <RouterLink to={link.path} onClick={closeMenu}>
                                {link.name}
                            </RouterLink>
                        </li>
                    ))}

                {/* Partner / Support lives only in the mobile menu to reduce desktop clutter */}
                {!isDesktop && (
                    <li>
                        <RouterLink to="/partnerships" onClick={closeMenu}>
                            Partner / Support
                        </RouterLink>
                    </li>
                )}

                <li>
                    <a
                        href="https://chat.whatsapp.com/IVLWWZyO2GT6ONfjCgOw7K?mode=gi_t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        onClick={closeMenu}
                    >
                        Join Us
                    </a>
                </li>
            </>
        );
    };

    return (
        <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
            {isMenuOpen ? (
                <div
                    className="header-mobile-backdrop"
                    aria-hidden
                    onClick={closeMenu}
                />
            ) : null}

            <div className="site-header__bar">
                <RouterLink
                    to="/"
                    className="logo"
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                >
                    <img src="/logo.png" alt="Youth Spark Nexus" className="header-logo" />
                </RouterLink>

                <nav className="header-nav-desktop" aria-label="Main navigation">
                    <ul className="header-nav-list">{renderNavItems('desktop')}</ul>
                </nav>

                <button
                    type="button"
                    className="menu-toggle"
                    id="menu-toggle-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle navigation"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-nav-panel"
                >
                    &#9776;
                </button>
            </div>

            <div
                id="mobile-nav-panel"
                className={`header-mobile-panel ${isMenuOpen ? 'is-open' : ''}`}
                aria-hidden={!isMenuOpen}
            >
                <nav aria-label="Mobile navigation">
                    <ul className="header-mobile-list">{renderNavItems('mobile')}</ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
