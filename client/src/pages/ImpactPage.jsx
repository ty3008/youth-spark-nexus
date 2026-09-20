import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { ChevronRight, Quote } from 'lucide-react';

const ImpactPage = () => {
    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

    return (
        <main className="bg-brand-dark min-h-screen pt-24 pb-20">
            <Helmet>
                <title>Our Impact | Youth Spark Nexus</title>
                <meta name="description" content="See the real-world impact of Youth Spark Nexus in transforming lives and shaping culture." />
            </Helmet>
            
            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <RouterLink to="/" className="hover:text-brand-gold transition-colors">Home</RouterLink>
                    <ChevronRight size={14} />
                    <span className="text-brand-gold">Impact</span>
                </nav>
            </div>

            <section className="py-16 relative">
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div initial="hidden" animate="visible" variants={stagger}>
                        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">Impact</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-16">
                            See the real-world impact of Youth Spark Nexus in transforming lives, universities, and shaping the cultural landscape of Africa.
                        </motion.p>

                        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-20">
                            <motion.div variants={fadeUp} className="glass-card p-10">
                                <h3 className="text-6xl font-bold text-white mb-4">
                                    <CountUp end={1500} duration={3} suffix="+" enableScrollSpy scrollSpyDelay={200} />
                                </h3>
                                <p className="text-brand-gold uppercase tracking-widest text-sm font-semibold">Attendees at Youth Spark Summit</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="glass-card p-10">
                                <h3 className="text-6xl font-bold text-white mb-4">
                                    <CountUp end={20} duration={2} suffix="+" enableScrollSpy scrollSpyDelay={200} />
                                </h3>
                                <p className="text-brand-gold uppercase tracking-widest text-sm font-semibold">Universities Reached</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="glass-card p-10">
                                <h3 className="text-6xl font-bold text-white mb-4">
                                    <CountUp end={1000} duration={3} suffix="+" enableScrollSpy scrollSpyDelay={200} />
                                </h3>
                                <p className="text-brand-gold uppercase tracking-widest text-sm font-semibold">Students Actively Engaged</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-brand-darker border-y border-white/5 relative">
                <div className="absolute inset-0 bg-[url('/Impact (2).jpg')] bg-cover bg-center mix-blend-overlay opacity-20 bg-fixed"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto glass-card p-12">
                        <Quote className="w-16 h-16 text-brand-gold/50 mx-auto mb-8" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">"A growing network of Leaders, Influencers, and Mentors."</h2>
                        <p className="text-xl text-gray-300 italic">Impacting the 7 mountains of influence across Africa.</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-16 uppercase tracking-tight">Success Stories</motion.h2>
                        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div variants={fadeUp} className="glass-card p-8 flex flex-col justify-between text-left">
                                <p className="text-gray-300 italic mb-8 text-lg leading-relaxed">"Youth Spark didn't just teach me leadership; they gave me a vision for my nation. I now lead my campus ministry with renewed purpose."</p>
                                <div className="border-t border-white/10 pt-4">
                                    <p className="text-brand-gold font-bold uppercase tracking-wider text-sm">Alumni, Kenya</p>
                                </div>
                            </motion.div>
                            <motion.div variants={fadeUp} className="glass-card p-8 flex flex-col justify-between text-left">
                                <p className="text-gray-300 italic mb-8 text-lg leading-relaxed">"The 7 mountains framework changed how I approach my business in tech. It's no longer just about profit, but Kingdom impact."</p>
                                <div className="border-t border-white/10 pt-4">
                                    <p className="text-brand-gold font-bold uppercase tracking-wider text-sm">Tech Entrepreneur</p>
                                </div>
                            </motion.div>
                            <motion.div variants={fadeUp} className="glass-card p-8 flex flex-col justify-between text-left">
                                <p className="text-gray-300 italic mb-8 text-lg leading-relaxed">"A movement that is truly building the next generation of African leaders. The level of excellence is unmatched."</p>
                                <div className="border-t border-white/10 pt-4">
                                    <p className="text-brand-gold font-bold uppercase tracking-wider text-sm">Community Leader</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default ImpactPage;
