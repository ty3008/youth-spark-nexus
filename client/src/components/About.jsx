import { motion } from 'framer-motion';

const About = () => {
    const variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

    return (
        <section id="about" className="section-padding bg-[#0A0A0A]">
            <motion.div
                className="max-w-screen-xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
            >
                {/* Full-width image like in the slide */}
                <img
                    src="/about-skyline.png"
                    alt="Group of youth raising hands over city skyline"
                    loading="lazy"
                    className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg mb-8"
                />

                {/* Main Heading */}
                <h2 className="text-[#FCD12A] font-poppins text-3xl md:text-4xl mb-8 uppercase text-center md:text-left">Who We Are & Our Vision</h2>

                {/* Two-column layout for text, matching the slide */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Column: Who We Are */}
                    <div className="w-full md:w-1/2">
                        <h3 className="text-xl md:text-2xl text-[#FCD12A] mb-4">About Youth Spark</h3>
                        <p className="mb-4">A transformative movement growing value-driven leaders across Kenya and Africa.</p>
                        <p>Focus on all 7 mountains of influence, culture, and ministry.</p>
                    </div>

                    {/* Right Column: Vision and Mission */}
                    <div className="w-full md:w-1/2">
                        <h3 className="text-xl md:text-2xl text-[#FCD12A] mb-4">Vision</h3>
                        <p className="mb-6">Discipling Nations through the Gospel of the Kingdom.</p>

                        <h3 className="text-xl md:text-2xl text-[#FCD12A] mb-4">Mission</h3>
                        <p>To disciple and equip young leaders through Kingdom-centered leadership training, practical skills development, and industry-focused mentorship — empowering them to transform industries, shape culture, influence societies, and advance nation-building with excellence.</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
