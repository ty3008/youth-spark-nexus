import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

const Engagements = () => {
    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };
    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

    const engagements = [
        {
            title: "Youth Spark Summit",
            cadence: "Annual Flagship Gathering",
            attendees: "1,500+ Leaders",
            desc: "Our continental convergence bringing together youth leaders, university students, and professionals for high-impact worship, apostolic word, career breakouts, and sovereign commissioning.",
            image: "/YSS 2025.jpg",
            link: "/programs/youth-spark-summit"
        },
        {
            title: "Youth Spark Nexus (Monthly)",
            cadence: "Monthly in Nairobi CBD",
            attendees: "100+ Core Leaders",
            desc: "Intensive monthly discipleship, prayer altars, and leadership masterclasses held in Nairobi CBD. Designed to sharpen character and forge deep lifelong community.",
            image: "/Nexus 3.jpg",
            link: "/programs/youth-spark-nexus"
        },
        {
            title: "NXT Africa Forum",
            cadence: "Quarterly Executive Sessions",
            attendees: "Captains of Industry & Fellows",
            desc: "An intimate convening uniting high-level voices from business, technology, finance, and statesmanship to deliver real-world strategies for scalable African ventures.",
            image: "/NXT 1.webp",
            link: "/programs/nxt-africa-forum"
        },
        {
            title: "Reconstructive Leadership Cohorts",
            cadence: "3-Month Intensive Cohorts",
            attendees: "Selected Applicants",
            desc: "A hands-on accelerator equipping young people with monetizable digital skills, market execution, and biblical stewardship to generate ethical income and lead with distinction.",
            image: "/Hangout 2.jpg",
            link: "/programs/reconstructive-leadership"
        }
    ];

    return (
        <section id="engagements" className="py-20 bg-brand-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={stagger}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <motion.span variants={fadeUp} className="badge-gold mb-3">Our Operations & Caliber</motion.span>
                    <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-6">
                        Flagship & <span className="text-gold-gradient">Ongoing Engagements</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-gray-400 text-base sm:text-lg">
                        We maintain active, multi-tiered touchpoints across universities, cities, and continental forums to ensure continuous transformation.
                    </motion.p>
                </motion.div>

                {/* Engagements Grid */}
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={stagger}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {engagements.map((item, idx) => (
                        <motion.div 
                            key={idx} 
                            variants={fadeUp}
                            className="glass-card overflow-hidden group flex flex-col justify-between"
                        >
                            <div className="h-64 sm:h-72 w-full overflow-hidden relative">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/20 to-transparent"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="badge-gold bg-black/60 backdrop-blur-md border-white/20 text-white text-[11px]">
                                        {item.cadence}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 sm:p-10 flex flex-col justify-between flex-grow">
                                <div>
                                    <div className="flex items-center gap-2 text-xs text-brand-gold font-mono uppercase tracking-wider mb-2">
                                        <Users size={14} />
                                        <span>{item.attendees}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 font-light">
                                        {item.desc}
                                    </p>
                                </div>

                                <Link 
                                    to={item.link} 
                                    className="inline-flex items-center text-brand-gold hover:text-white font-bold text-xs uppercase tracking-wider transition-colors pt-4 border-t border-white/10 group/link"
                                >
                                    Explore Program Details <ArrowRight size={14} className="ml-2 group-hover/link:translate-x-1.5 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Engagements;
