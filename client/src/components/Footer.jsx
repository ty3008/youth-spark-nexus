import { Link } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-brand-dark border-t border-white/5 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <img src="/logo.png" alt="Youth Spark Nexus" className="h-10 w-auto object-contain" />
                            <span className="font-heading text-xl font-bold tracking-tight text-white">
                                Youth Spark <span className="text-brand-gold">Nexus</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                            Igniting a movement of Kingdom-minded youth shaping Africa's future through faith, leadership, and influence.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="text-white font-heading font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
                        <nav className="flex flex-col gap-3">
                            <Link to="/about" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Our Story</Link>
                            <Link to="/programs" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Programs</Link>
                            <Link to="/events" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Upcoming Events</Link>
                            <Link to="/partnerships" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Partner With Us</Link>
                        </nav>
                    </div>

                    {/* Contact & Social */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="text-white font-heading font-semibold mb-6 uppercase tracking-wider text-sm">Connect</h4>
                        <p className="text-gray-400 text-sm mb-2">
                            <a href="mailto:youthsparksummit@gmail.com" className="hover:text-brand-gold transition-colors">youthsparksummit@gmail.com</a>
                        </p>
                        <p className="text-gray-400 text-sm mb-6">+254 711 425 593</p>
                        
                        <div className="flex items-center gap-4">
                            <a href="https://www.facebook.com/Youth-Spark-Summit" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full text-gray-400 hover:bg-brand-gold hover:text-black transition-all">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 21.881V14.89H7.898V12H10.438V9.797C10.438 7.274 11.943 5.883 14.226 5.883C15.323 5.883 16.471 6.078 16.471 6.078V8.547H15.207C13.963 8.547 13.562 9.32 13.562 10.111V12H16.344L15.9 14.89H13.562V21.881C18.343 21.128 22 16.991 22 12C22 6.477 17.523 2 12 2Z" /></svg>
                            </a>
                            <a href="https://www.instagram.com/youthsparksummitofficial" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full text-gray-400 hover:bg-brand-gold hover:text-black transition-all">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.108 17.912 2.278 18.55 2.525C19.21 2.782 19.765 3.123 20.323 3.681C20.88 4.239 21.22 4.793 21.477 5.453C21.723 6.09 21.892 6.816 21.94 7.88C21.989 8.946 22 9.284 22 12C22 14.717 21.99 15.055 21.94 16.12C21.892 17.185 21.723 17.91 21.477 18.548C21.218 19.208 20.878 19.763 20.321 20.321C19.763 20.88 19.208 21.22 18.55 21.477C17.913 21.723 17.187 21.892 16.122 21.94C15.056 21.989 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.892 6.088 21.723 5.45 21.477C4.79 21.218 4.235 20.878 3.677 20.321C3.12 19.763 2.78 19.208 2.523 18.55C2.277 17.913 2.108 17.187 2.06 16.122C2.011 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.108 6.813 2.277 6.088 2.523 5.45C2.782 4.79 3.123 4.235 3.681 3.677C4.239 3.12 4.793 2.78 5.453 2.523C6.09 2.277 6.816 2.108 7.88 2.06C8.946 2.011 9.284 2 12 2ZM12 7.166C9.33 7.166 7.166 9.33 7.166 12C7.166 14.67 9.33 16.834 12 16.834C14.67 16.834 16.834 14.67 16.834 12C16.834 9.33 14.67 7.166 12 7.166ZM12 15C10.343 15 9 13.657 9 12C9 10.343 10.343 9 12 9C13.657 9 15 10.343 15 12C15 13.657 13.657 15 12 15ZM16.505 6.088C15.897 6.088 15.405 6.58 15.405 7.188C15.405 7.795 15.897 8.287 16.505 8.287C17.112 8.287 17.604 7.795 17.604 7.188C17.604 6.58 17.112 6.088 16.505 6.088Z" /></svg>
                            </a>
                            <a href="https://www.youtube.com/@youthsparksummit" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full text-gray-400 hover:bg-brand-gold hover:text-black transition-all">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        &copy; {year} Youth Spark Nexus. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-xs text-center md:text-right">
                        Discipling Nations.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
