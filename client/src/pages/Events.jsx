import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, MapPin, ChevronRight, X, ExternalLink } from 'lucide-react';
import { apiUrl } from '../lib/api';

const GOOGLE_FORM_URL = 'https://forms.gle/g62AnhQpsnD3YGvG6';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [regForm, setRegForm] = useState({ name: '', email: '', eventId: '' });
    const [regStatus, setRegStatus] = useState({ type: '', msg: '' });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(apiUrl('/events'));
                setEvents(response.data.map(ev => ({
                    id: ev._id,
                    title: ev.title,
                    date: ev.date,
                    extendedProps: {
                        description: ev.description,
                        location: ev.location,
                    }
                })));
            } catch (error) {
                console.error('Failed to fetch events', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = ({ event }) => {
        setSelectedEvent({
            title: event.title,
            date: event.startStr,
            description: event.extendedProps.description,
            location: event.extendedProps.location,
        });
        setRegForm(prev => ({ ...prev, eventId: event.id }));
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        if (!regForm.eventId || !regForm.name || !regForm.email) {
            setRegStatus({ type: 'error', msg: 'Please fill all fields and select an event.' });
            return;
        }

        const url = new URL(GOOGLE_FORM_URL);
        window.open(url.toString(), '_blank', 'noopener,noreferrer');

        setRegStatus({
            type: 'success',
            msg: 'Redirecting to a secure Google Form to complete registration.',
        });
        setRegForm({ name: '', email: '', eventId: '' });
    };

    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

    return (
        <main className="min-h-screen pt-24 pb-20 bg-brand-dark">
            <Helmet>
                <title>Upcoming Events | Youth Spark Nexus</title>
                <meta name="description" content="Stay up to date with all Youth Spark gatherings, sessions, and summits." />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <RouterLink to="/" className="hover:text-brand-gold transition-colors">Home</RouterLink>
                    <ChevronRight size={14} />
                    <span className="text-brand-gold">Events</span>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 uppercase tracking-tight">
                        Upcoming <span className="text-brand-gold">Events</span>
                    </h1>
                    <p className="text-gray-400 text-lg mb-12 max-w-2xl">
                        Join our community in person or online. Discover summits, forums, and masterclasses designed to equip you for impact.
                    </p>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Calendar */}
                            <div className="lg:col-span-2 glass-card p-4 sm:p-6 overflow-hidden events-calendar-container">
                                <FullCalendar
                                    plugins={[dayGridPlugin]}
                                    initialView="dayGridMonth"
                                    events={events}
                                    eventClick={handleEventClick}
                                    headerToolbar={{ left: 'prev,next', center: 'title', right: 'today' }}
                                    eventColor="#FCD12A"
                                    eventTextColor="#0A0A0A"
                                    height="auto"
                                    contentHeight="auto"
                                />
                            </div>

                            {/* Sidebar */}
                            <div className="flex flex-col gap-6">
                                {/* Selected Event Detail */}
                                {selectedEvent ? (
                                    <div className="glass-card p-6 border-brand-gold/30 shadow-[0_0_20px_rgba(252,209,42,0.1)] relative">
                                        <button 
                                            onClick={() => setSelectedEvent(null)}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                        <h3 className="text-xl font-bold text-brand-gold mb-4 pr-6">{selectedEvent.title}</h3>
                                        <div className="flex flex-col gap-3 text-sm">
                                            <div className="flex items-start gap-3 text-gray-300">
                                                <CalendarIcon size={16} className="mt-0.5 text-brand-gold shrink-0" />
                                                <span>{selectedEvent.date}</span>
                                            </div>
                                            {selectedEvent.location && (
                                                <div className="flex items-start gap-3 text-gray-300">
                                                    <MapPin size={16} className="mt-0.5 text-brand-gold shrink-0" />
                                                    <span>{selectedEvent.location}</span>
                                                </div>
                                            )}
                                        </div>
                                        {selectedEvent.description && (
                                            <div className="mt-6 pt-4 border-t border-white/10 text-gray-400 text-sm leading-relaxed">
                                                {selectedEvent.description}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="glass-card p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
                                        <div className="w-12 h-12 rounded-full bg-brand-card flex items-center justify-center mb-4">
                                            <CalendarIcon className="text-gray-500" size={24} />
                                        </div>
                                        <p className="text-gray-400">Select an event from the calendar to view details</p>
                                    </div>
                                )}

                                {/* Events List */}
                                <div className="glass-card p-6 flex-grow">
                                    <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">All Events</h3>
                                    {events.length === 0 ? (
                                        <p className="text-gray-500 text-sm">No upcoming events.</p>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            {events.map(ev => (
                                                <div 
                                                    key={ev.id} 
                                                    onClick={() => {
                                                        setSelectedEvent({ title: ev.title, date: ev.date, description: ev.extendedProps.description, location: ev.extendedProps.location });
                                                        setRegForm(prev => ({ ...prev, eventId: ev.id }));
                                                    }}
                                                    className="p-4 rounded-xl bg-brand-card hover:bg-brand-gold/10 border border-white/5 hover:border-brand-gold/30 cursor-pointer transition-all duration-300 group"
                                                >
                                                    <h4 className="font-bold text-white group-hover:text-brand-gold transition-colors text-sm mb-1">{ev.title}</h4>
                                                    <p className="text-brand-gold text-xs flex items-center gap-1">
                                                        {ev.date} {ev.extendedProps.location && <span className="text-gray-500 ml-1">· {ev.extendedProps.location}</span>}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Registration Form */}
                    <div className="mt-20">
                        <div className="glass-card max-w-3xl mx-auto p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-[80px] pointer-events-none"></div>
                            
                            <div className="text-center mb-8 relative z-10">
                                <h2 className="text-3xl font-bold text-white uppercase tracking-tight mb-2">Register Now</h2>
                                <p className="text-gray-400">Secure your spot for an upcoming session.</p>
                            </div>

                            {regStatus.msg && (
                                <div className={`mb-6 p-4 rounded-lg text-sm text-center font-medium ${regStatus.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    {regStatus.msg}
                                </div>
                            )}
                            
                            <form onSubmit={handleRegistration} className="space-y-5 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-4 bg-brand-dark/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                                            value={regForm.name}
                                            onChange={e => setRegForm({ ...regForm, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full p-4 bg-brand-dark/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                                            value={regForm.email}
                                            onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Select Event</label>
                                    <select
                                        className="w-full p-4 bg-brand-dark/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all appearance-none"
                                        value={regForm.eventId}
                                        onChange={e => setRegForm({ ...regForm, eventId: e.target.value })}
                                        required
                                        style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                                    >
                                        <option value="" className="bg-brand-dark text-gray-400">Choose an event...</option>
                                        {events.map(ev => <option key={ev.id} value={ev.id} className="bg-brand-dark">{ev.title}</option>)}
                                    </select>
                                </div>
                                <button type="submit" className="w-full btn-primary py-4 text-base gap-2 mt-4">
                                    Proceed to Google Form <ExternalLink size={18} />
                                </button>
                            </form>
                            <p className="text-xs text-gray-500 mt-6 text-center relative z-10">By registering, you agree to receive communications regarding this event.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <style>{`
                .events-calendar-container .fc {
                    font-family: var(--font-body);
                }
                .events-calendar-container .fc-theme-standard th {
                    border-color: rgba(255,255,255,0.05);
                    padding: 12px 0;
                    color: #9ca3af;
                    font-weight: 600;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                }
                .events-calendar-container .fc-theme-standard td {
                    border-color: rgba(255,255,255,0.05);
                }
                .events-calendar-container .fc-daygrid-day-number {
                    color: #fff;
                    padding: 8px;
                }
                .events-calendar-container .fc-col-header-cell {
                    background: rgba(0,0,0,0.2);
                }
                .events-calendar-container .fc-toolbar-title {
                    color: #fff;
                    font-family: var(--font-heading);
                    font-weight: 700;
                    text-transform: uppercase;
                    font-size: 1.25rem;
                }
                .events-calendar-container .fc-button-primary {
                    background-color: var(--brand-card) !important;
                    border-color: rgba(255,255,255,0.1) !important;
                    color: #fff !important;
                    text-transform: capitalize;
                }
                .events-calendar-container .fc-button-primary:hover {
                    background-color: rgba(252,209,42,0.1) !important;
                    border-color: var(--brand-gold) !important;
                    color: var(--brand-gold) !important;
                }
                .events-calendar-container .fc-day-today {
                    background: rgba(252,209,42,0.05) !important;
                }
            `}</style>
        </main>
    );
};

export default Events;
