import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
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

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
                isScrolled ? 'bg-brand-darker/80 backdrop-blur-lg border-white/5 py-4' : 'bg-transparent py-6'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 z-50 relative">
                    <img src="/logo.png" alt="Youth Spark Nexus" className="h-10 sm:h-12 w-auto object-contain" />
                    <span className="font-heading text-xl font-bold tracking-tight text-white hidden sm:block">
                        Youth Spark <span className="text-brand-gold">Nexus</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link 
                                    to={link.path} 
                                    className={`text-sm font-medium transition-colors hover:text-brand-gold ${
                                        location.pathname === link.path ? 'text-brand-gold' : 'text-gray-300'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <a
                        href="https://chat.whatsapp.com/IVLWWZyO2GT6ONfjCgOw7K?mode=gi_t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-brand-gold/10 text-brand-gold font-bold text-sm rounded-full border border-brand-gold/20 hover:bg-brand-gold hover:text-black transition-all"
                    >
                        Join Community
                    </a>
                </nav>

                {/* Mobile Menu Toggle */}
                <button 
                    className="md:hidden text-brand-gold p-2 z-50 relative"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-brand-darker/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-6 overflow-y-auto"
                    >
                        <ul className="flex flex-col gap-6 text-center mt-8">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link 
                                        to={link.path}
                                        className={`text-2xl font-heading font-semibold ${
                                            location.pathname === link.path ? 'text-brand-gold' : 'text-white'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="mt-4">
                                <Link to="/partnerships" className="text-xl text-gray-400 hover:text-brand-gold transition-colors">
                                    Partner / Support
                                </Link>
                            </li>
                            <li className="mt-8">
                                <a
                                    href="https://chat.whatsapp.com/IVLWWZyO2GT6ONfjCgOw7K?mode=gi_t"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full max-w-xs mx-auto text-lg py-4"
                                >
                                    Join Community
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
