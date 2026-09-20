import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { ArrowRight, ChevronRight, Zap, GraduationCap, Users, LayoutDashboard } from 'lucide-react';
import { getStandardSliderSettings } from '../constants/slickSettings';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProgramsPage = () => {
    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

    const sliderSettings = getStandardSliderSettings({
        autoplay: true,
        autoplaySpeed: 4500,
    });

    const programs = [
        {
            name: 'Youth Spark Summit',
            link: '/programs/youth-spark-summit',
            icon: <Zap size={24} className="text-brand-gold" />,
            overview: 'Our annual flagship event bringing together over 1,500 young leaders for worship, word, and leadership development. Key topics include Kingdom Leadership, Career Workshops, Wealth Creation Purpose, and Innovation.',
            images: ['/YSS 2025 Poster.jpg', '/YSS 2025.jpg', '/YSS 6.jpg']
        },
        {
            name: 'Youth Spark Nexus',
            link: '/programs/youth-spark-nexus',
            icon: <Users size={24} className="text-brand-gold" />,
            overview: 'Monthly discipleship and leadership sessions at Nairobi CBD, featuring word, worship, and group discussions for 100+ participants. Build community and grow in faith.',
            images: ['/Nexus 3.jpg', '/Nexus 2.jpg', '/Nexus.jpg']
        },
        {
            name: 'NXT Africa Forum',
            link: '/programs/nxt-africa-forum',
            icon: <LayoutDashboard size={24} className="text-brand-gold" />,
            overview: 'An intimate forum convening influential voices from business, technology, finance, leadership, and the creative economy to deliver practical insights, real-world strategies, and catalytic conversations for scalable ventures.',
            images: ['/NXT Poster.webp', '/NXT 5.webp', '/NXT 2.webp']
        },
        {
            name: 'Reconstructive Leadership',
            link: '/programs/reconstructive-leadership',
            icon: <GraduationCap size={24} className="text-brand-gold" />,
            overview: 'A 3-month structured program designed to rebuild and equip young leaders with practical, monetizable skills. Through deep learning, hands-on projects, and sessions with skilled guest experts.',
            images: ['/Hangout1.jpg', '/Hangout 2.jpg', '/Hangout 3.jpg']
        }
    ];

    return (
        <main className="bg-brand-dark pt-24 min-h-screen">
            <Helmet>
                <title>Programs | Youth Spark Nexus</title>
                <meta name="description" content="Our structured programs for leadership development, skill acquisition, and kingdom-centered training." />
            </Helmet>
            
            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <RouterLink to="/" className="hover:text-brand-gold transition-colors">Home</RouterLink>
                    <ChevronRight size={14} />
                    <span className="text-brand-gold">Programs</span>
                </nav>
            </div>

            {/* Hero Section */}
            <section className="py-16 relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div initial="hidden" animate="visible" variants={stagger}>
                        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">Programs</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            Discover our Kingdom-centered programs designed to equip and empower young leaders across Africa. Structured pathways for lasting transformation.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Programs List */}
            <section className="py-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="flex flex-col gap-12"
                    >
                        {programs.map((program, index) => (
                            <motion.div 
                                key={program.name} 
                                variants={fadeUp}
                                className="glass-card overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0 group"
                            >
                                {/* Images */}
                                <div className="md:col-span-5 h-[300px] md:h-full relative overflow-hidden bg-black">
                                    <Slider {...sliderSettings} className="h-full programs-slider">
                                        {program.images.map((img, i) => (
                                            <div key={i} className="h-[300px] md:h-full outline-none">
                                                <img src={img} alt={`${program.name} photo ${i + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </Slider>
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60 pointer-events-none"></div>
                                </div>
                                
                                {/* Content */}
                                <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center relative">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                        {program.icon}
                                    </div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center">
                                            {program.icon}
                                        </div>
                                        <h2 className="text-3xl font-bold text-white">{program.name}</h2>
                                    </div>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                        {program.overview}
                                    </p>
                                    <RouterLink to={program.link} className="inline-flex items-center text-brand-gold font-bold uppercase tracking-wider text-sm hover:text-white transition-colors group/link w-fit">
                                        View Program Details <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                                    </RouterLink>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section className="py-24 bg-brand-darker border-t border-white/5 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-4">Program <span className="text-brand-gold">Roadmap</span></h2>
                        <p className="text-gray-400 text-lg">A structured journey of transformation and leadership.</p>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }}
                        variants={stagger}
                        className="relative border-l-2 border-brand-gold/30 ml-6 md:ml-12 space-y-12 pb-8"
                    >
                        <motion.div variants={fadeUp} className="relative pl-10 md:pl-16">
                            <div className="absolute -left-[25px] top-1 w-12 h-12 rounded-full bg-brand-gold text-black flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(252,209,42,0.5)]">
                                1
                            </div>
                            <div className="glass-card p-6 md:p-8">
                                <h3 className="text-white text-2xl font-bold mb-3 uppercase">Foundational Training</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">Core modules on identity, kingdom principles, and spiritual growth to set a strong base for future leaders.</p>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUp} className="relative pl-10 md:pl-16">
                            <div className="absolute -left-[25px] top-1 w-12 h-12 rounded-full bg-brand-darker border-2 border-brand-gold text-brand-gold flex items-center justify-center font-bold text-xl">
                                2
                            </div>
                            <div className="glass-card p-6 md:p-8">
                                <h3 className="text-white text-2xl font-bold mb-3 uppercase">Advanced Leadership</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">Strategic thinking, management, and influence across the 7 mountains. Practical applications and mentorship.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            
            <style>{`
                .programs-slider .slick-slide > div {
                    height: 100%;
                }
            `}</style>
        </main>
    );
};

export default ProgramsPage;
