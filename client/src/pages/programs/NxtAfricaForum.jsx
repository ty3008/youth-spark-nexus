import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Briefcase, TrendingUp, Lightbulb, Globe, Award, 
    ArrowRight, ExternalLink, ChevronRight, CheckCircle2 
} from 'lucide-react';
import ImageGrid from '../../components/ImageGrid';

const NXT_INTEREST_FORM = 'https://forms.gle/g62AnhQpsnD3YGvG6';

const NxtAfricaForum = () => {
    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };
    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

    const slides = [
        '/NXT Poster.webp',
        '/NXT 5.webp',
        '/NXT 2.webp',
        '/NXT 1.webp',
        '/NXT4.webp',
        '/NXT 3.webp',
        '/NXT 6.webp',
        '/NXT 7.webp',
        '/NXT 8.webp'
    ];

    const verticals = [
        {
            title: "Scalable Tech & Digital Infrastructure",
            desc: "Unlocking venture building, artificial intelligence, fintech, and digital enterprise models engineered for African markets.",
            icon: <TrendingUp className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "Capital Formation & Kingdom Economics",
            desc: "Bridging the gap between ethical capital, venture investments, angel syndicates, and high-impact faith-driven startups.",
            icon: <Briefcase className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "Statesmanship & Pan-African Policy",
            desc: "Catalytic dialogues with foremost African statesmen and legal luminaries on policy reform, governance, and institutional excellence.",
            icon: <Globe className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "The Creative & IP Economy",
            desc: "Monetizing intellectual property, media storytelling, and modern cultural expressions to export African excellence to the globe.",
            icon: <Lightbulb className="w-6 h-6 text-brand-gold" />
        }
    ];

    return (
        <main className="bg-brand-dark min-h-screen pt-24 pb-20">
            <Helmet>
                <title>NXT Africa Forum | High-Level Leadership & Venture Summit</title>
                <meta name="description" content="NXT Africa Forum convenes influential minds from technology, finance, business, and policy to deliver practical strategies for scalable ventures across Africa." />
            </Helmet>

            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                    <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/programs" className="hover:text-brand-gold transition-colors">Programs</Link>
                    <ChevronRight size={14} />
                    <span className="text-brand-gold">NXT Africa Forum</span>
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
                                <Award className="w-3.5 h-3.5" /> High-Level Executive & Venture Forum
                            </motion.div>

                            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight mb-6 leading-[1.08]">
                                NXT Africa <br />
                                <span className="text-gold-gradient">Forum</span>
                            </motion.h1>

                            <motion.p variants={fadeUp} className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl font-light">
                                An intimate convening uniting influential leaders across business, technology, finance, policy, and the creative economy. Transforming conversations into scalable ventures and sovereign African solutions.
                            </motion.p>

                            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <a 
                                    href={NXT_INTEREST_FORM} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn-primary gap-2 text-center"
                                >
                                    Request Forum Invitation <ExternalLink size={16} />
                                </a>
                                <Link to="/partnerships" className="btn-secondary gap-2 text-center">
                                    Become a Strategic Partner <ArrowRight size={16} />
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
                                        src="/NXT Poster.webp" 
                                        alt="NXT Africa Forum Poster" 
                                        className="w-full h-full object-cover" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Strategic Verticals */}
            <section className="py-24 bg-brand-darker relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={stagger}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <motion.span variants={fadeUp} className="badge-gold mb-3">Core Verticals</motion.span>
                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-6">
                            Catalyzing <span className="text-gold-gradient">African Frontiers</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-gray-400 text-base sm:text-lg">
                            We curate intimate closed-door sessions, keynote masterclasses, and deal-making lounges focusing on systemic economic impact.
                        </motion.p>
                    </motion.div>

                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {verticals.map((v, i) => (
                            <motion.div key={i} variants={fadeUp} className="glass-card p-8 sm:p-10 flex flex-col justify-between group">
                                <div>
                                    <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                                        {v.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">{v.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-base">{v.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Distinguished Patrons Feature */}
            <section className="py-20 bg-brand-dark relative border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 rounded-2xl overflow-hidden glass-card p-3">
                            <div className="rounded-xl overflow-hidden aspect-[4/3] sm:aspect-square">
                                <img src="/Founders with PLO.jpg" alt="Youth Spark Founders with Prof. P.L.O. Lumumba" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="lg:col-span-7 flex flex-col items-start">
                            <span className="badge-gold mb-3">Distinguished Counsel</span>
                            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase tracking-tight">
                                Engaging Pan-African Statesmanship
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                                Through NXT Africa Forum, Youth Spark Nexus engages iconic pan-African statesmen and thought leaders like <strong className="text-white font-semibold">Prof. P.L.O. Lumumba</strong>, bridging generational wisdom to shape the next frontier of ethical African governance and economic freedom.
                            </p>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-400">
                                "The youth of Africa are not merely leaders of tomorrow; they are the architects of today's economic renaissance."
                            </div>
                        </div>
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
                        <span className="badge-gold mb-3">Forum Archive</span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4">
                            NXT Africa <span className="text-gold-gradient">Gallery</span>
                        </h2>
                        <p className="text-gray-400 text-base">Capturing executive dialogues, innovation showcases, and catalytic collaborations.</p>
                    </motion.div>

                    <ImageGrid images={slides} />
                </div>
            </section>
        </main>
    );
};

export default NxtAfricaForum;
