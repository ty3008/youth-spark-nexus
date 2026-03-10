import { motion } from 'framer-motion';


const Pillars = () => {
    const variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

    const pillarsData = [
        { title: 'Faith', description: 'Deep spiritual growth & clear identity' },
        { title: 'Leadership', description: 'Bold, ethical, visionary leaders' },
        { title: 'Influence', description: 'Youth shaping industries & nations' },
        { title: 'Community', description: 'Spaces for growth & connection' },
    ];

    return (
        <section id="pillars" className="section-padding bg-[#0A0A0A]">
            <motion.div
                className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
            >
                {/* Left: Pillars Cards */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-[#FCD12A] font-poppins text-3xl md:text-4xl mb-6 uppercase">Our Pillars for Youth Leadership</h2>
                    <div className="space-y-4">
                        {pillarsData.map((pillar, index) => (
                            <div key={index} className="bg-[#1F1F1F] p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-transparent hover:border-[#FCD12A]">
                                <h3 className="text-xl text-[#BFBFBF] font-semibold mb-2">{pillar.title}</h3>
                                <p className="text-[#808080]">{pillar.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Stacked Images */}
                <div className="w-full md:w-1/2 grid grid-rows-3 gap-4">
                    <img src="/pillar.jpg" alt="Pillar 1" className="w-full h-48 md:h-56 object-cover rounded-lg shadow-md hover:scale-[1.02] transition-transform" loading="lazy" />
                    <img src="/pillar 2.jpg" alt="Pillar 2" className="w-full h-48 md:h-56 object-cover rounded-lg shadow-md hover:scale-[1.02] transition-transform" loading="lazy" />
                    <img src="/YSS 2025.jpg" alt="YSS 2025" className="w-full h-48 md:h-56 object-cover rounded-lg shadow-md hover:scale-[1.02] transition-transform" loading="lazy" />
                </div>
            </motion.div>
        </section>
    );
};

export default Pillars;
