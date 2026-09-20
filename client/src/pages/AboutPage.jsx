import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Crosshair, Eye, Heart, Target } from 'lucide-react';

const AboutPage = () => {
    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

    return (
        <main className="bg-brand-dark pt-24 min-h-screen">
            <Helmet>
                <title>Our Story | Youth Spark Nexus</title>
                <meta name="description" content="Learn more about Youth Spark Nexus, our vision to disciple nations and our mission to empower young leaders." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div initial="hidden" animate="visible" variants={stagger}>
                        <motion.span variants={fadeUp} className="text-brand-gold uppercase tracking-[0.3em] text-sm font-bold mb-4 block">Our Identity</motion.span>
                        <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-7xl font-bold text-white uppercase tracking-tight mb-6">
                            Who We Are
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                            A transformative movement growing value-driven leaders across Kenya and Africa to disciple nations.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content & Founders */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                        className="mb-20 rounded-3xl overflow-hidden shadow-2xl relative aspect-[21/9] group"
                    >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700 z-10"></div>
                        <img src="/WHO WE ARE.jpg" alt="Youth Spark Nexus Community" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Founders */}
                        <motion.div 
                            initial="hidden" 
                            whileInView="visible" 
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="lg:col-span-5 flex flex-col"
                        >
                            <h2 className="text-3xl font-bold text-white mb-6 uppercase flex items-center gap-3">
                                <Heart className="text-brand-gold" /> The Founders
                            </h2>
                            <div className="glass-card p-6 md:p-8">
                                <div className="rounded-2xl overflow-hidden mb-6 aspect-[4/5]">
                                    <img src="/fouders.jpg" alt="Kevin Kimani and Daphne Kimani" className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-2xl font-bold text-brand-gold mb-2">Kevin & Daphne Kimani</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    A loving, powerful, and God-fearing couple dedicated to empowering the next generation. Their visionary leadership birthed Youth Spark Nexus with a mandate to ignite purpose and establish Kingdom culture in the youth of Africa.
                                </p>
                            </div>
                        </motion.div>

                        {/* Vision & Mission */}
                        <motion.div 
                            initial="hidden" 
                            whileInView="visible" 
                            viewport={{ once: true }}
                            variants={stagger}
                            className="lg:col-span-7 flex flex-col justify-center gap-12"
                        >
                            <motion.div variants={fadeUp}>
                                <h2 className="text-3xl font-bold text-white mb-4 uppercase flex items-center gap-3">
                                    <Eye className="text-brand-gold" size={32} /> Our Vision
                                </h2>
                                <p className="text-2xl sm:text-3xl font-light text-gray-300 leading-snug border-l-4 border-brand-gold pl-6 py-2">
                                    Discipling Nations through the Gospel of the Kingdom.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp}>
                                <h2 className="text-3xl font-bold text-white mb-4 uppercase flex items-center gap-3">
                                    <Target className="text-brand-gold" size={32} /> Our Mission
                                </h2>
                                <p className="text-lg text-gray-400 leading-relaxed bg-brand-card/50 p-8 rounded-2xl border border-white/5">
                                    To disciple and equip young leaders through Kingdom-centered leadership training, practical skills development, and industry-focused mentorship — empowering them to transform industries, shape culture, influence societies, and advance nation-building with excellence.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Three Pillars Overview */}
            <section className="py-24 bg-brand-darker relative border-y border-white/5">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                    >
                        <motion.div variants={fadeUp} className="glass-card p-10 hover:border-brand-gold/50 transition-colors">
                            <Crosshair className="w-12 h-12 text-brand-gold mx-auto mb-6" />
                            <h3 className="text-white font-bold text-xl mb-4 uppercase">Our History</h3>
                            <p className="text-gray-400 text-base leading-relaxed">Growing from a local movement in Kenya to a rapidly expanding African-wide network of value-driven leaders.</p>
                        </motion.div>
                        <motion.div variants={fadeUp} className="glass-card p-10 hover:border-brand-gold/50 transition-colors">
                            <Target className="w-12 h-12 text-brand-gold mx-auto mb-6" />
                            <h3 className="text-white font-bold text-xl mb-4 uppercase">Our Values</h3>
                            <p className="text-gray-400 text-base leading-relaxed">Integrity, Excellence, and Kingdom-centered leadership penetrating all 7 mountains of societal influence.</p>
                        </motion.div>
                        <motion.div variants={fadeUp} className="glass-card p-10 hover:border-brand-gold/50 transition-colors">
                            <Eye className="w-12 h-12 text-brand-gold mx-auto mb-6" />
                            <h3 className="text-white font-bold text-xl mb-4 uppercase">Our Future</h3>
                            <p className="text-gray-400 text-base leading-relaxed">Transforming industries, shifting paradigms, and actively shaping cultures across the continent by 2030.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-brand-dark text-center px-4">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">Discover Our Approach</h2>
                    <p className="text-gray-400 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                        Built on four foundational pillars: Faith, Leadership, Influence, and Community. Learn how we structure our transformation programs to build the next generation.
                    </p>
                    <RouterLink to="/pillars" className="btn-primary group text-lg">
                        Explore Our Pillars <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </RouterLink>
                </motion.div>
            </section>
        </main>
    );
};

export default AboutPage;
