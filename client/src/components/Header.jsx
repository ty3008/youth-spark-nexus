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

    const navLinks = [
       // { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Impact', path: '/impact' },
        { name: 'Programs', path: '/programs' },
        { name: 'Events', path: '/events' },
    ];

    return (
        <header className={isScrolled ? 'scrolled' : ''}>
            <RouterLink to="/" className="logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <img src="/logo.png" alt="Youth Spark Nexus" className="header-logo" />
            </RouterLink>

            <nav id="navbar">
                <ul className={isMenuOpen ? 'show' : ''}>
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <RouterLink
                                to={link.path}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </RouterLink>
                        </li>
                    ))}
                    <li>
                        <a
                            href="https://chat.whatsapp.com/IVLWWZyO2GT6ONfjCgOw7K?mode=gi_t"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Join Us
                        </a>
                    </li>
                </ul>
            </nav>

            <button
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation"
                aria-expanded={isMenuOpen}
                style={{ color: 'var(--text-col)' }}
            >
                &#9776;
            </button>
        </header>
    );
};

export default Header;

