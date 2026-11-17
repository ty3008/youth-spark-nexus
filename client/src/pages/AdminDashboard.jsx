import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../lib/api';
import { PROGRAMS } from '../data/site';
import { formatDate, newestFirst, normalizeGathering } from '../lib/gatherings';

const EMPTY = {
    title: '',
    program: PROGRAMS[0].slug,
    status: 'held',
    date: '',
    monthOnly: false,
    time: '',
    venue: '',
    summary: '',
    details: '',
    cover: '',
    gallery: '',
    youtubeUrl: '',
    instagramUrl: '',
    videos: '',
    speakers: '',
};

const lines = (text) => text.split('\n').map((s) => s.trim()).filter(Boolean);
// Extra videos are typed one per line as "Label | https://link".
const parseVideos = (text) =>
    lines(text)
        .map((l) => {
            const i = l.lastIndexOf('|');
            return i === -1 ? { label: '', url: '' } : { label: l.slice(0, i).trim(), url: l.slice(i + 1).trim() };
        })
        .filter((v) => v.label && v.url);
const videosToText = (videos = []) => videos.map((v) => `${v.label} | ${v.url}`).join('\n');

const field = 'min-h-[44px] w-full rounded-lg border border-white/20 bg-ink px-3 py-2 text-fg';
const label = 'mb-1 block text-xs uppercase tracking-wide text-muted';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('ys_admin_token');
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };

    const [tab, setTab] = useState('gatherings'); // 'gatherings' | 'messages'
    const [events, setEvents] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(EMPTY);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [alert, setAlert] = useState(null);

    const showAlert = (type, msg) => {
        setAlert({ type, msg });
        setTimeout(() => setAlert(null), 4000);
    };

    const fetchEvents = useCallback(async () => {
        try {
            const res = await axios.get(apiUrl('/admin/events'), authHeader);
            setEvents(res.data);
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.removeItem('ys_admin_token');
                navigate('/admin');
                return;
            }
            showAlert('error', 'Could not load gatherings.');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const fetchContacts = useCallback(async () => {
        try {
            const res = await axios.get(apiUrl('/admin/contacts'), authHeader);
            setContacts(res.data);
        } catch {
            /* the archive is optional */
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchEvents();
            await fetchContacts();
            setLoading(false);
        })();
    }, [fetchEvents, fetchContacts]);

    const set = (key) => (e) => setForm({ ...form, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

    const toggleMonthOnly = (e) => {
        const monthOnly = e.target.checked;
        // Switching to a month keeps the year and month. Switching back clears the date so no day is guessed.
        setForm({ ...form, monthOnly, date: monthOnly ? form.date.slice(0, 7) : '' });
    };

    const payload = () => ({
        title: form.title,
        program: form.program,
        status: form.status,
        date: form.date,
        datePrecision: form.monthOnly ? 'month' : 'day',
        time: form.time,
        venue: form.venue,
        summary: form.summary,
        details: lines(form.details),
        cover: form.cover,
        gallery: lines(form.gallery),
        youtubeUrl: form.youtubeUrl,
        instagramUrl: form.instagramUrl,
        videos: parseVideos(form.videos),
        speakers: lines(form.speakers),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(apiUrl(`/events/${editingId}`), payload(), authHeader);
                showAlert('success', 'Gathering updated.');
            } else {
                await axios.post(apiUrl('/events'), payload(), authHeader);
                showAlert('success', 'Gathering created.');
            }
            setForm(EMPTY);
            setEditingId(null);
            setShowForm(false);
            fetchEvents();
        } catch (err) {
            showAlert('error', err.response?.data?.message || 'Could not save the gathering.');
        }
    };

    const handleEdit = (ev) => {
        const monthOnly = ev.datePrecision === 'month' || String(ev.date).length === 7;
        setForm({
            title: ev.title || '',
            program: ev.program || PROGRAMS[0].slug,
            status: ev.status || 'held',
            date: ev.date || '',
            monthOnly,
            time: ev.time || '',
            venue: ev.venue || '',
            summary: ev.summary || '',
            details: (ev.details || []).join('\n'),
            cover: ev.cover || '',
            gallery: (ev.gallery || []).join('\n'),
            youtubeUrl: ev.youtubeUrl || '',
            instagramUrl: ev.instagramUrl || '',
            videos: videosToText(ev.videos),
            speakers: (ev.speakers || []).join('\n'),
        });
        setEditingId(ev._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this gathering permanently?')) return;
        try {
            await axios.delete(apiUrl(`/events/${id}`), authHeader);
            showAlert('success', 'Gathering deleted.');
            fetchEvents();
        } catch {
            showAlert('error', 'Could not delete the gathering.');
        }
    };

    const cancel = () => {
        setForm(EMPTY);
        setEditingId(null);
        setShowForm(false);
    };

    const logout = () => {
        localStorage.removeItem('ys_admin_token');
        navigate('/admin');
    };

    const rows = events.map((ev) => ({ raw: ev, view: normalizeGathering(ev) }));
    rows.sort((a, b) => (a.view && b.view ? newestFirst(a.view, b.view) : a.view ? -1 : 1));

    return (
        <div className="min-h-screen bg-ink text-fg">
            <nav className="sticky top-0 z-40 flex min-h-[60px] items-center justify-between gap-3 border-b border-white/10 bg-panel px-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="" width="32" height="32" className="h-8 w-8 object-contain" />
                    <span className="font-semibold">Youth Spark Summit <span className="text-gold">Admin</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <a href="/" target="_blank" rel="noreferrer" className="btn-ghost !min-h-[40px] !px-3 !py-1.5">View site</a>
                    <button onClick={logout} className="btn-ghost !min-h-[40px] !px-3 !py-1.5">Log out</button>
                </div>
            </nav>

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
                {alert && (
                    <div className={`mb-4 rounded-lg border p-3 text-sm ${alert.type === 'success' ? 'border-green-500/30 bg-green-500/10 text-green-300' : 'border-red-500/30 bg-red-500/10 text-red-300'}`}>
                        {alert.msg}
                    </div>
                )}

                <div className="mb-6 flex gap-2" role="tablist">
                    {[['gatherings', `Gatherings (${events.length})`], ['messages', `Past messages (${contacts.length})`]].map(([k, text]) => (
                        <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
                            className={`min-h-[44px] rounded-lg px-4 text-sm font-semibold ${tab === k ? 'bg-gold text-ink' : 'border border-white/20 text-muted'}`}>
                            {text}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p className="py-20 text-center text-muted">Loading…</p>
                ) : tab === 'gatherings' ? (
                    <div>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h1 className="text-xl">Gatherings</h1>
                                <p className="text-sm text-muted">These are the gatherings on the public calendar.</p>
                            </div>
                            {!showForm && <button className="btn-gold" onClick={() => setShowForm(true)}>Add gathering</button>}
                        </div>

                        {showForm && (
                            <div className="card mb-6 p-5">
                                <h2 className="mb-4 text-lg">{editingId ? 'Edit gathering' : 'New gathering'}</h2>
                                <FormBody form={form} set={set} toggleMonthOnly={toggleMonthOnly} onSubmit={handleSubmit} onCancel={cancel} editing={!!editingId} />
                            </div>
                        )}

                        {rows.length === 0 ? (
                            <p className="card p-10 text-center text-muted">No gatherings yet.</p>
                        ) : (
                            <ul className="space-y-3">
                                {rows.map(({ raw, view }) => (
                                    <li key={raw._id} className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="min-w-0">
                                            <p className="font-semibold">{raw.title}</p>
                                            <p className="text-sm text-muted">
                                                {view ? `${formatDate(view)} · ${view.venue}` : 'Not shown publicly: choose a program and save to publish.'}
                                            </p>
                                            <p className="mt-1 text-xs text-muted">{raw.program || 'no program'} · {raw.status || 'no status'}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="btn-ghost !min-h-[44px]" onClick={() => handleEdit(raw)}>Edit</button>
                                            <button className="btn-ghost !min-h-[44px] !border-red-500/40 !text-red-300" onClick={() => handleDelete(raw._id)}>Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : (
                    <div>
                        <h1 className="mb-1 text-xl">Past messages</h1>
                        <p className="mb-4 text-sm text-muted">An archive of messages sent before the public site stopped taking them. Read only.</p>
                        {contacts.length === 0 ? (
                            <p className="card p-10 text-center text-muted">No messages.</p>
                        ) : (
                            <ul className="space-y-3">
                                {contacts.map((c) => (
                                    <li key={c._id} className="card p-4">
                                        <div className="flex flex-wrap justify-between gap-2">
                                            <div>
                                                <p className="font-semibold">{c.name}</p>
                                                <a href={`mailto:${c.email}`} className="text-sm text-gold">{c.email}</a>
                                            </div>
                                            <span className="text-xs text-muted">{new Date(c.createdAt).toLocaleString()}</span>
                                        </div>
                                        <p className="mt-2 text-sm text-muted">{c.message}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const FormBody = ({ form, set, toggleMonthOnly, onSubmit, onCancel, editing }) => (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
            <label className={label} htmlFor="g-title">Title *</label>
            <input id="g-title" className={field} required value={form.title} onChange={set('title')} />
        </div>
        <div>
            <label className={label} htmlFor="g-program">Program *</label>
            <select id="g-program" className={field} value={form.program} onChange={set('program')}>
                {PROGRAMS.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
            </select>
        </div>
        <div>
            <label className={label} htmlFor="g-status">Status *</label>
            <select id="g-status" className={field} value={form.status} onChange={set('status')}>
                <option value="held">Held</option>
                <option value="upcoming">Upcoming</option>
            </select>
        </div>
        <div>
            <label className={label} htmlFor="g-date">{form.monthOnly ? 'Month *' : 'Date *'}</label>
            <input id="g-date" className={field} required type={form.monthOnly ? 'month' : 'date'} value={form.date} onChange={set('date')} />
            <label className="mt-2 flex min-h-[44px] items-center gap-2 text-sm text-muted">
                <input type="checkbox" checked={form.monthOnly} onChange={toggleMonthOnly} className="h-5 w-5" />
                Only the month is known
            </label>
        </div>
        <div>
            <label className={label} htmlFor="g-time">Time</label>
            <input id="g-time" className={field} placeholder="e.g. 8:00 AM – 3:00 PM" value={form.time} onChange={set('time')} />
        </div>
        <div className="sm:col-span-2">
            <label className={label} htmlFor="g-venue">Venue</label>
            <input id="g-venue" className={field} value={form.venue} onChange={set('venue')} />
        </div>
        <div className="sm:col-span-2">
            <label className={label} htmlFor="g-summary">Summary</label>
            <textarea id="g-summary" className={field} rows={3} value={form.summary} onChange={set('summary')} />
        </div>
        <div className="sm:col-span-2">
            <label className={label} htmlFor="g-details">More details (one per line)</label>
            <textarea id="g-details" className={field} rows={3} value={form.details} onChange={set('details')} />
        </div>
        <div className="sm:col-span-2">
            <label className={label} htmlFor="g-cover">Cover image (path or URL). Leave blank until photos are ready.</label>
            <input id="g-cover" className={field} placeholder="/gatherings/example/01.webp" value={form.cover} onChange={set('cover')} />
        </div>
        <div className="sm:col-span-2">
            <label className={label} htmlFor="g-gallery">Gallery images (one path or URL per line)</label>
            <textarea id="g-gallery" className={field} rows={3} value={form.gallery} onChange={set('gallery')} />
        </div>
        <div className="sm:col-span-2">
            <label className={label} htmlFor="g-youtube">Primary film: YouTube URL (button “Watch the gathering”)</label>
            <input id="g-youtube" className={field} type="url" placeholder="https://www.youtube.com/watch?v=…" value={form.youtubeUrl} onChange={set('youtubeUrl')} />
        </div>
        <div className="sm:col-span-2">
            <label className={label} htmlFor="g-instagram">Instagram recap URL (button “See the recap”)</label>
            <input id="g-instagram" className={field} type="url" placeholder="https://www.instagram.com/p/…" value={form.instagramUrl} onChange={set('instagramUrl')} />
        </div>
        <div className="sm:col-span-2">
            <label className={label} htmlFor="g-videos">More films (one per line: Label | https://link)</label>
            <textarea id="g-videos" className={field} rows={4} placeholder="Kevin Kimani | https://www.youtube.com/watch?v=…" value={form.videos} onChange={set('videos')} />
        </div>
        <div className="sm:col-span-2">
            <label className={label} htmlFor="g-speakers">Speakers on the official highlights (names only, one per line)</label>
            <textarea id="g-speakers" className={field} rows={3} value={form.speakers} onChange={set('speakers')} />
        </div>
        <div className="flex gap-3 sm:col-span-2">
            <button type="submit" className="btn-gold">{editing ? 'Save changes' : 'Create gathering'}</button>
            <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
        </div>
    </form>
);

export default AdminDashboard;
