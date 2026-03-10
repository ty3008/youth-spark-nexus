import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import Partnerships from '../components/Partnerships';

const PartnershipsPage = () => {
    return (
        <div className="pt-20">
            <Helmet>
                <title>Partnerships | Youth Spark Nexus</title>
                <meta name="description" content="Collaborating with organizations and leaders to scale impact across the continent." />
            </Helmet>
            
            {/* Breadcrumb Navigation */}
            <div className="max-w-screen-xl mx-auto px-4 py-4">
                <nav className="flex items-center gap-2 text-sm text-gray-400">
                    <RouterLink to="/" className="hover:text-[#FCD12A] transition-colors">Home</RouterLink>
                    <span>/</span>
                    <span className="text-[#FCD12A]">Partner With Us</span>
                </nav>
            </div>

            <Partnerships />
        </div>
    );
};

export default PartnershipsPage;
