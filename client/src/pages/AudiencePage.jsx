import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import Audience from '../components/Audience';

const AudiencePage = () => {
    return (
        <div className="pt-20">
            <Helmet>
                <title>Who We Serve | Youth Spark Nexus</title>
                <meta name="description" content="Our reach across Africa and the diverse groups of youth leaders we empower." />
            </Helmet>
            
            {/* Breadcrumb Navigation */}
            <div className="max-w-screen-xl mx-auto px-4 py-4">
                <nav className="flex items-center gap-2 text-sm text-gray-400">
                    <RouterLink to="/" className="hover:text-[#FCD12A] transition-colors">Home</RouterLink>
                    <span>/</span>
                    <span className="text-[#FCD12A]">Our Community</span>
                </nav>
            </div>

            <Audience />
        </div>
    );
};

export default AudiencePage;
