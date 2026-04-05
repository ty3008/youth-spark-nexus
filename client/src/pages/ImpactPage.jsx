import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import Impact from '../components/Impact';

const ImpactPage = () => {
    return (
        <div className="page-top-spacing">
            <Helmet>
                <title>Our Impact | Youth Spark Nexus</title>
                <meta name="description" content="See the real-world impact of Youth Spark Nexus in transforming lives and shaping culture." />
            </Helmet>
            
            {/* Breadcrumb Navigation */}
            <div className="max-w-screen-xl mx-auto px-4 pt-1 pb-2 sm:pt-2 sm:pb-3">
                <nav className="flex items-center gap-2 text-sm text-gray-400">
                    <RouterLink to="/" className="hover:text-[#FCD12A] transition-colors">Home</RouterLink>
                    <span>/</span>
                    <span className="text-[#FCD12A]">Impact</span>
                </nav>
            </div>

            <Impact />

            <section className="section-padding bg-[#0A0A0A]">
                <div className="max-w-screen-xl mx-auto text-center">
                    <h2 className="text-3xl text-[#FCD12A] mb-12">Success Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Placeholders for depth */}
                        <div className="p-6 bg-[#111] rounded-xl border border-white/5">
                            <p className="italic mb-4">"Youth Spark didn't just teach me leadership; they gave me a vision for my nation."</p>
                            <p className="text-[#FCD12A] font-bold">- Alumni, Kenya</p>
                        </div>
                        <div className="p-6 bg-[#111] rounded-xl border border-white/5">
                            <p className="italic mb-4">"The 7 mountains framework changed how I approach my business in tech."</p>
                            <p className="text-[#FCD12A] font-bold">- Tech Entrepreneur</p>
                        </div>
                        <div className="p-6 bg-[#111] rounded-xl border border-white/5">
                            <p className="italic mb-4">"A movement that is truly building the next generation of African leaders."</p>
                            <p className="text-[#FCD12A] font-bold">- Community Leader</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ImpactPage;
