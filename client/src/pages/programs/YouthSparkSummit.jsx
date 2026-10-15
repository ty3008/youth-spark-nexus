import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Calendar, MapPin, Users, Sparkles, Shield, Compass, 
    ArrowRight, CheckCircle2, Flame, ExternalLink, ChevronRight 
} from 'lucide-react';
import ImageGrid from '../../components/ImageGrid';

const GOOGLE_FORM_URL = 'https://forms.gle/g62AnhQpsnD3YGvG6';

const YouthSparkSummit = () => {
    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };
    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

    const slides = [
        '/YSS 2025.jpg',
        '/YSS 2025 Poster.jpg',
        '/YSS 3.jpg',
        '/YSS 4.jpg',
        '/YSS 5.jpg',
        '/YSS 6.jpg',
        '/YSS 7.jpg',
        '/YSS 8.jpg',
        '/YSS 9.jpg',
        '/YSS 10.jpg'
    ];

    const tracks = [
        {
            title: "Kingdom Leadership & Governance",
            desc: "Equipping young leaders with biblical integrity, statesmanship, and the moral fortitude required to reform public institutions and policy.",
            icon: <Shield className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "Marketplace Innovation & Technology",
            desc: "Demystifying tech ventures, digital economies, and emerging innovations so Kingdom creators can build scalable solutions for African problems.",
            icon: <Compass className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "Wealth Creation & Stewardship",
            desc: "Practical principles of finance, capital allocation, business scaling, and kingdom wealth transfer anchored on biblical wisdom.",
            icon: <Sparkles className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "Apostolic Depth & Prophetic Worship",
            desc: "Deep, transformative sessions of sound doctrinal teaching, prevailing prayer, and consecration to ignite burning hearts for Jesus Christ.",
            icon: <Flame className="w-6 h-6 text-brand-gold" />
        }
    ];

    const highlights = [
        "Over 1,500+ young visionaries, students, and professionals gathered under one roof",
        "Keynotes and masterclasses led by seasoned captains of industry and Kingdom fathers",
        "Interactive breakouts tailored for career acceleration and entrepreneurship",
        "A national altar of worship, prayer, and life-changing spiritual encounters",
        "High-value mentorship networks connecting emerging leaders across Africa"
    ];

    return (
        <main className="bg-brand-dark min-h-screen pt-24 pb-20">
            <Helmet>
                <title>Youth Spark Summit | Flagship Annual Gathering | Youth Spark Nexus</title>
                <meta name="description" content="Youth Spark Summit is our flagship annual gathering convening over 1,500+ young leaders for Kingdom leadership, marketplace innovation, worship, and national transformation." />
            </Helmet>

            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                    <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/programs" className="hover:text-brand-gold transition-colors">Programs</Link>
                    <ChevronRight size={14} />
                    <span className="text-brand-gold">Youth Spark Summit</span>
                </nav>
            </div>

            {/* Hero Section */}
            <section className="relative py-16 lg:py-24 overflow-hidden border-b border-white/5">
                <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <motion.div 
                            initial="hidden" 
                            animate="visible" 
                            variants={stagger}
                            className="lg:col-span-7 flex flex-col items-start"
                        >
                            <motion.div variants={fadeUp} className="badge-gold mb-6">
                                <span className="flex h-2 w-2 rounded-full bg-brand-gold animate-pulse"></span>
                                Flagship Annual Gathering
                            </motion.div>

                            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight mb-6 leading-[1.08]">
                                Youth Spark <br />
                                <span className="text-gold-gradient">Summit</span>
                            </motion.h1>

                            <motion.p variants={fadeUp} className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl font-light">
                                Convening over <strong className="text-white font-semibold">1,500+ kingdom leaders</strong>, innovators, and university students to ignite purpose, build marketplace excellence, and advance national transformation across Africa.
                            </motion.p>

                            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 text-sm text-gray-400 mb-10 pb-8 border-b border-white/10 w-full">
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                    <Calendar className="text-brand-gold w-4 h-4" />
                                    <span>Annual Summit</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                    <MapPin className="text-brand-gold w-4 h-4" />
                                    <span>Nairobi, Kenya</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                    <Users className="text-brand-gold w-4 h-4" />
                                    <span>1,500+ Attendees</span>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <a 
                                    href={GOOGLE_FORM_URL} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn-primary gap-2 text-center"
                                >
                                    Register For Next Summit <ExternalLink size={16} />
                                </a>
                                <Link to="/events" className="btn-secondary gap-2 text-center">
                                    Check Dates & Schedule <ArrowRight size={16} />
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-5 relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden glass-card p-3 shadow-2xl border-brand-gold/30">
                                <div className="rounded-2xl overflow-hidden aspect-[4/5] relative">
                                    <img 
                                        src="/YSS 2025 Poster.jpg" 
                                        alt="Youth Spark Summit Official Poster" 
                                        className="w-full h-full object-cover" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Summit Experience & Tracks */}
            <section className="py-24 bg-brand-darker relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={stagger}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <motion.span variants={fadeUp} className="badge-gold mb-3">Core Pillars</motion.span>
                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-6">
                            Summit <span className="text-gold-gradient">Tracks</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-gray-400 text-base sm:text-lg">
                            Carefully curated tracks led by statesmen, top entrepreneurs, and ministers designed to transform potential into sovereign Kingdom dominion.
                        </motion.p>
                    </motion.div>

                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {tracks.map((track, i) => (
                            <motion.div key={i} variants={fadeUp} className="glass-card p-8 sm:p-10 flex flex-col justify-between group">
                                <div>
                                    <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                                        {track.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">{track.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-base">{track.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* What to Expect */}
            <section className="py-24 bg-brand-dark relative border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            initial="hidden" 
                            whileInView="visible" 
                            viewport={{ once: true }} 
                            variants={fadeUp}
                        >
                            <span className="badge-gold mb-3">The Experience</span>
                            <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-8">
                                Why You Must Be in the Room
                            </h2>
                            <div className="flex flex-col gap-5">
                                {highlights.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-brand-card/60 border border-white/5">
                                        <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                                        <span className="text-gray-300 text-base leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div 
                            initial="hidden" 
                            whileInView="visible" 
                            viewport={{ once: true }} 
                            variants={fadeUp}
                            className="glass-card p-8 sm:p-12 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-[80px] pointer-events-none"></div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 uppercase tracking-tight">
                                Registration & Delegate Pass
                            </h3>
                            <p className="text-gray-300 text-base leading-relaxed mb-8">
                                Admission to Youth Spark Summit is open to university students, recent graduates, emerging professionals, young ministry leaders, and entrepreneurs across Africa.
                            </p>
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-8">
                                <span className="text-xs uppercase tracking-widest text-brand-gold font-bold block mb-1">Standard Delegate</span>
                                <p className="text-white text-lg font-bold">Free Registration Required</p>
                                <p className="text-xs text-gray-400 mt-1">Includes all keynotes, panel debates, career workshops, and networking lounge access.</p>
                            </div>
                            <a 
                                href={GOOGLE_FORM_URL} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn-primary w-full text-center py-4 text-sm"
                            >
                                Secure Your Seat on Google Form &rarr;
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Photo Gallery Section */}
            <section className="py-24 bg-brand-darker relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={fadeUp}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <span className="badge-gold mb-3">Memories & Energy</span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4">
                            Summit <span className="text-gold-gradient">Gallery</span>
                        </h2>
                        <p className="text-gray-400 text-base">Glimpses of past summits: the worship, the crowds, the speakers, and the glory.</p>
                    </motion.div>

                    <ImageGrid images={slides} />
                </div>
            </section>
        </main>
    );
};

export default YouthSparkSummit;
