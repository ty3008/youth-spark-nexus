import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [programsOpen, setProgramsOpen] = useState(false);
    const [movementOpen, setMovementOpen] = useState(false);
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
        setProgramsOpen(false);
        setMovementOpen(false);
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

    const programItems = [
        { name: 'Youth Spark Summit', desc: 'Annual flagship event for 1,500+ leaders', path: '/programs/youth-spark-summit' },
        { name: 'Youth Spark Nexus', desc: 'Monthly Nairobi CBD leadership & fellowship', path: '/programs/youth-spark-nexus' },
        { name: 'NXT Africa Forum', desc: 'Intimate economic & executive venture forum', path: '/programs/nxt-africa-forum' },
        { name: 'Reconstructive Leadership', desc: '3-month cohort for practical monetizable skills', path: '/programs/reconstructive-leadership' },
    ];

    const movementItems = [
        { name: 'Our Story & Vision', desc: 'Who we are and our founding mandate', path: '/about' },
        { name: 'Four Pillars', desc: 'Faith, Leadership, Influence, Community', path: '/pillars' },
        { name: 'Who We Serve', desc: 'Campuses, professionals & 7 mountains', path: '/who-we-serve' },
        { name: 'Engagements & Tours', desc: 'Flagship university and community tours', path: '/engagements' },
        { name: 'Our Impact', desc: 'Proven metrics, alumni & transformation', path: '/impact' },
    ];

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
                isScrolled 
                    ? 'bg-brand-dark/95 backdrop-blur-xl border-white/10 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
                    : 'bg-gradient-to-b from-brand-dark/95 via-brand-dark/60 to-transparent border-transparent py-3 sm:py-4'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Balanced Brand Logo & Wordmark */}
                <Link to="/" className="flex items-center gap-3.5 z-50 group">
                    {/* Enlarged Logo Emblem */}
                    <div className="relative flex items-center justify-center">
                        <img 
                            src="/logo.png" 
                            alt="Youth Spark Nexus" 
                            className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(252,209,42,0.35)]" 
                        />
                    </div>
                    {/* Balanced, Proportional Typography */}
                    <div className="flex flex-col justify-center">
                        <span className="font-heading text-sm sm:text-base font-bold tracking-wider text-white uppercase leading-tight group-hover:text-brand-gold transition-colors">
                            YouthSpark <span className="text-brand-gold">Nexus</span>
                        </span>
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold mt-0.5">
                            Discipling Nations
                        </span>
                    </div>
                </Link>

                {/* Desktop Segmented Tab Bar */}
                <nav className="hidden lg:flex items-center bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-full p-1.5 shadow-[0_2px_15px_rgba(0,0,0,0.4)]">
                    <Link 
                        to="/" 
                        className={`px-4 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
                            location.pathname === '/' 
                                ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(252,209,42,0.4)]' 
                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        Home
                    </Link>

                    {/* Programs Tab Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setProgramsOpen(true)}
                        onMouseLeave={() => setProgramsOpen(false)}
                    >
                        <button 
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
                                location.pathname.startsWith('/programs') 
                                    ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(252,209,42,0.4)]' 
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            Programs <ChevronDown size={13} className={`transition-transform duration-200 ${programsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {programsOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute top-full -left-4 w-80 glass-card p-3 shadow-2xl border border-white/15 bg-brand-card/95 backdrop-blur-2xl rounded-2xl mt-1.5"
                                >
                                    <div className="p-2 border-b border-white/5 mb-1 flex items-center justify-between">
                                        <span className="text-[11px] uppercase tracking-wider font-bold text-brand-gold">Flagship Portals</span>
                                        <Link to="/programs" className="text-[11px] text-gray-400 hover:text-white transition-colors">All Programs &rarr;</Link>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {programItems.map(item => (
                                            <Link 
                                                key={item.path} 
                                                to={item.path}
                                                className={`p-2.5 rounded-xl transition-all flex flex-col hover:bg-white/5 ${
                                                    location.pathname === item.path ? 'bg-brand-gold/10 border-l-2 border-brand-gold' : ''
                                                }`}
                                            >
                                                <span className="text-sm font-semibold text-white hover:text-brand-gold">{item.name}</span>
                                                <span className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.desc}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Movement Tab Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setMovementOpen(true)}
                        onMouseLeave={() => setMovementOpen(false)}
                    >
                        <button 
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
                                ['/about', '/pillars', '/who-we-serve', '/engagements', '/impact'].includes(location.pathname) 
                                    ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(252,209,42,0.4)]' 
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            Movement <ChevronDown size={13} className={`transition-transform duration-200 ${movementOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {movementOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute top-full -left-4 w-80 glass-card p-3 shadow-2xl border border-white/15 bg-brand-card/95 backdrop-blur-2xl rounded-2xl mt-1.5"
                                >
                                    <div className="p-2 border-b border-white/5 mb-1">
                                        <span className="text-[11px] uppercase tracking-wider font-bold text-brand-gold">Ecosystem & Mandate</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {movementItems.map(item => (
                                            <Link 
                                                key={item.path} 
                                                to={item.path}
                                                className={`p-2.5 rounded-xl transition-all flex flex-col hover:bg-white/5 ${
                                                    location.pathname === item.path ? 'bg-brand-gold/10 border-l-2 border-brand-gold' : ''
                                                }`}
                                            >
                                                <span className="text-sm font-semibold text-white hover:text-brand-gold">{item.name}</span>
                                                <span className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.desc}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link 
                        to="/events" 
                        className={`px-4 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
                            location.pathname === '/events' 
                                ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(252,209,42,0.4)]' 
                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        Events
                    </Link>

                    <Link 
                        to="/partnerships" 
                        className={`px-4 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
                            location.pathname === '/partnerships' 
                                ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(252,209,42,0.4)]' 
                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        Partner
                    </Link>
                </nav>

                {/* Right Action */}
                <div className="hidden lg:flex items-center gap-3">
                    <a
                        href="https://chat.whatsapp.com/IVLWWZyO2GT6ONfjCgOw7K?mode=gi_t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold font-heading font-bold text-xs uppercase tracking-wider border border-brand-gold/30 hover:bg-brand-gold hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(252,209,42,0.2)]"
                    >
                        <MessageCircle size={15} /> Join WhatsApp
                    </a>
                </div>

                {/* Mobile Menu Toggle Button */}
                <button 
                    className="lg:hidden text-white hover:text-brand-gold p-2 z-50 relative transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={26} className="text-brand-gold" /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-brand-dark/98 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
                            <div>
                                <span className="text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">Navigation</span>
                                <div className="flex flex-col gap-2">
                                    <Link to="/" className="text-xl font-heading font-bold text-white hover:text-brand-gold transition-colors py-1.5">
                                        Home
                                    </Link>
                                    <Link to="/about" className="text-xl font-heading font-bold text-white hover:text-brand-gold transition-colors py-1.5">
                                        About Our Story
                                    </Link>
                                    <Link to="/pillars" className="text-xl font-heading font-bold text-white hover:text-brand-gold transition-colors py-1.5">
                                        Our Pillars & 7 Mountains
                                    </Link>
                                    <Link to="/who-we-serve" className="text-xl font-heading font-bold text-white hover:text-brand-gold transition-colors py-1.5">
                                        Who We Serve (Ecosystem)
                                    </Link>
                                    <Link to="/impact" className="text-xl font-heading font-bold text-white hover:text-brand-gold transition-colors py-1.5">
                                        Impact & Stories
                                    </Link>
                                    <Link to="/events" className="text-xl font-heading font-bold text-white hover:text-brand-gold transition-colors py-1.5">
                                        Upcoming Events
                                    </Link>
                                    <Link to="/partnerships" className="text-xl font-heading font-bold text-white hover:text-brand-gold transition-colors py-1.5">
                                        Partner & Sponsor
                                    </Link>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <span className="text-xs uppercase tracking-widest text-brand-gold font-bold mb-3 block">Flagship Programs</span>
                                <div className="grid grid-cols-1 gap-2">
                                    <Link to="/programs/youth-spark-summit" className="p-3 rounded-xl bg-white/5 border border-white/5 text-sm font-semibold text-white hover:border-brand-gold/40 flex items-center justify-between">
                                        <span>Youth Spark Summit (Annual)</span>
                                        <ArrowRight size={14} className="text-brand-gold" />
                                    </Link>
                                    <Link to="/programs/youth-spark-nexus" className="p-3 rounded-xl bg-white/5 border border-white/5 text-sm font-semibold text-white hover:border-brand-gold/40 flex items-center justify-between">
                                        <span>Youth Spark Nexus (Monthly CBD)</span>
                                        <ArrowRight size={14} className="text-brand-gold" />
                                    </Link>
                                    <Link to="/programs/nxt-africa-forum" className="p-3 rounded-xl bg-white/5 border border-white/5 text-sm font-semibold text-white hover:border-brand-gold/40 flex items-center justify-between">
                                        <span>NXT Africa Forum (Ventures)</span>
                                        <ArrowRight size={14} className="text-brand-gold" />
                                    </Link>
                                    <Link to="/programs/reconstructive-leadership" className="p-3 rounded-xl bg-white/5 border border-white/5 text-sm font-semibold text-white hover:border-brand-gold/40 flex items-center justify-between">
                                        <span>Reconstructive Leadership</span>
                                        <ArrowRight size={14} className="text-brand-gold" />
                                    </Link>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                                <a
                                    href="https://chat.whatsapp.com/IVLWWZyO2GT6ONfjCgOw7K?mode=gi_t"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full text-center py-3.5 flex items-center justify-center gap-2"
                                >
                                    <MessageCircle size={18} /> Join WhatsApp Community
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
