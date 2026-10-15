import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import CountUp from 'react-countup';
import { 
    ArrowRight, Globe, Users, Shield, Zap, Sparkles, 
    MessageCircle, Calendar, ChevronDown, CheckCircle2, 
    Briefcase, Scale, Tv, Palette, GraduationCap, Home as HomeIcon, Church 
} from 'lucide-react';

const GOOGLE_FORM_URL = 'https://forms.gle/g62AnhQpsnD3YGvG6';

const Home = () => {
    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

    const [openFaq, setOpenFaq] = useState(null);
    const [activeMountain, setActiveMountain] = useState(0);
    const [programTab, setProgramTab] = useState('all');

    const programs = [
        {
            id: 'summit',
            title: 'Youth Spark Summit',
            badge: 'Annual Flagship',
            category: 'annual',
            desc: 'Over 1,500+ young visionaries gathering for apostolic word, marketplace innovation, worship, and national commissioning.',
            image: '/YSS 2025.jpg',
            link: '/programs/youth-spark-summit'
        },
        {
            id: 'nexus',
            title: 'Youth Spark Nexus',
            badge: 'Monthly Gathering',
            category: 'monthly',
            desc: 'Monthly discipleship and leadership sessions in Nairobi CBD for 100+ emerging leaders to build community and sharpen character.',
            image: '/Nexus 3.jpg',
            link: '/programs/youth-spark-nexus'
        },
        {
            id: 'nxt',
            title: 'NXT Africa Forum',
            badge: 'Executive & Ventures',
            category: 'forum',
            desc: 'Convening high-level voices from business, technology, finance, and statesmanship to launch scalable African solutions.',
            image: '/NXT 1.webp',
            link: '/programs/nxt-africa-forum'
        },
        {
            id: 'reconstructive',
            title: 'Reconstructive Leadership',
            badge: '3-Month Accelerator',
            category: 'accelerator',
            desc: 'Quarterly intensive cohorts equipping young leaders with practical, monetizable skills and biblical character.',
            image: '/Hangout 2.jpg',
            link: '/programs/reconstructive-leadership'
        }
    ];

    const filteredPrograms = programTab === 'all' 
        ? programs 
        : programs.filter(p => p.category === programTab);

    const mountains = [
        { 
            name: 'Business & Economy', 
            icon: <Briefcase size={20} />,
            verse: 'Deuteronomy 8:18',
            quote: '“He who gives you power to get wealth...”',
            desc: 'Equipping entrepreneurs and investors with ethical commerce, capital mastery, and kingdom economics to build generational African ventures.'
        },
        { 
            name: 'Government & Law', 
            icon: <Scale size={20} />,
            verse: 'Proverbs 29:2',
            quote: '“When the righteous thrive, the people rejoice...”',
            desc: 'Raising principled stateswomen and statesmen equipped with unyielding integrity to reform public institutions and defend justice.'
        },
        { 
            name: 'Media & Tech', 
            icon: <Tv size={20} />,
            verse: 'Mark 16:15',
            quote: '“Proclaim the good news to the whole creation...”',
            desc: 'Empowering digital builders, journalists, and media creators to broadcast the values of the Kingdom across the globe.'
        },
        { 
            name: 'Arts & Culture', 
            icon: <Palette size={20} />,
            verse: 'Exodus 31:3',
            quote: '“Filled with the Spirit of God in all kinds of craftsmanship...”',
            desc: 'Unleashing anointed filmmakers, designers, musicians, and artists who reclaim cultural narratives and inspire excellence.'
        },
        { 
            name: 'Education & Academia', 
            icon: <GraduationCap size={20} />,
            verse: 'Proverbs 9:10',
            quote: '“The fear of the Lord is the beginning of wisdom...”',
            desc: 'Transforming university campuses by raising scholars, researchers, and educators who integrate faith with intellectual innovation.'
        },
        { 
            name: 'Family & Identity', 
            icon: <HomeIcon size={20} />,
            verse: 'Joshua 24:15',
            quote: '“As for me and my household, we will serve the Lord...”',
            desc: 'Restoring healthy marriages, nurturing generational identity, and providing mentorship to heal societal foundations.'
        },
        { 
            name: 'Church & Ministry', 
            icon: <Church size={20} />,
            verse: 'Matthew 16:18',
            quote: '“On this rock I will build my church...”',
            desc: 'Nurturing consecrated, apostolic ministers who partner with churches to deploy believers into everyday society.'
        }
    ];

    const faqs = [
        {
            q: "What is Youth Spark Nexus?",
            a: "Youth Spark Nexus is a transformative pan-African kingdom movement dedicated to discipling nations through the Gospel of the Kingdom. We equip young leaders with spiritual depth, unshakeable character, and practical, monetizable skills to transform all 7 mountains of societal influence."
        },
        {
            q: "How can I attend the Youth Spark Summit?",
            a: "Our annual Youth Spark Summit convenes over 1,500 young leaders in Nairobi. Registration is open to university students, graduates, professionals, and creatives. You can register via our official registration form or join our WhatsApp community for instant announcements."
        },
        {
            q: "What happens at the monthly Nexus sessions?",
            a: "Youth Spark Nexus meets monthly in Nairobi CBD. Each session features deep sound apostolic teaching, high-octane prophetic worship, interactive peer mastermind groups, and leadership mentorship. Sessions are free and open to emerging leaders."
        },
        {
            q: "How can my university, company, or church partner with Youth Spark?",
            a: "We actively collaborate with universities for campus tours, corporations for sponsorship and youth talent pipelines, and churches for joint discipleship initiatives. Visit our 'Partner With Us' page or submit an inquiry directly through our secretariat."
        }
    ];

    return (
        <main className="overflow-hidden bg-brand-dark">
            {/* Parallax Hero Landing */}
            <Parallax bgImage="/about-skyline.png" strength={200} blur={{ min: -4, max: 4 }}>
                <section id="hero" className="min-h-screen flex items-center justify-center relative bg-black/65 pt-20">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark" />
                    
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="text-center z-10 px-4 w-full max-w-5xl mx-auto py-24"
                    >
                        {/* Live Announcement Badge */}
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-brand-gold/30 mb-8 shadow-[0_0_20px_rgba(252,209,42,0.2)]">
                            <span className="flex h-2 w-2 rounded-full bg-brand-gold animate-pulse"></span>
                            <span className="text-xs font-heading font-semibold text-white uppercase tracking-widest">
                                Discipling Nations Across Africa
                            </span>
                        </motion.div>

                        <motion.h1 variants={fadeUp} className="font-heading font-black text-white mb-6 uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05]">
                            Ignite Your <br/> 
                            <span className="text-gold-gradient drop-shadow-[0_0_30px_rgba(252,209,42,0.4)]">
                                Kingdom Spark
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-gray-300 mb-10 max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl leading-relaxed font-light">
                            Equipping Africa's next generation of values-driven leaders to dominate marketplace mountains, lead with integrity, and disciple nations.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none mx-auto">
                            <a 
                                href={GOOGLE_FORM_URL} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn-primary w-full sm:w-auto"
                            >
                                Register For Next Gathering &rarr;
                            </a>
                            <a 
                                href="https://chat.whatsapp.com/IVLWWZyO2GT6ONfjCgOw7K?mode=gi_t" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn-secondary w-full sm:w-auto group gap-2"
                            >
                                <MessageCircle size={18} /> Join WhatsApp Movement
                            </a>
                        </motion.div>
                    </motion.div>
                </section>
            </Parallax>

            {/* Impact Counters Hook */}
            <section id="impact" className="py-20 bg-brand-darker relative z-10 border-b border-white/5">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800f_1px,transparent_1px),linear-gradient(to_bottom,#8080800f_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass-card p-10">
                            <div className="mx-auto w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-6 text-brand-gold">
                                <Users size={28} />
                            </div>
                            <h3 className="text-5xl sm:text-6xl font-bold text-white mb-2 font-heading">
                                <CountUp end={5000} duration={3} suffix="+" enableScrollSpy scrollSpyDelay={200} />
                            </h3>
                            <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold">Youth Empowered & Commissioned</p>
                        </motion.div>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.15 }} className="glass-card p-10">
                            <div className="mx-auto w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-6 text-brand-gold">
                                <Shield size={28} />
                            </div>
                            <h3 className="text-5xl sm:text-6xl font-bold text-white mb-2 font-heading">
                                <CountUp end={7} duration={2} enableScrollSpy scrollSpyDelay={200} />
                            </h3>
                            <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold">Societal Mountains Discipled</p>
                        </motion.div>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.3 }} className="glass-card p-10">
                            <div className="mx-auto w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-6 text-brand-gold">
                                <Globe size={28} />
                            </div>
                            <h3 className="text-5xl sm:text-6xl font-bold text-white mb-2 font-heading">
                                <CountUp end={20} duration={3} suffix="+" enableScrollSpy scrollSpyDelay={200} />
                            </h3>
                            <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold">Universities Reached Across Africa</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Teaser */}
            <section id="about" className="py-24 bg-brand-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group glass-card p-3">
                            <div className="relative rounded-2xl overflow-hidden w-full h-full">
                                <img src="/WHO WE ARE.jpg" alt="Who We Are - Youth Spark Nexus" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-80"></div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <span className="badge-gold mb-3">
                            <Zap size={14} /> Our Identity & Mandate
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
                            Who We Are
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                            Youth Spark Nexus is not just another youth conference—it is a continental transformation mandate. We are passionately committed to <strong className="text-white font-semibold">discipling nations through the Gospel of the Kingdom</strong>.
                        </p>
                        <p className="text-gray-400 text-base leading-relaxed mb-8">
                            By combining sound biblical doctrine, intense prayer altars, executive mentorship, and hands-on skill development, we prepare emerging African pioneers to lead every sector with uncompromised ethics.
                        </p>
                        <Link
                            to="/about"
                            className="inline-flex items-center text-white font-bold hover:text-brand-gold transition-colors group text-base border-b-2 border-brand-gold pb-1"
                        >
                            Read Our Story & Leadership <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Flagship Programs Grid with Segmented Tab Bar */}
            <section id="programs" className="py-24 bg-brand-darker relative border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="badge-gold mb-3">Structured Pathways</span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
                            Our Core <span className="text-gold-gradient">Programs</span>
                        </h2>
                        <p className="text-gray-400 text-lg font-light">
                            Continuous development conduits designed to take young leaders from foundation to continental deployment.
                        </p>
                    </div>

                    {/* Well-arranged Programs Segmented Tab Bar */}
                    <div className="flex justify-center mb-12 overflow-x-auto pb-2 px-2">
                        <div className="inline-flex items-center gap-1.5 p-1.5 bg-brand-card/90 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
                            <button
                                onClick={() => setProgramTab('all')}
                                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
                                    programTab === 'all' 
                                        ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(252,209,42,0.4)]' 
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                All Initiatives
                            </button>
                            <button
                                onClick={() => setProgramTab('annual')}
                                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
                                    programTab === 'annual' 
                                        ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(252,209,42,0.4)]' 
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Annual Summit
                            </button>
                            <button
                                onClick={() => setProgramTab('monthly')}
                                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
                                    programTab === 'monthly' 
                                        ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(252,209,42,0.4)]' 
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Monthly Hub
                            </button>
                            <button
                                onClick={() => setProgramTab('forum')}
                                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
                                    programTab === 'forum' 
                                        ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(252,209,42,0.4)]' 
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Ventures Forum
                            </button>
                            <button
                                onClick={() => setProgramTab('accelerator')}
                                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
                                    programTab === 'accelerator' 
                                        ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(252,209,42,0.4)]' 
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Cohort Accelerator
                            </button>
                        </div>
                    </div>

                    {/* Programs Cards */}
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AnimatePresence>
                            {filteredPrograms.map((item) => (
                                <motion.div 
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25 }}
                                    key={item.id} 
                                    className="glass-card overflow-hidden group flex flex-col justify-between"
                                >
                                    <div className="h-60 sm:h-64 overflow-hidden relative">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/20 to-transparent"></div>
                                        <div className="absolute top-4 left-4">
                                            <span className="badge-gold bg-black/60 backdrop-blur-md border-white/20 text-white text-[11px]">
                                                {item.badge}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col justify-between flex-grow">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">{item.desc}</p>
                                        </div>
                                        <Link to={item.link} className="inline-flex items-center text-brand-gold hover:text-white font-bold text-xs uppercase tracking-wider transition-colors pt-4 border-t border-white/10 group/link">
                                            View Program Details <ArrowRight size={14} className="ml-2 group-hover/link:translate-x-1.5 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* 7 Mountains Interactive Tab Bar on Landing Page */}
            <section className="py-24 bg-brand-dark relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="badge-gold mb-3">Dominion Strategy</span>
                    <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4">
                        Discipling the 7 Mountains of Culture
                    </h2>
                    <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10">
                        Explore our specific transformation mandates across the seven governing spheres of society.
                    </p>

                    {/* Well-arranged Mountains Tab Bar */}
                    <div className="flex justify-center mb-8 overflow-x-auto pb-2 px-2">
                        <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 bg-brand-card/90 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl max-w-5xl">
                            {mountains.map((m, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveMountain(i)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all duration-200 ${
                                        activeMountain === i
                                            ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(252,209,42,0.4)]'
                                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <span className={activeMountain === i ? 'text-black' : 'text-brand-gold'}>{m.icon}</span>
                                    <span>{m.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Active Mountain Display */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeMountain}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="glass-card max-w-4xl mx-auto p-8 sm:p-10 text-left relative overflow-hidden mb-8"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-[80px] pointer-events-none"></div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center">
                                        {mountains[activeMountain].icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{mountains[activeMountain].name}</h3>
                                        <span className="text-xs text-brand-gold font-mono uppercase tracking-wider">{mountains[activeMountain].verse}</span>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400 italic">"{mountains[activeMountain].quote}"</span>
                            </div>

                            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light mb-6">
                                {mountains[activeMountain].desc}
                            </p>

                            <Link to="/pillars" className="inline-flex items-center text-brand-gold hover:text-white text-xs font-bold uppercase tracking-wider">
                                Learn more about our 7 Mountains curriculum &rarr;
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Patrons & Leadership Feature */}
            <section className="py-20 bg-brand-darker border-t border-white/5 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 rounded-2xl overflow-hidden glass-card p-3">
                            <div className="rounded-xl overflow-hidden aspect-[4/3]">
                                <img src="/Founders with PLO.jpg" alt="Youth Spark Founders with Prof. P.L.O. Lumumba" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="lg:col-span-7 flex flex-col items-start">
                            <span className="badge-gold mb-3">Wisdom & Statesmanship</span>
                            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase tracking-tight">
                                Mentorship from African Statesmen & Leaders
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                                Youth Spark Nexus bridges youthful vitality with intergenerational wisdom. Engaging renowned thought leaders like <strong className="text-white font-semibold">Prof. P.L.O. Lumumba</strong>, our cohorts receive strategic guidance to build institutions that endure.
                            </p>
                            <Link to="/about" className="btn-secondary text-xs py-3 px-6">
                                Meet Founders & Leadership
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive FAQ Section */}
            <section className="py-24 bg-brand-dark relative border-t border-white/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="badge-gold mb-3">Got Questions?</span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4">
                            Frequently Asked <span className="text-gold-gradient">Questions</span>
                        </h2>
                        <p className="text-gray-400 text-base">Everything you need to know about joining and partnering with the movement.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="glass-card overflow-hidden">
                                <button 
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-white hover:text-brand-gold transition-colors"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown size={20} className={`shrink-0 text-brand-gold transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="px-6 pb-6 text-gray-400 text-sm sm:text-base leading-relaxed border-t border-white/5 pt-4"
                                        >
                                            {faq.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="join-us" className="py-24 bg-gradient-to-br from-brand-gold via-yellow-400 to-amber-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/about-skyline.png')] bg-cover bg-center mix-blend-overlay opacity-15"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-dark mb-6 uppercase tracking-tight font-heading">
                            Ready to Spark Change?
                        </h2>
                        <p className="text-brand-dark/90 font-medium text-lg sm:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of emerging leaders across Africa shaping the future of leadership and bringing light to every sector.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a 
                                href={GOOGLE_FORM_URL} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center justify-center px-10 py-4 bg-brand-dark text-white font-heading font-bold rounded-xl shadow-2xl hover:bg-black hover:scale-105 transition-all duration-300 text-sm uppercase tracking-wider"
                            >
                                Register Now on Google Form &rarr;
                            </a>
                            <a 
                                href="https://chat.whatsapp.com/IVLWWZyO2GT6ONfjCgOw7K?mode=gi_t" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center justify-center px-8 py-4 bg-black/10 border-2 border-brand-dark text-brand-dark font-heading font-bold rounded-xl hover:bg-brand-dark hover:text-white transition-all duration-300 text-sm uppercase tracking-wider gap-2"
                            >
                                <MessageCircle size={18} /> Join WhatsApp
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default Home;
