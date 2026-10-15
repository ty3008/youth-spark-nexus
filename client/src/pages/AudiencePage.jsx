import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Audience from '../components/Audience';

const AudiencePage = () => {
    return (
        <main className="bg-brand-dark min-h-screen pt-24 pb-20">
            <Helmet>
                <title>Who We Serve | Community & Ecosystem | Youth Spark Nexus</title>
                <meta name="description" content="Our reach across Africa and the diverse groups of youth leaders we empower across universities, corporations, creative sectors, and governance." />
            </Helmet>
            
            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                    <RouterLink to="/" className="hover:text-brand-gold transition-colors">Home</RouterLink>
                    <ChevronRight size={14} />
                    <span className="text-brand-gold">Who We Serve</span>
                </nav>
            </div>

            <Audience />
        </main>
    );
};

export default AudiencePage;
