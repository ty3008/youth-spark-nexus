import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import { motion } from 'framer-motion';
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
                // FullCalendar expects { title, date } — map MongoDB _id to id
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

        // Open Google Form in a new tab and prefill what we can via query params
        const url = new URL(GOOGLE_FORM_URL);
        window.open(url.toString(), '_blank', 'noopener,noreferrer');

        setRegStatus({
            type: 'success',
            msg: 'You are being redirected to a secure Google Form to complete your registration.',
        });
        setRegForm({ name: '', email: '', eventId: '' });
    };

    const variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

    return (
        <section className="section-padding min-h-screen pt-24" style={{ background: '#0d0d0d' }}>
            {/* Breadcrumb Navigation */}
            <div className="max-w-screen-xl mx-auto px-4 py-4">
                <nav className="flex items-center gap-2 text-sm text-gray-400">
                    <RouterLink to="/" className="hover:text-[#FCD12A] transition-colors">Home</RouterLink>
                    <span>/</span>
                    <span className="text-[#FCD12A]">Events</span>
                </nav>
            </div>

            <motion.div
                className="max-w-screen-xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={variants}
            >
                <h1 style={{ color: '#FCD12A', fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '8px' }}>
                    Upcoming Events
                </h1>
                <p style={{ color: '#9ca3af', marginBottom: '36px' }}>Stay up to date with all Youth Spark gatherings and sessions.</p>

                {loading ? (
                    <div style={{ color: '#6b7280', textAlign: 'center', padding: '60px' }}>Loading events...</div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Calendar */}
                        <div className="w-full lg:w-2/3 rounded-xl p-2 sm:p-4 overflow-x-auto -mx-1 sm:mx-0 touch-pan-x" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <FullCalendar
                                plugins={[dayGridPlugin]}
                                initialView="dayGridMonth"
                                events={events}
                                eventClick={handleEventClick}
                                headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,dayGridWeek' }}
                                eventColor="#FCD12A"
                                eventTextColor="#0A0A0A"
                                height="auto"
                            />
                        </div>

                        {/* Sidebar */}
                        <div className="w-full lg:w-1/3 flex flex-col gap-4">
                            {/* Selected event detail */}
                            {selectedEvent ? (
                                <div className="rounded-xl p-6" style={{ background: '#1a1a1a', border: '1px solid #FCD12A50' }}>
                                    <h3 style={{ color: '#FCD12A', fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>{selectedEvent.title}</h3>
                                    <p style={{ color: '#d1d5db', fontSize: '13px', marginBottom: '6px' }}>Date: {selectedEvent.date}</p>
                                    {selectedEvent.location && <p style={{ color: '#d1d5db', fontSize: '13px', marginBottom: '6px' }}>Location: {selectedEvent.location}</p>}
                                    {selectedEvent.description && <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.6, marginTop: '10px' }}>{selectedEvent.description}</p>}
                                    <button type="button" onClick={() => setSelectedEvent(null)} style={{ marginTop: '14px', fontSize: '12px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}>Close</button>
                                </div>
                            ) : (
                                <div className="rounded-xl p-6" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280', fontSize: '14px' }}>
                                    <p style={{ fontSize: '24px', marginBottom: '8px' }} aria-hidden>↑</p>
                                    Click on any event in the calendar to see its details.
                                </div>
                            )}

                            {/* Upcoming list */}
                            <div className="rounded-xl p-5" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', flex: 1 }}>
                                <h3 style={{ color: 'white', fontWeight: 600, marginBottom: '14px', fontSize: '15px' }}>All Events</h3>
                                {events.length === 0 ? (
                                    <p style={{ color: '#4b5563', fontSize: '14px' }}>No upcoming events.</p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {events.map(ev => (
                                            <div key={ev.id} onClick={() => setSelectedEvent({ title: ev.title, date: ev.date, description: ev.extendedProps.description, location: ev.extendedProps.location })}
                                                style={{ padding: '12px', borderRadius: '8px', background: 'rgba(252,209,42,0.05)', border: '1px solid rgba(252,209,42,0.12)', cursor: 'pointer', transition: 'all 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(252,209,42,0.1)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(252,209,42,0.05)'}>
                                                <p style={{ fontWeight: 600, color: 'white', fontSize: '14px', margin: 0 }}>{ev.title}</p>
                                                <p style={{ color: '#FCD12A', fontSize: '12px', margin: '4px 0 0' }}>{ev.date} {ev.extendedProps.location ? ` · ${ev.extendedProps.location}` : ''}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}


                {/* Registration Form */}
                <div className="mt-12 sm:mt-16 px-4 py-6 sm:p-8 rounded-2xl bg-[#1a1a1a] border border-white/5 max-w-2xl mx-auto">
                    <h2 className="text-2xl text-[#FCD12A] mb-6 text-center">Register for an Event</h2>
                    {regStatus.msg && (
                        <div className={`mb-4 p-3 rounded text-sm text-center ${regStatus.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                            {regStatus.msg}
                        </div>
                    )}
                    <form onSubmit={handleRegistration} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                placeholder="Full Name"
                                className="block w-full p-3 bg-[#0d0d0d] border border-white/10 rounded-lg text-white"
                                value={regForm.name}
                                onChange={e => setRegForm({ ...regForm, name: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Email Address"
                                type="email"
                                className="block w-full p-3 bg-[#0d0d0d] border border-white/10 rounded-lg text-white"
                                value={regForm.email}
                                onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                                required
                            />
                        </div>
                        <select
                            className="block w-full p-3 bg-[#0d0d0d] border border-white/10 rounded-lg text-white"
                            value={regForm.eventId}
                            onChange={e => setRegForm({ ...regForm, eventId: e.target.value })}
                            required
                        >
                            <option value="">Select Event</option>
                            {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
                        </select>
                        <button type="submit" className="w-full py-3 bg-[#FCD12A] text-[#0A0A0A] font-bold rounded-lg hover:bg-[#ebc127] transition-colors">
                            Continue to Secure Google Form
                        </button>
                    </form>
                    <p className="text-xs text-[#555] mt-4 text-center">By registering, you agree to receive communications regarding this event.</p>
                </div>
            </motion.div>
        </section >
    );
};

export default Events;


