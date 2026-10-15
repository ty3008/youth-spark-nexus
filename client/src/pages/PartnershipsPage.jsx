import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Partnerships from '../components/Partnerships';

const PartnershipsPage = () => {
    return (
        <main className="bg-brand-dark min-h-screen pt-24 pb-20">
            <Helmet>
                <title>Partner With Us | Strategic Alliances & Sponsorship | Youth Spark Nexus</title>
                <meta name="description" content="Collaborate with Youth Spark Nexus to scale youth impact across Africa through academic, corporate, philanthropic, and ministry partnerships." />
            </Helmet>
            
            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                    <RouterLink to="/" className="hover:text-brand-gold transition-colors">Home</RouterLink>
                    <ChevronRight size={14} />
                    <span className="text-brand-gold">Partner With Us</span>
                </nav>
            </div>

            <Partnerships />
        </main>
    );
};

export default PartnershipsPage;
