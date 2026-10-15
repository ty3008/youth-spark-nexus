import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    GraduationCap, CheckCircle2, Calendar, Target, 
    ArrowRight, ExternalLink, ChevronRight, Sparkles, Layers 
} from 'lucide-react';
import ImageGrid from '../../components/ImageGrid';

const APPLICATION_FORM_URL = 'https://forms.gle/g62AnhQpsnD3YGvG6';

const ReconstructiveLeadership = () => {
    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };
    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

    const slides = [
        '/Hangout1.jpg',
        '/Hangout 2.jpg',
        '/Hangout 3.jpg'
    ];

    const curriculum = [
        {
            month: "Month 01",
            title: "Identity & Mindset Reconstruction",
            desc: "Dismantling limiting paradigms and ungodly culture. Establishing deep Kingdom identity, personal discipline, emotional intelligence, and unwavering spiritual convictions.",
            topics: ["Biblical Worldview vs Secular Constructs", "Identity & Consecrated Character", "Strategic Personal Discipline", "Overcoming Imposter Syndrome"]
        },
        {
            month: "Month 02",
            title: "Market-Ready & Monetizable Skills",
            desc: "Hands-on masterclasses with seasoned professionals. Equipping participants with tangible, income-generating capabilities to thrive in modern economies.",
            topics: ["Digital & Tech Competencies", "High-Value Communication & Persuasion", "Market Analysis & Value Proposition", "Ethical Sales & Freelancing Mastery"]
        },
        {
            month: "Month 03",
            title: "Venture Execution & Kingdom Impact",
            desc: "Turning theory into execution. Small teams design, validate, and launch real-world projects or ventures with mentorship from industry leaders.",
            topics: ["Capstone Venture Launch", "Financial Stewardship & Systems", "Scaling with Kingdom Integrity", "Graduation & Network Induction"]
        }
    ];

    return (
        <main className="bg-brand-dark min-h-screen pt-24 pb-20">
            <Helmet>
                <title>Reconstructive Leadership | 3-Month Skills & Ethics Cohort</title>
                <meta name="description" content="Reconstructive Leadership is an intensive 3-month cohort equipping young leaders with practical, monetizable skills and ethical Kingdom foundations to transform industries." />
            </Helmet>

            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                    <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/programs" className="hover:text-brand-gold transition-colors">Programs</Link>
                    <ChevronRight size={14} />
                    <span className="text-brand-gold">Reconstructive Leadership</span>
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
                                <GraduationCap className="w-4 h-4" /> 3-Month Cohort Accelerator
                            </motion.div>

                            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight mb-6 leading-[1.08]">
                                Reconstructive <br />
                                <span className="text-gold-gradient">Leadership</span>
                            </motion.h1>

                            <motion.p variants={fadeUp} className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl font-light">
                                A 3-month transformational journey designed to rebuild young leaders from within, equipping them with monetizable, real-world skills and unyielding Kingdom values.
                            </motion.p>

                            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 text-sm text-gray-400 mb-10 pb-8 border-b border-white/10 w-full">
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                    <Calendar className="text-brand-gold w-4 h-4" />
                                    <span>Quarterly Cohorts</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                    <Target className="text-brand-gold w-4 h-4" />
                                    <span>Practical Monetizable Skills</span>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <a 
                                    href={APPLICATION_FORM_URL} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn-primary gap-2 text-center"
                                >
                                    Apply for Next Cohort <ExternalLink size={16} />
                                </a>
                                <Link to="/pillars" className="btn-secondary gap-2 text-center">
                                    Our Core Methodology <ArrowRight size={16} />
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
                                        src="/Hangout 2.jpg" 
                                        alt="Reconstructive Leadership Intensive Session" 
                                        className="w-full h-full object-cover" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3-Month Roadmap */}
            <section className="py-24 bg-brand-darker relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={stagger}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <motion.span variants={fadeUp} className="badge-gold mb-3">Curriculum Framework</motion.span>
                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-6">
                            The 3-Month <span className="text-gold-gradient">Blueprint</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-gray-400 text-base sm:text-lg">
                            An intensive, hands-on structure delivering real-world economic capability anchored in kingdom character.
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {curriculum.map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial="hidden" 
                                whileInView="visible" 
                                viewport={{ once: true }} 
                                variants={fadeUp}
                                className="glass-card p-8 sm:p-10 flex flex-col justify-between relative group hover:border-brand-gold/50"
                            >
                                <div>
                                    <span className="text-xs uppercase tracking-widest font-heading font-bold text-brand-gold block mb-2">{item.month}</span>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm mb-6">{item.desc}</p>
                                    
                                    <div className="pt-6 border-t border-white/10 flex flex-col gap-2.5">
                                        {item.topics.map((t, ti) => (
                                            <div key={ti} className="flex items-center gap-2 text-xs text-gray-300">
                                                <CheckCircle2 size={14} className="text-brand-gold shrink-0" />
                                                <span>{t}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
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
                        <span className="badge-gold mb-3">Cohort Life</span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4">
                            Hangout & <span className="text-gold-gradient">Intensives</span>
                        </h2>
                        <p className="text-gray-400 text-base">Behind the scenes with our cohorts: learning, connecting, and growing.</p>
                    </motion.div>

                    <ImageGrid images={slides} />
                </div>
            </section>
        </main>
    );
};

export default ReconstructiveLeadership;
