import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import CountUp from 'react-countup';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true
    };

    return (
        <main className="overflow-hidden">
            {/* Parallax Hero Landing */}
            <Parallax bgImage="/about-skyline.png" strength={200} blur={{ min: -15, max: 15 }}>
                <section id="hero" className="h-screen flex items-center justify-center relative bg-black/50">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A]" />
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="text-center z-10 px-4"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight px-1">
                            Ignite Your <span className="text-[#FCD12A]">Spark</span>
                        </h1>
                        <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto px-1">
                            Equipping kingdom-minded youth to transform industries and shape global culture.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full max-w-md sm:max-w-none mx-auto">
                            <Link to="/about" className="px-8 py-3 bg-[#FCD12A] text-[#0A0A0A] font-bold rounded-lg hover:bg-[#ebc127] transition-all text-center min-h-[48px] flex items-center justify-center">
                                Discover More
                            </Link>
                            <Link to="/events" className="px-8 py-3 border border-[#FCD12A] text-[#FCD12A] font-bold rounded-lg hover:bg-[#FCD12A]/10 transition-all text-center min-h-[48px] flex items-center justify-center">
                                Join Event
                            </Link>
                        </div>
                    </motion.div>
                </section>
            </Parallax>

            {/* Impact Counters Hook */}
            <section id="impact" className="py-16 bg-[#0A0A0A] border-y border-white/5">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-8">
                            <h3 className="text-4xl md:text-5xl font-bold text-[#FCD12A] mb-2">
                                <CountUp end={5000} duration={3} suffix="+" enableScrollSpy />
                            </h3>
                            <p className="text-gray-400 uppercase tracking-widest text-sm">Youth Empowered</p>
                        </div>
                        <div className="p-8">
                            <h3 className="text-4xl md:text-5xl font-bold text-[#FCD12A] mb-2">
                                <CountUp end={7} duration={2} enableScrollSpy />
                            </h3>
                            <p className="text-gray-400 uppercase tracking-widest text-sm">Spheres of Influence</p>
                        </div>
                        <div className="p-8">
                            <h3 className="text-4xl md:text-5xl font-bold text-[#FCD12A] mb-2">
                                <CountUp end={10} duration={3} suffix="+" enableScrollSpy />
                            </h3>
                            <p className="text-gray-400 uppercase tracking-widest text-sm">African Nations</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Teaser */}
            <section id="about" className="section-padding bg-[#0A0A0A]">
                <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <h2 className="text-[#FCD12A] text-4xl font-bold mb-6 uppercase">Who We Are</h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Youth Spark Nexus is more than a platformâ€”it's a transformative movement. We are dedicated to discipling nations through the Gospel of the Kingdom by equipping young leaders with practical skills and spiritual depth.
                        </p>
                        <Link to="/about" className="text-[#FCD12A] font-bold underline underline-offset-8 hover:text-white transition-colors">
                            Read the Full Story â†’
                        </Link>
                    </motion.div>
                    <div className="rounded-2xl overflow-hidden shadow-2xl md:rotate-3 md:hover:rotate-0 transition-transform duration-700 aspect-video">
                        <img src="/WHO WE ARE.jpg" alt="Who We Are & Our Vision" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* Program Hook Slider */}
            <section id="programs" className="section-padding bg-[#0d0d0d]">
                <div className="max-w-screen-xl mx-auto px-4 text-center mb-16">
                    <h2 className="text-[#FCD12A] text-4xl font-bold mb-4 uppercase">Our Core Focus</h2>
                    <p className="text-gray-500">Transforming lives through structured kingdom training.</p>
                </div>
                <div className="max-w-4xl mx-auto px-4">
                    <Slider {...sliderSettings}>
                        <div className="p-8 bg-[#111] rounded-3xl border border-white/5 text-center">
                            <h3 className="text-2xl text-white mb-4">Value-Driven Leadership</h3>
                            <p className="text-gray-400 mb-6">Building ethical leaders who stand for integrity in every mountain of influence.</p>
                            <Link to="/programs" className="px-6 py-2 bg-white/5 text-white rounded-full hover:bg-white/10 transition-all">Explore Programs</Link>
                        </div>
                        <div className="p-8 bg-[#111] rounded-3xl border border-white/5 text-center">
                            <h3 className="text-2xl text-white mb-4">Spiritual Growth</h3>
                            <p className="text-gray-400 mb-6">Identity-focused discipleship to anchor your journey in Kingdom principles.</p>
                            <Link to="/pillars" className="px-6 py-2 bg-white/5 text-white rounded-full hover:bg-white/10 transition-all">Our Pillars</Link>
                        </div>
                    </Slider>
                </div>
            </section>

            {/* CTA Section */}
            <section id="join-us" className="py-24 bg-[#FCD12A]">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A0A0A] mb-6 sm:mb-8 uppercase tracking-tighter px-2">Ready to Spark Change?</h2>
                    <p className="text-[#0A0A0A]/70 text-base sm:text-xl mb-8 sm:mb-10 max-w-xl mx-auto px-2">Join a community of thousands across Africa shaping the future of leadership.</p>
                    <Link to="/events" className="px-8 sm:px-12 py-4 bg-[#0A0A0A] text-white font-bold rounded-xl shadow-2xl hover:scale-105 transition-all text-base sm:text-lg inline-flex min-h-[48px] items-center justify-center">
                        Find Your Next Event
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Home;


