import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Shield, Compass, Sparkles, Users, Church, Home as HomeIcon, 
    GraduationCap, Scale, Tv, Palette, Briefcase, ChevronRight, ArrowRight 
} from 'lucide-react';
import Pillars from '../components/Pillars';

const PillarsPage = () => {
    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };
    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

    const [activeMountain, setActiveMountain] = useState(0);

    const mountains = [
        {
            id: 'business',
            name: 'Business & Economy',
            icon: <Briefcase size={22} />,
            verse: 'Deuteronomy 8:18',
            quote: '“Remember the Lord your God, for it is He who gives you power to get wealth, that He may establish His covenant.”',
            mandate: 'Equipping entrepreneurs, investors, and professionals with ethical business practices, capital mastery, and kingdom economics to build sustainable African enterprises that eradicate poverty.'
        },
        {
            id: 'government',
            name: 'Government & Law',
            icon: <Scale size={22} />,
            verse: 'Proverbs 29:2',
            quote: '“When the righteous thrive, the people rejoice; when the wicked rule, the people groan.”',
            mandate: 'Raising principled stateswomen and statesmen equipped with unyielding integrity to influence policy, uphold justice, defend human dignity, and lead public institutions with excellence.'
        },
        {
            id: 'media',
            name: 'Media & Communications',
            icon: <Tv size={22} />,
            verse: 'Mark 16:15',
            quote: '“Go into all the world and proclaim the good news to the whole creation.”',
            mandate: 'Empowering digital creators, journalists, podcasters, and media executives to tell the true African story, counter deception, and broadcast the values of the Kingdom across global airwaves.'
        },
        {
            id: 'arts',
            name: 'Arts & Entertainment',
            icon: <Palette size={22} />,
            verse: 'Exodus 31:3',
            quote: '“I have filled him with the Spirit of God, with wisdom, with understanding, with knowledge and with all kinds of skills.”',
            mandate: 'Unleashing anointed musicians, filmmakers, designers, and creatives who reclaim cultural narratives, celebrate beauty, and set new standards of artistic genius.'
        },
        {
            id: 'education',
            name: 'Education & Academia',
            icon: <GraduationCap size={22} />,
            verse: 'Proverbs 9:10',
            quote: '“The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.”',
            mandate: 'Transforming university campuses and schools by raising scholars, researchers, and educators who integrate faith with rigorous intellectual inquiry and innovation.'
        },
        {
            id: 'family',
            name: 'Family & Identity',
            icon: <HomeIcon size={22} />,
            verse: 'Joshua 24:15',
            quote: '“As for me and my household, we will serve the Lord.”',
            mandate: 'Restoring healthy marriages, nurturing God-fearing generational identity, and providing mentorship to heal fatherlessness and broken foundations in modern society.'
        },
        {
            id: 'religion',
            name: 'Religion & Church',
            icon: <Church size={22} />,
            verse: 'Matthew 16:18',
            quote: '“On this rock I will build my church, and the gates of Hades will not overcome it.”',
            mandate: 'Nurturing consecrated, apostolic ministers who partner with local churches to raise burning disciples who take the gospel beyond church walls into everyday society.'
        }
    ];

    return (
        <main className="bg-brand-dark min-h-screen pt-24 pb-20">
            <Helmet>
                <title>Our Pillars & The 7 Mountains of Influence | Youth Spark Nexus</title>
                <meta name="description" content="Explore the foundational pillars of Youth Spark Nexus: Faith, Leadership, Influence, and Community, and our mandate across the 7 Mountains of societal influence." />
            </Helmet>
            
            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                    <RouterLink to="/" className="hover:text-brand-gold transition-colors">Home</RouterLink>
                    <ChevronRight size={14} />
                    <RouterLink to="/about" className="hover:text-brand-gold transition-colors">About</RouterLink>
                    <ChevronRight size={14} />
                    <span className="text-brand-gold">Our Pillars</span>
                </nav>
            </div>

            {/* Header Hero */}
            <section className="relative py-16 overflow-hidden">
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-[700px] h-[350px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div initial="hidden" animate="visible" variants={stagger}>
                        <motion.span variants={fadeUp} className="badge-gold mb-4">Foundational Architecture</motion.span>
                        <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl md:text-7xl font-bold text-white uppercase tracking-tight mb-6">
                            Pillars & <span className="text-gold-gradient">Spheres</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                            True transformation starts from within. Built on four immovable pillars and deployed across the 7 mountains of cultural influence to disciple Africa.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* 4 Pillars Section */}
            <Pillars />

            {/* 7 Mountains of Influence Deep Dive */}
            <section className="py-24 bg-brand-darker relative border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={stagger}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <motion.span variants={fadeUp} className="badge-gold mb-3">Societal Deployment</motion.span>
                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-6">
                            The 7 Mountains <span className="text-gold-gradient">of Influence</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-gray-400 text-base sm:text-lg">
                            We train young leaders not to retreat from the world, but to occupy and disciple the seven strategic pillars that govern human culture.
                        </motion.p>
                    </motion.div>

                    {/* Interactive Mountains Navigation */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 mb-10">
                        {mountains.map((m, index) => (
                            <button
                                key={m.id}
                                onClick={() => setActiveMountain(index)}
                                className={`p-4 rounded-xl text-center flex flex-col items-center justify-center gap-2.5 transition-all duration-300 border ${
                                    activeMountain === index
                                        ? 'bg-brand-gold text-black border-brand-gold shadow-[0_0_20px_rgba(252,209,42,0.4)]'
                                        : 'bg-brand-card/80 text-gray-400 border-white/10 hover:border-brand-gold/40 hover:text-white'
                                }`}
                            >
                                <span className={activeMountain === index ? 'text-black' : 'text-brand-gold'}>{m.icon}</span>
                                <span className="text-xs font-heading font-bold uppercase tracking-wider line-clamp-1">{m.name.split(' ')[0]}</span>
                            </button>
                        ))}
                    </div>

                    {/* Active Mountain Display Card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeMountain}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.25 }}
                            className="glass-card p-8 sm:p-12 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none"></div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                                <div className="lg:col-span-4 flex flex-col items-start">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-6">
                                        {mountains[activeMountain].icon}
                                    </div>
                                    <span className="text-xs uppercase tracking-widest text-brand-gold font-bold mb-2">Sphere of Influence</span>
                                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">{mountains[activeMountain].name}</h3>
                                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{mountains[activeMountain].verse}</span>
                                </div>

                                <div className="lg:col-span-8 flex flex-col gap-6 lg:border-l lg:border-white/10 lg:pl-10">
                                    <blockquote className="text-xl sm:text-2xl text-gray-200 italic font-light leading-snug border-l-2 border-brand-gold pl-4">
                                        {mountains[activeMountain].quote}
                                    </blockquote>
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest text-brand-gold font-bold mb-2">Our Transformation Mandate</h4>
                                        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                                            {mountains[activeMountain].mandate}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Methodology Deep Dive */}
            <section className="py-24 bg-brand-dark relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="badge-gold mb-3">Our Methodology</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase tracking-tight">
                                Balancing Spiritual Depth with Marketplace Mastery
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">
                                Many movements focus solely on prayer without practical competence, while others teach career success devoid of moral integrity. Youth Spark Nexus bridges this divide:
                            </p>
                            <ul className="space-y-4 text-sm text-gray-300">
                                <li className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <span className="text-brand-gold font-bold">01.</span>
                                    <span><strong className="text-white">Apostolic Foundation:</strong> Rooting identity in Jesus Christ so worldly acclaim cannot corrupt character.</span>
                                </li>
                                <li className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <span className="text-brand-gold font-bold">02.</span>
                                    <span><strong className="text-white">Practical Competence:</strong> Equipping youth with in-demand, monetizable skills in technology, business, and leadership.</span>
                                </li>
                                <li className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <span className="text-brand-gold font-bold">03.</span>
                                    <span><strong className="text-white">Strategic Community:</strong> Creating circles of accountability and collaboration to scale ventures together.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="glass-card p-8 sm:p-12 text-center flex flex-col items-center justify-center">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 uppercase">Ready to Find Your Sphere?</h3>
                            <p className="text-gray-400 text-base mb-8 max-w-md">
                                Discover your assignment and connect with fellow leaders shaping Africa's destiny.
                            </p>
                            <RouterLink to="/programs" className="btn-primary group">
                                Explore Our Programs <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PillarsPage;
