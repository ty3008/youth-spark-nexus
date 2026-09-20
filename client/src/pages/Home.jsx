import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import CountUp from 'react-countup';
import Slider from 'react-slick';
import { ArrowRight, Globe, Users, Shield, Zap } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getHomeProgramsSliderSettings } from '../constants/slickSettings';

const Home = () => {
    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const sliderSettings = getHomeProgramsSliderSettings();

    return (
        <main className="overflow-hidden bg-brand-dark">
            {/* Parallax Hero Landing */}
            <Parallax bgImage="/about-skyline.png" strength={200} blur={{ min: -5, max: 5 }}>
                <section id="hero" className="min-h-screen flex items-center justify-center relative bg-black/60">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-transparent to-brand-dark" />
                    
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="text-center z-10 px-4 w-full max-w-4xl mx-auto pt-20"
                    >
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-brand-gold animate-pulse"></span>
                            <span className="text-xs font-medium text-white uppercase tracking-widest">Empowering Kingdom Youth</span>
                        </motion.div>

                        <motion.h1 variants={fadeUp} className="font-bold text-white mb-6 uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]">
                            Ignite Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200 drop-shadow-[0_0_15px_rgba(252,209,42,0.3)]">Spark</span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl leading-relaxed">
                            Equipping kingdom-minded youth to transform industries, lead with integrity, and shape global culture.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none mx-auto">
                            <Link to="/about" className="btn-primary w-full sm:w-auto">
                                Discover More
                            </Link>
                            <Link to="/events" className="btn-secondary w-full sm:w-auto group">
                                Join Event <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>
            </Parallax>

            {/* Impact Counters Hook */}
            <section id="impact" className="py-20 bg-brand-darker relative z-10 -mt-1">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="max-w-7xl mx-auto px-4 relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass-card p-10">
                            <div className="mx-auto w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 text-brand-gold">
                                <Users size={24} />
                            </div>
                            <h3 className="text-5xl font-bold text-white mb-2">
                                <CountUp end={5000} duration={3} suffix="+" enableScrollSpy scrollSpyDelay={200} />
                            </h3>
                            <p className="text-brand-gold uppercase tracking-widest text-sm font-semibold">Youth Empowered</p>
                        </motion.div>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }} className="glass-card p-10">
                            <div className="mx-auto w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 text-brand-gold">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-5xl font-bold text-white mb-2">
                                <CountUp end={7} duration={2} enableScrollSpy scrollSpyDelay={200} />
                            </h3>
                            <p className="text-brand-gold uppercase tracking-widest text-sm font-semibold">Spheres of Influence</p>
                        </motion.div>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.4 }} className="glass-card p-10">
                            <div className="mx-auto w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 text-brand-gold">
                                <Globe size={24} />
                            </div>
                            <h3 className="text-5xl font-bold text-white mb-2">
                                <CountUp end={10} duration={3} suffix="+" enableScrollSpy scrollSpyDelay={200} />
                            </h3>
                            <p className="text-brand-gold uppercase tracking-widest text-sm font-semibold">African Nations</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Teaser */}
            <section id="about" className="py-24 bg-brand-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="order-2 lg:order-1">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                            <div className="absolute inset-0 bg-brand-gold/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-all duration-700"></div>
                            <img src="/WHO WE ARE.jpg" alt="Who We Are & Our Vision" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        </div>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="order-1 lg:order-2">
                        <h2 className="text-brand-gold text-sm font-bold mb-3 uppercase tracking-widest flex items-center gap-2">
                            <Zap size={16} /> Our Identity
                        </h2>
                        <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-tight">Who We Are</h3>
                        <p className="text-gray-400 text-lg sm:text-xl mb-8 leading-relaxed">
                            Youth Spark Nexus is more than a platform—it's a transformative movement. We are dedicated to discipling nations through the Gospel of the Kingdom by equipping young leaders with practical skills, unshakeable identity, and deep spiritual depth.
                        </p>
                        <Link
                            to="/about"
                            className="inline-flex items-center text-white font-bold hover:text-brand-gold transition-colors group text-lg border-b-2 border-brand-gold pb-1"
                        >
                            Read the Full Story <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Program Hook Slider */}
            <section id="programs" className="py-24 bg-brand-card border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 text-center mb-16 relative z-10">
                    <h2 className="text-brand-gold text-sm font-bold mb-3 uppercase tracking-widest">Growth & Impact</h2>
                    <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-tight">Our Core Focus</h3>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">Transforming lives through structured, kingdom-centric training paradigms.</p>
                </div>
                
                <div className="max-w-5xl mx-auto px-4 home-core-focus-slider relative z-10 pb-12">
                    <Slider {...sliderSettings}>
                        <div className="px-2">
                            <div className="p-8 sm:p-10 glass-card min-h-[320px] flex flex-col justify-center items-center text-center">
                                <h4 className="text-2xl text-white font-bold mb-4">Value-Driven Leadership</h4>
                                <p className="text-gray-400 mb-8 text-lg leading-relaxed">Building ethical, visionary leaders who stand for integrity and excellence in every mountain of influence.</p>
                                <Link to="/programs" className="btn-secondary w-full sm:w-auto text-sm">Explore Programs</Link>
                            </div>
                        </div>
                        <div className="px-2">
                            <div className="p-8 sm:p-10 glass-card min-h-[320px] flex flex-col justify-center items-center text-center">
                                <h4 className="text-2xl text-white font-bold mb-4">Spiritual Growth</h4>
                                <p className="text-gray-400 mb-8 text-lg leading-relaxed">Identity-focused discipleship to anchor your journey in immutable Kingdom principles and deep faith.</p>
                                <Link to="/pillars" className="btn-secondary w-full sm:w-auto text-sm">Our Pillars</Link>
                            </div>
                        </div>
                    </Slider>
                </div>
            </section>

            {/* CTA Section */}
            <section id="join-us" className="py-24 bg-brand-gold relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/about-skyline.png')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-dark mb-6 uppercase tracking-tighter">Ready to Spark Change?</h2>
                        <p className="text-brand-dark/80 font-medium text-lg sm:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
                            Join a community of thousands across Africa shaping the future of leadership and bringing light to every sector.
                        </p>
                        <Link to="/events" className="inline-flex items-center justify-center px-10 py-5 bg-brand-dark text-white font-bold rounded-xl shadow-2xl hover:bg-black hover:scale-105 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 text-lg uppercase tracking-wider group">
                            Find Your Next Event <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default Home;
