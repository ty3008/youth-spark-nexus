import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import Engagements from '../components/Engagements';

const EngagementsPage = () => {
    return (
        <div className="pt-20">
            <Helmet>
                <title>Engagements | Youth Spark Nexus</title>
                <meta name="description" content="How we engage with youth, communities, and industries to create lasting change." />
            </Helmet>
            
            {/* Breadcrumb Navigation */}
            <div className="max-w-screen-xl mx-auto px-4 py-4">
                <nav className="flex items-center gap-2 text-sm text-gray-400">
                    <RouterLink to="/" className="hover:text-[#FCD12A] transition-colors">Home</RouterLink>
                    <span>/</span>
                    <RouterLink to="/programs" className="hover:text-[#FCD12A] transition-colors">Programs</RouterLink>
                    <span>/</span>
                    <span className="text-[#FCD12A]">Engagements</span>
                </nav>
            </div>

            <Engagements />
        </div>
    );
};

export default EngagementsPage;
