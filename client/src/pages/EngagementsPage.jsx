import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Engagements from '../components/Engagements';

const EngagementsPage = () => {
    return (
        <main className="bg-brand-dark min-h-screen pt-24 pb-20">
            <Helmet>
                <title>Engagements & Tours | Flagship Operations | Youth Spark Nexus</title>
                <meta name="description" content="Discover how Youth Spark Nexus engages youth, university campuses, and continental forums through summits, monthly CBD sessions, and executive venture forums." />
            </Helmet>
            
            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                    <RouterLink to="/" className="hover:text-brand-gold transition-colors">Home</RouterLink>
                    <ChevronRight size={14} />
                    <RouterLink to="/programs" className="hover:text-brand-gold transition-colors">Programs</RouterLink>
                    <ChevronRight size={14} />
                    <span className="text-brand-gold">Engagements</span>
                </nav>
            </div>

            <Engagements />
        </main>
    );
};

export default EngagementsPage;
