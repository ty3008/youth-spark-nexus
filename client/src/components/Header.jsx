import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={isScrolled ? 'scrolled' : ''}>
            <RouterLink to="/" className="logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <img src="/logo.png" alt="Youth Spark Nexus" style={{ height: '50px', width: 'auto' }} />
            </RouterLink>

            <div className="lang-toggle" style={{ color: 'var(--text-col)', fontSize: '0.9em', marginRight: 'auto', marginLeft: '20px', cursor: 'pointer' }}>
                <span style={{ color: 'var(--accent-col)' }}>EN</span> | FR
            </div>

            <button
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation"
                aria-expanded={isMenuOpen}
            >
                &#9776;
            </button>

            <nav id="navbar">
                <ul className={isMenuOpen ? 'show' : ''}>
                    {isHome ? (
                        <>
                            <li><ScrollLink to="hero" smooth={true} duration={500} style={{ cursor: 'pointer' }} onClick={() => setIsMenuOpen(false)}>Home</ScrollLink></li>
                            <li><ScrollLink to="about" smooth={true} duration={500} style={{ cursor: 'pointer' }} onClick={() => setIsMenuOpen(false)}>About</ScrollLink></li>
                            <li><ScrollLink to="pillars" smooth={true} duration={500} style={{ cursor: 'pointer' }} onClick={() => setIsMenuOpen(false)}>Pillars</ScrollLink></li>
                            <li><ScrollLink to="impact" smooth={true} duration={500} style={{ cursor: 'pointer' }} onClick={() => setIsMenuOpen(false)}>Impact</ScrollLink></li>
                            <li><ScrollLink to="programs" smooth={true} duration={500} style={{ cursor: 'pointer' }} onClick={() => setIsMenuOpen(false)}>Programs</ScrollLink></li>
                            <li><ScrollLink to="engagements" smooth={true} duration={500} style={{ cursor: 'pointer' }} onClick={() => setIsMenuOpen(false)}>Engagements</ScrollLink></li>
                            <li><ScrollLink to="audience" smooth={true} duration={500} style={{ cursor: 'pointer' }} onClick={() => setIsMenuOpen(false)}>Who We Serve</ScrollLink></li>
                            <li><ScrollLink to="partnerships" smooth={true} duration={500} style={{ cursor: 'pointer' }} onClick={() => setIsMenuOpen(false)}>Partnerships</ScrollLink></li>
                        </>
                    ) : (
                        <li><RouterLink to="/" style={{ cursor: 'pointer' }} onClick={() => setIsMenuOpen(false)}>Home</RouterLink></li>
                    )}
                    <li><RouterLink to="/events" style={{ cursor: 'pointer', color: 'var(--accent-col)' }} onClick={() => setIsMenuOpen(false)}>Events</RouterLink></li>
                    {isHome ? (
                        <li><ScrollLink to="join-us" smooth={true} duration={500} className="btn" style={{ cursor: 'pointer' }} onClick={() => setIsMenuOpen(false)}>Donate / Join</ScrollLink></li>
                    ) : (
                        <li><RouterLink to="/#join-us" className="btn" style={{ cursor: 'pointer' }} onClick={() => setIsMenuOpen(false)}>Donate / Join</RouterLink></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
