import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import Programs from '../components/Programs';

const ProgramsPage = () => {
    return (
        <div className="page-top-spacing">
            <Helmet>
                <title>Programs | Youth Spark Nexus</title>
                <meta name="description" content="Our structured programs for leadership development, skill acquisition, and kingdom-centered training." />
            </Helmet>
            
            {/* Breadcrumb Navigation */}
            <div className="max-w-screen-xl mx-auto px-4 pt-1 pb-2 sm:pt-2 sm:pb-3">
                <nav className="flex items-center gap-2 text-sm text-gray-400">
                    <RouterLink to="/" className="hover:text-[#FCD12A] transition-colors">Home</RouterLink>
                    <span>/</span>
                    <span className="text-[#FCD12A]">Programs</span>
                </nav>
            </div>

            <Programs />

            <section className="section-padding bg-[#0A0A0A] border-t border-white/5">
                <div className="max-w-screen-xl mx-auto">
                    <h2 className="text-3xl text-center text-[#FCD12A] mb-12">Program Roadmap</h2>
                    <div className="space-y-8">
                        <div className="flex gap-6 items-center">
                            <div className="w-12 h-12 rounded-full bg-[#FCD12A] text-black flex items-center justify-center font-bold flex-shrink-0">1</div>
                            <div>
                                <h3 className="text-white text-xl">Foundational Training</h3>
                                <p className="text-sm text-[#808080]">Core modules on identity, kingdom principles, and spiritual growth.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-center">
                            <div className="w-12 h-12 rounded-full bg-[#1F1F1F] text-[#FCD12A] border border-[#FCD12A] flex items-center justify-center font-bold flex-shrink-0">2</div>
                            <div>
                                <h3 className="text-white text-xl">Advanced Leadership</h3>
                                <p className="text-sm text-[#808080]">Strategic thinking, management, and influence across the 7 mountains.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProgramsPage;
