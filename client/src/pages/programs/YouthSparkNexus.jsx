import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Calendar, MapPin, Users, HeartHandshake, BookOpen, 
    MessageCircle, ArrowRight, CheckCircle2, ChevronRight 
} from 'lucide-react';
import ImageGrid from '../../components/ImageGrid';

const YouthSparkNexus = () => {
    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };
    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

    const slides = [
        '/Nexus 3.jpg',
        '/Nexus 2.jpg',
        '/Nexus.jpg',
        '/Nexus 4.webp',
        '/Nexus 5.webp',
        '/Nexus 6.jpg',
        '/Nexus 7.jpg',
        '/Nexus 8.jpg',
        '/Nexus 9.jpg',
        '/Nexus 10.jpg'
    ];

    const pillars = [
        {
            title: "Sound Apostolic Word",
            desc: "In-depth Bible teaching on kingdom theology, biblical economics, personal identity, and ethical leadership to build unshakeable spiritual roots.",
            icon: <BookOpen className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "Intimate Prophetic Worship",
            desc: "An atmosphere saturated with raw worship, deep prayer altars, and communal intercession for personal lives, churches, and nations.",
            icon: <HeartHandshake className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "Peer Mastermind & Community",
            desc: "Connecting high-potential youth across universities and early careers for peer accountability, collaborative projects, and lifelong brotherhood.",
            icon: <Users className="w-6 h-6 text-brand-gold" />
        }
    ];

    return (
        <main className="bg-brand-dark min-h-screen pt-24 pb-20">
            <Helmet>
                <title>Youth Spark Nexus | Monthly Discipleship & Leadership Sessions</title>
                <meta name="description" content="Youth Spark Nexus meets monthly in Nairobi CBD for intensive discipleship, apostolic word, worship, and leadership fellowship for 100+ emerging leaders." />
            </Helmet>

            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                    <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/programs" className="hover:text-brand-gold transition-colors">Programs</Link>
                    <ChevronRight size={14} />
                    <span className="text-brand-gold">Youth Spark Nexus</span>
                </nav>
            </div>

            {/* Hero Section */}
            <section className="relative py-16 lg:py-24 overflow-hidden border-b border-white/5">
                <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none"></div>

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
                                Monthly Leadership Gathering
                            </motion.div>

                            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight mb-6 leading-[1.08]">
                                Youth Spark <br />
                                <span className="text-gold-gradient">Nexus Sessions</span>
                            </motion.h1>

                            <motion.p variants={fadeUp} className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl font-light">
                                Our recurring monthly discipleship and leadership hub in the heart of Nairobi CBD. An empowering sanctuary of word, worship, and community for 100+ young change-makers.
                            </motion.p>

                            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 text-sm text-gray-400 mb-10 pb-8 border-b border-white/10 w-full">
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                    <Calendar className="text-brand-gold w-4 h-4" />
                                    <span>Monthly (Saturdays)</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                    <MapPin className="text-brand-gold w-4 h-4" />
                                    <span>Nairobi CBD</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                    <Users className="text-brand-gold w-4 h-4" />
                                    <span>100+ Core Leaders</span>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <a 
                                    href="https://chat.whatsapp.com/IVLWWZyO2GT6ONfjCgOw7K?mode=gi_t" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn-primary gap-2 text-center"
                                >
                                    <MessageCircle size={18} /> Join WhatsApp for Invites
                                </a>
                                <Link to="/events" className="btn-secondary gap-2 text-center">
                                    Next Session Details <ArrowRight size={16} />
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
                                <div className="rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[4/5] relative">
                                    <img 
                                        src="/Nexus 3.jpg" 
                                        alt="Youth Spark Nexus Monthly Session" 
                                        className="w-full h-full object-cover" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What Happens at Nexus */}
            <section className="py-24 bg-brand-darker relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={stagger}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <motion.span variants={fadeUp} className="badge-gold mb-3">The Monthly Rhythm</motion.span>
                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-6">
                            What to Expect at <span className="text-gold-gradient">Nexus</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-gray-400 text-base sm:text-lg">
                            We gather not as an audience, but as a family of kingdom pioneers sharpening one another to dominate our industries.
                        </motion.p>
                    </motion.div>

                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {pillars.map((pillar, i) => (
                            <motion.div key={i} variants={fadeUp} className="glass-card p-8 sm:p-10 flex flex-col justify-between group">
                                <div>
                                    <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                                        {pillar.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">{pillar.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-base">{pillar.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Photo Gallery Section */}
            <section className="py-24 bg-brand-dark relative border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={fadeUp}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <span className="badge-gold mb-3">Community in Action</span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4">
                            Nexus <span className="text-gold-gradient">Moments</span>
                        </h2>
                        <p className="text-gray-400 text-base">Real stories, real connection, real Kingdom transformation in Nairobi CBD.</p>
                    </motion.div>

                    <ImageGrid images={slides} />
                </div>
            </section>
        </main>
    );
};

export default YouthSparkNexus;
