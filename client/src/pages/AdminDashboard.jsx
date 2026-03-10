import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../lib/api';
import Papa from 'papaparse';

const EMPTY_EVENT = { title: '', date: '', description: '', location: '' };

const AdminDashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('ys_admin_token');
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };

    const [tab, setTab] = useState('events'); // 'events' | 'contacts'
    const [events, setEvents] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(EMPTY_EVENT);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [alert, setAlert] = useState(null);
    const [search, setSearch] = useState('');

    const showAlert = (type, msg) => {
        setAlert({ type, msg });
        setTimeout(() => setAlert(null), 4000);
    };

    const fetchEvents = useCallback(async () => {
        try {
            const res = await axios.get(apiUrl('/events'));
            setEvents(res.data);
        } catch { showAlert('error', 'Could not load events.'); }
    }, []);

    const fetchContacts = useCallback(async () => {
        try {
            const res = await axios.get(apiUrl('/admin/contacts'), authHeader);
            setContacts(res.data);
        } catch { showAlert('error', 'Could not load contacts.'); }
    }, [token]);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            await fetchEvents();
            await fetchContacts();
            setLoading(false);
        };
        init();
    }, [fetchEvents, fetchContacts]);

    const handleLogout = () => {
        localStorage.removeItem('ys_admin_token');
        navigate('/admin');
    };

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(apiUrl(`/events/${editingId}`), form, authHeader);
                showAlert('success', 'Event updated successfully!');
            } else {
                await axios.post(apiUrl('/events'), form, authHeader);
                showAlert('success', 'Event created successfully!');
            }
            setForm(EMPTY_EVENT);
            setEditingId(null);
            setShowForm(false);
            fetchEvents();
        } catch (err) {
            showAlert('error', err.response?.data?.message || 'Failed to save event.');
        }
    };

    const handleEdit = (event) => {
        setForm({ title: event.title, date: event.date, description: event.description, location: event.location });
        setEditingId(event._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this event permanently?')) return;
        try {
            await axios.delete(apiUrl(`/events/${id}`), authHeader);
            showAlert('success', 'Event deleted.');
            fetchEvents();
        } catch { showAlert('error', 'Could not delete event.'); }
    };

    const handleCancelForm = () => {
        setForm(EMPTY_EVENT);
        setEditingId(null);
        setShowForm(false);
    };

    const handleExport = (data, filename) => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
    };

    const filteredEvents = events.filter(ev =>
        ev.title.toLowerCase().includes(search.toLowerCase()) ||
        ev.description?.toLowerCase().includes(search.toLowerCase())
    );
    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.message.toLowerCase().includes(search.toLowerCase())
    );

    // ---- Styles ----
    const card = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' };
    const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px 14px', color: 'white', width: '100%', outline: 'none' };
    const badgeStyle = (color) => ({ background: `${color}22`, color, border: `1px solid ${color}44`, borderRadius: '6px', padding: '2px 10px', fontSize: '12px', fontWeight: 600 });

    return (
        <div className="min-h-screen" style={{ background: '#0b0b0f', color: '#d1d5db', fontFamily: 'Inter, sans-serif' }}>

            {/* === TOP NAV === */}
            <nav style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/logo.png" alt="Youth Spark Logo" style={{ height: '32px', width: 'auto' }} />
                    <span style={{ fontWeight: 700, fontSize: '16px', color: 'white' }}>Youth Spark <span style={{ color: '#FCD12A' }}>Admin</span></span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <a href="/" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        View Site ↗
                    </a>
                    <button onClick={handleLogout} style={{ fontSize: '13px', color: '#f87171', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', padding: '6px 14px', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>
            </nav>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

                {/* Alert */}
                {alert && (
                    <div style={{ marginBottom: '16px', padding: '12px 16px', borderRadius: '8px', background: alert.type === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', border: `1px solid ${alert.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`, color: alert.type === 'success' ? '#4ade80' : '#f87171', fontSize: '14px' }}>
                        {alert.msg}
                    </div>
                )}

                {/* Tabs & Search Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', padding: '4px', borderRadius: '10px' }}>
                        {['events', 'contacts'].map((t) => (
                            <button key={t} onClick={() => { setTab(t); setSearch(''); }} style={{ padding: '8px 20px', borderRadius: '7px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', textTransform: 'capitalize', transition: 'all 0.2s', background: tab === t ? '#FCD12A' : 'transparent', color: tab === t ? '#0A0A0A' : '#9ca3af' }}>
                                {t === 'events' ? `📅 Events (${events.length})` : `📬 Contacts (${contacts.length})`}
                            </button>
                        ))}
                    </div>

                    <div style={{ flex: 1, maxWidth: '400px' }}>
                        <input
                            type="text"
                            placeholder={`Search ${tab}...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '80px', color: '#6b7280' }}>Loading data…</div>
                ) : (
                    <>
                        {/* ===== EVENTS TAB ===== */}
                        {tab === 'events' && (
                            <div>
                                {/* Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <div>
                                        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'white', margin: 0 }}>Events Management</h1>
                                        <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>All events shown on the public calendar</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        {!showForm && (
                                            <button onClick={() => setShowForm(true)} style={{ background: '#FCD12A', color: '#0A0A0A', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                + Add Event
                                            </button>
                                        )}
                                        <button onClick={() => handleExport(filteredEvents, 'events.csv')} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '10px 20px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
                                            Export CSV
                                        </button>
                                    </div>
                                </div>

                                {/* Event Form */}
                                {showForm && (
                                    <div style={{ ...card, padding: '24px', marginBottom: '24px' }}>
                                        <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '16px' }}>{editingId ? '✏️ Edit Event' : '➕ New Event'}</h3>
                                        <form onSubmit={handleSubmitEvent}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                                <div>
                                                    <label style={{ fontSize: '13px', color: '#9ca3af', display: 'block', marginBottom: '6px' }}>Event Title *</label>
                                                    <input style={inputStyle} required placeholder="e.g. Youth Spark Summit" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '13px', color: '#9ca3af', display: 'block', marginBottom: '6px' }}>Date *</label>
                                                    <input style={inputStyle} type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '13px', color: '#9ca3af', display: 'block', marginBottom: '6px' }}>Location</label>
                                                    <input style={inputStyle} placeholder="e.g. Nairobi CBD" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '13px', color: '#9ca3af', display: 'block', marginBottom: '6px' }}>Description</label>
                                                    <input style={inputStyle} placeholder="Brief description…" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
                                                <button type="submit" style={{ background: '#FCD12A', color: '#0A0A0A', border: 'none', borderRadius: '8px', padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
                                                    {editingId ? 'Save Changes' : 'Create Event'}
                                                </button>
                                                <button type="button" onClick={handleCancelForm} style={{ background: 'transparent', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer' }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {/* Events Table */}
                                {filteredEvents.length === 0 ? (
                                    <div style={{ ...card, padding: '60px', textAlign: 'center', color: '#4b5563' }}>
                                        <p style={{ fontSize: '32px', marginBottom: '8px' }}>📅</p>
                                        <p>{search ? 'No matching events found.' : 'No events yet. Add your first event above.'}</p>
                                    </div>
                                ) : (
                                    <div style={{ ...card, overflow: 'hidden' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                                                    {['Title', 'Date', 'Location', 'Description', 'Actions'].map((h) => (
                                                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredEvents.map((ev) => (
                                                    <tr key={ev._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                        <td style={{ padding: '14px 16px', fontWeight: 600, color: 'white', fontSize: '14px' }}>{ev.title}</td>
                                                        <td style={{ padding: '14px 16px', fontSize: '14px' }}>
                                                            <span style={badgeStyle('#FCD12A')}>{ev.date}</span>
                                                        </td>
                                                        <td style={{ padding: '14px 16px', fontSize: '14px', color: '#9ca3af' }}>{ev.location || '—'}</td>
                                                        <td style={{ padding: '14px 16px', fontSize: '13px', color: '#6b7280', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.description || '—'}</td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                                <button onClick={() => handleEdit(ev)} style={{ background: 'rgba(252,209,42,0.1)', color: '#FCD12A', border: '1px solid rgba(252,209,42,0.2)', borderRadius: '6px', padding: '5px 12px', cursor: 'pointer', fontSize: '13px' }}>Edit</button>
                                                                <button onClick={() => handleDelete(ev._id)} style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', padding: '5px 12px', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ===== CONTACTS TAB ===== */}
                        {tab === 'contacts' && (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <div>
                                        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'white', margin: 0 }}>Contact Submissions</h1>
                                        <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>All messages received from the Join Us form</p>
                                    </div>
                                    <button onClick={() => handleExport(filteredContacts, 'contacts.csv')} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '10px 20px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
                                        Export CSV
                                    </button>
                                </div>

                                {filteredContacts.length === 0 ? (
                                    <div style={{ ...card, padding: '60px', textAlign: 'center', color: '#4b5563' }}>
                                        <p style={{ fontSize: '32px', marginBottom: '8px' }}>📬</p>
                                        <p>{search ? 'No matching contacts found.' : 'No contact submissions yet.'}</p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gap: '14px' }}>
                                        {filteredContacts.map((c) => (
                                            <div key={c._id} style={{ ...card, padding: '20px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                                    <div>
                                                        <p style={{ fontWeight: 700, color: 'white', margin: 0 }}>{c.name}</p>
                                                        <a href={`mailto:${c.email}`} style={{ color: '#FCD12A', fontSize: '13px', textDecoration: 'none' }}>{c.email}</a>
                                                    </div>
                                                    <span style={{ fontSize: '12px', color: '#6b7280' }}>{new Date(c.createdAt).toLocaleString()}</span>
                                                </div>
                                                <p style={{ fontSize: '14px', color: '#d1d5db', margin: 0, lineHeight: 1.6 }}>{c.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
