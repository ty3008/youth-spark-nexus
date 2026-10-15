import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { 
    GraduationCap, Briefcase, Code, Sparkles, 
    Crown, MapPin, Globe, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getStandardSliderSettings } from '../constants/slickSettings';

const Audience = () => {
    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };
    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

    const sliderSettings = getStandardSliderSettings({
        autoplay: true,
        autoplaySpeed: 4500,
    });

    const segments = [
        {
            title: "University & College Students",
            desc: "Undergraduates and campus leaders across 20+ universities being anchored in moral fortitude, intellectual rigor, and kingdom conviction before entering the workforce.",
            icon: <GraduationCap className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "Early-Career & Corporate Professionals",
            desc: "Young analysts, engineers, doctors, and executives navigating competitive corporate environments with uncompromising excellence and ethical statesmanship.",
            icon: <Briefcase className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "Innovators, Founders & Tech Builders",
            desc: "Entrepreneurs and tech talent creating scalable African ventures, software solutions, and business models that solve real-world continental challenges.",
            icon: <Code className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "The Creative Class & Storytellers",
            desc: "Filmmakers, writers, musicians, and digital creators shaping popular culture, redeeming entertainment, and telling inspiring African stories.",
            icon: <Sparkles className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "Student Ministry & Civic Leaders",
            desc: "Student union presidents, club leaders, and youth pastors seeking systemic frameworks to transform their peers and institutions.",
            icon: <Crown className="w-6 h-6 text-brand-gold" />
        }
    ];

    const photos = [
        { src: '/Founders with PLO.jpg', caption: 'Engaging Iconic Thought Leaders & Mentors' },
        { src: '/kenya-vision.png', caption: 'Nairobi, Kenya — The Epicenter of the Movement' },
        { src: '/Nexus 3.jpg', caption: 'Monthly CBD Leadership Masterclasses' },
        { src: '/NXT 1.webp', caption: 'Executive Venture Dialogues at NXT Africa' },
        { src: '/Hangout 3.jpg', caption: 'Skills Accelerator Cohorts in Action' }
    ];

    return (
        <section id="audience" className="py-20 bg-brand-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Intro */}
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={stagger}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <motion.span variants={fadeUp} className="badge-gold mb-3">Our Core Community</motion.span>
                    <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-6">
                        Who We <span className="text-gold-gradient">Serve</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-gray-400 text-base sm:text-lg">
                        We empower young Africans situated at the pivotal junction of career, character, and cultural influence.
                    </motion.p>
                </motion.div>

                {/* Grid of Segments */}
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={stagger}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
                >
                    {segments.map((item, idx) => (
                        <motion.div key={idx} variants={fadeUp} className="glass-card p-8 flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-black transition-all">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                    <motion.div variants={fadeUp} className="glass-card p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-brand-card to-brand-gold/10 border-brand-gold/30">
                        <Globe className="w-12 h-12 text-brand-gold mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Pan-African Vision</h3>
                        <p className="text-gray-300 text-sm mb-6">Connecting kingdom innovators across borders to build a united, prosperous continent.</p>
                        <Link to="/partnerships" className="btn-primary text-xs py-2.5 px-5">
                            Partner With Us
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Showcase Slider */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-darker p-8 sm:p-12 rounded-3xl border border-white/5">
                    <div className="lg:col-span-5 flex flex-col items-start">
                        <span className="badge-gold mb-3">Live Moments</span>
                        <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-tight">
                            A Thriving Community of Visionaries
                        </h3>
                        <p className="text-gray-400 text-base leading-relaxed mb-6 font-light">
                            From packed university auditoriums to executive venture rooms, Youth Spark Nexus creates high-trust environments where purpose is birthed and validated.
                        </p>
                        <a 
                            href="https://chat.whatsapp.com/IVLWWZyO2GT6ONfjCgOw7K?mode=gi_t" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-primary gap-2 text-xs"
                        >
                            Join Our Network on WhatsApp <ArrowRight size={14} />
                        </a>
                    </div>

                    <div className="lg:col-span-7 rounded-2xl overflow-hidden audience-photo-slider">
                        <Slider {...sliderSettings}>
                            {photos.map((p, i) => (
                                <div key={i} className="outline-none">
                                    <div className="rounded-xl overflow-hidden aspect-[16/10] bg-black relative">
                                        <img src={p.src} alt={p.caption} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                                            <p className="text-white text-sm sm:text-base font-semibold">{p.caption}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Audience;
