import { motion } from 'framer-motion';

const Pillars = () => {
    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

    const pillarsData = [
        { title: 'Faith', description: 'Deep spiritual growth & clear identity anchored in Christ.' },
        { title: 'Leadership', description: 'Developing bold, ethical, and visionary leaders for tomorrow.' },
        { title: 'Influence', description: 'Empowering youth to shape industries and disciple nations.' },
        { title: 'Community', description: 'Cultivating spaces for genuine connection, support, and growth.' },
    ];

    return (
        <section id="pillars" className="py-24 bg-brand-dark">
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
            >
                {/* Left: Pillars Cards */}
                <div className="flex flex-col justify-center">
                    <motion.span variants={fadeUp} className="text-brand-gold uppercase tracking-[0.3em] text-sm font-bold mb-4 block">Foundation</motion.span>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-10 uppercase tracking-tight">Our Pillars for Youth Leadership</motion.h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {pillarsData.map((pillar, index) => (
                            <motion.div key={index} variants={fadeUp} className="glass-card p-6 border-l-4 border-transparent hover:border-brand-gold">
                                <h3 className="text-xl text-white font-bold mb-3 uppercase tracking-wider">{pillar.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{pillar.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Stacked Images */}
                <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 h-full min-h-[500px]">
                    <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-2xl relative group">
                        <div className="absolute inset-0 bg-brand-gold/10 group-hover:bg-transparent transition-colors z-10 duration-700"></div>
                        <img src="/pillar.jpg" alt="Pillar 1" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-2xl relative group">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-700"></div>
                        <img src="/pillar 2.jpg" alt="Pillar 2" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-2xl relative group">
                        <div className="absolute inset-0 bg-brand-dark/30 group-hover:bg-transparent transition-colors z-10 duration-700"></div>
                        <img src="/YSS 2025.jpg" alt="YSS 2025" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Pillars;
