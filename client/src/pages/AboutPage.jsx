import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import About from '../components/About';
import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <div className="page-top-spacing">
            <Helmet>
                <title>About Us | Youth Spark Nexus</title>
                <meta name="description" content="Learn more about Youth Spark Nexus, our vision to disciple nations and our mission to empower young leaders." />
            </Helmet>

            <About />

            {/* Additional Content for Depth */}
            <section className="section-padding bg-[#0A0A0A]">
                <div className="max-w-screen-xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                    >
                        <div className="p-8 border border-white/10 rounded-xl">
                            <h3 className="text-[#FCD12A] text-xl mb-4">Our History</h3>
                            <p className="text-sm">Growing from a local movement in Kenya to an African-wide network of value-driven leaders.</p>
                        </div>
                        <div className="p-8 border border-white/10 rounded-xl">
                            <h3 className="text-[#FCD12A] text-xl mb-4">Our Values</h3>
                            <p className="text-sm">Integrity, Excellence, and Kingdom-centered leadership in all 7 mountains of influence.</p>
                        </div>
                        <div className="p-8 border border-white/10 rounded-xl">
                            <h3 className="text-[#FCD12A] text-xl mb-4">Our Future</h3>
                            <p className="text-sm">Transforming industries and shaping cultures across the continent by 2030.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Call to Approach Section */}
            <section className="section-padding bg-[#0A0A0A] border-t border-white/5">
                <div className="max-w-screen-xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Discover Our Approach</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Built on four foundational pillars: Faith, Leadership, Influence, and Community. Learn how we structure our transformation programs.
                    </p>
                    <RouterLink to="/pillars" className="px-8 py-3 bg-[#FCD12A] text-[#0A0A0A] font-bold rounded-lg hover:bg-[#ebc127] transition-all inline-block">
                        Explore Our Pillars →
                    </RouterLink>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
