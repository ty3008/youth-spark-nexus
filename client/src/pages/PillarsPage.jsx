import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import Pillars from '../components/Pillars';

const PillarsPage = () => {
    return (
        <div className="page-top-spacing">
            <Helmet>
                <title>Our Pillars | Youth Spark Nexus</title>
                <meta name="description" content="Explore the four pillars of Youth Spark Nexus: Faith, Leadership, Influence, and Community." />
            </Helmet>
            
            {/* Breadcrumb Navigation */}
            <div className="max-w-screen-xl mx-auto px-4 pt-1 pb-2 sm:pt-2 sm:pb-3">
                <nav className="flex items-center gap-2 text-sm text-gray-400">
                    <RouterLink to="/" className="hover:text-[#FCD12A] transition-colors">Home</RouterLink>
                    <span>/</span>
                    <RouterLink to="/about" className="hover:text-[#FCD12A] transition-colors">About</RouterLink>
                    <span>/</span>
                    <span className="text-[#FCD12A]">Our Pillars</span>
                </nav>
            </div>

            <Pillars />

            {/* Deep dive content */}
            <section className="section-padding bg-[#0A0A0A] border-t border-white/5">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl text-[#FCD12A] mb-6">Why These Pillars?</h2>
                            <p className="mb-4">We believe that true transformation starts from within. By focusing on Faith and Leadership, we build the foundation. Through Influence and Community, we create the impact.</p>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FCD12A]">✓</span>
                                    <span>Identity-focused growth to build unshakeable character.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#FCD12A]">✓</span>
                                    <span>Strategic skill-building for modern industry challenges.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-[#1F1F1F] p-8 rounded-2xl">
                            <h3 className="text-xl text-white mb-4">Our Methodology</h3>
                            <p className="text-sm text-[#808080]">Our training modules are designed by industry experts and kingdom leaders to ensure a balance of practical skill and spiritual depth.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PillarsPage;
