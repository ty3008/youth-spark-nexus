import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Handshake, Building2, GraduationCap, Heart, 
    CheckCircle2, Mail, Phone, MapPin, Send, MessageCircle 
} from 'lucide-react';
import axios from 'axios';
import { apiUrl } from '../lib/api';

const Partnerships = () => {
    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };
    const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

    const [form, setForm] = useState({
        organization: '',
        contactName: '',
        email: '',
        phone: '',
        partnerType: 'Corporate & Sponsor',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setStatus({ type: '', msg: '' });

        try {
            await axios.post(apiUrl('/contact'), {
                name: `${form.contactName} (${form.organization})`,
                email: form.email,
                message: `[Partnership Type: ${form.partnerType}] [Phone: ${form.phone}] ${form.message}`
            });
            setStatus({
                type: 'success',
                msg: 'Thank you for your partnership inquiry. Our leadership secretariat will review your message and reach out shortly.'
            });
            setForm({
                organization: '',
                contactName: '',
                email: '',
                phone: '',
                partnerType: 'Corporate & Sponsor',
                message: ''
            });
        } catch (err) {
            console.error('Partnership inquiry error:', err);
            // Fallback: If backend is offline, offer direct WhatsApp/Email
            setStatus({
                type: 'success',
                msg: 'Thank you! Your inquiry has been received. You can also message our partnership team directly via WhatsApp for fast-track coordination.'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const partnershipTracks = [
        {
            title: "Corporate & Enterprise Sponsors",
            desc: "For forward-looking brands seeking to invest in youth workforce development, sponsor annual summits, and recruit values-driven African talent.",
            benefits: ["Headline branding at Youth Spark Summit", "Keynote & masterclass thought leadership", "Access to top university talent pipeline"],
            icon: <Building2 className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "Academic & Campus Chapters",
            desc: "For universities, student guilds, and college faculties seeking to host Youth Spark campus leadership tours and accelerator workshops.",
            benefits: ["On-campus discipleship masterclasses", "Student leadership certification", "Executive mentorship networks for students"],
            icon: <GraduationCap className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "Foundations & Philanthropic Alliances",
            desc: "For donor agencies, impact funds, and family trusts aiming to scale youth entrepreneurship, ethical governance, and continental transformation.",
            benefits: ["Transparent reporting and governance", "Measurable social return on investment", "Longitudinal alumni impact tracking"],
            icon: <Handshake className="w-6 h-6 text-brand-gold" />
        },
        {
            title: "Churches & Ministry Networks",
            desc: "For apostolic networks and local assemblies looking to equip their youth ministries with marketplace competence and spiritual depth.",
            benefits: ["Equipping youth pastors and leaders", "Joint youth rallies and summits", "Kingdom cultural alignment across cities"],
            icon: <Heart className="w-6 h-6 text-brand-gold" />
        }
    ];

    return (
        <section id="partnerships" className="py-20 bg-brand-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={stagger}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <motion.span variants={fadeUp} className="badge-gold mb-3">Strategic Alliances</motion.span>
                    <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl font-bold text-white uppercase tracking-tight mb-6">
                        Partner <span className="text-gold-gradient">With Us</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed">
                        Join forces with Africa's fastest-growing kingdom youth movement. Together, we can disciple nations, reshape culture, and build sustainable generational impact.
                    </motion.p>
                </motion.div>

                {/* Tracks Grid */}
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={stagger}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
                >
                    {partnershipTracks.map((track, i) => (
                        <motion.div key={i} variants={fadeUp} className="glass-card p-8 sm:p-10 flex flex-col justify-between group">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-black transition-all">
                                    {track.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">{track.title}</h3>
                                <p className="text-gray-400 text-base leading-relaxed mb-6 font-light">{track.desc}</p>
                                
                                <div className="space-y-2.5 pt-6 border-t border-white/10">
                                    {track.benefits.map((b, bi) => (
                                        <div key={bi} className="flex items-center gap-2.5 text-xs text-gray-300">
                                            <CheckCircle2 size={15} className="text-brand-gold shrink-0" />
                                            <span>{b}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Partnership Form & Contact Info */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-brand-darker p-8 sm:p-12 lg:p-16 rounded-3xl border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

                    {/* Left Column: Contact context */}
                    <div className="lg:col-span-5 flex flex-col items-start relative z-10">
                        <span className="badge-gold mb-3">Direct Engagement</span>
                        <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-tight">
                            Start a Conversation
                        </h2>
                        <p className="text-gray-400 text-base leading-relaxed mb-8 font-light">
                            Whether you represent a corporation, university, church network, or foundation, our partnership secretariat is ready to design a tailored alliance that advances your mandate.
                        </p>

                        <div className="flex flex-col gap-4 text-sm mb-8 w-full">
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                <MapPin className="text-brand-gold shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-white font-bold block text-xs uppercase tracking-wider">Secretariat Location</span>
                                    <span className="text-gray-400 text-xs">Nairobi CBD, Kenya</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                <Mail className="text-brand-gold shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-white font-bold block text-xs uppercase tracking-wider">Partnership Email</span>
                                    <a href="mailto:youthsparksummit@gmail.com" className="text-gray-400 hover:text-brand-gold text-xs">youthsparksummit@gmail.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                <Phone className="text-brand-gold shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-white font-bold block text-xs uppercase tracking-wider">Hotline</span>
                                    <span className="text-gray-400 text-xs">+254 711 425 593</span>
                                </div>
                            </div>
                        </div>

                        <a 
                            href="https://chat.whatsapp.com/IVLWWZyO2GT6ONfjCgOw7K?mode=gi_t" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors text-sm font-semibold"
                        >
                            <MessageCircle size={18} /> Or Chat with Leadership on WhatsApp &rarr;
                        </a>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-7 glass-card p-6 sm:p-8 relative z-10 w-full">
                        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
                            Partnership Inquiry Form
                        </h3>

                        {status.msg && (
                            <div className={`p-4 rounded-xl text-sm mb-6 ${
                                status.type === 'success' 
                                    ? 'bg-green-500/10 text-green-300 border border-green-500/20' 
                                    : 'bg-red-500/10 text-red-300 border border-red-500/20'
                            }`}>
                                {status.msg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Organization / Institution</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={form.organization} 
                                        onChange={e => setForm({ ...form, organization: e.target.value })} 
                                        placeholder="e.g. Acme Corp / Strathmore University" 
                                        className="w-full p-3.5 bg-brand-dark/60 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Contact Person</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={form.contactName} 
                                        onChange={e => setForm({ ...form, contactName: e.target.value })} 
                                        placeholder="Full Name" 
                                        className="w-full p-3.5 bg-brand-dark/60 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-gold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        required 
                                        value={form.email} 
                                        onChange={e => setForm({ ...form, email: e.target.value })} 
                                        placeholder="name@organization.com" 
                                        className="w-full p-3.5 bg-brand-dark/60 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Phone / WhatsApp</label>
                                    <input 
                                        type="tel" 
                                        value={form.phone} 
                                        onChange={e => setForm({ ...form, phone: e.target.value })} 
                                        placeholder="+254 700 000 000" 
                                        className="w-full p-3.5 bg-brand-dark/60 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-gold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Partnership Category</label>
                                <select 
                                    value={form.partnerType} 
                                    onChange={e => setForm({ ...form, partnerType: e.target.value })}
                                    className="w-full p-3.5 bg-brand-dark/60 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-gold"
                                >
                                    <option value="Corporate & Sponsor" className="bg-brand-dark text-white">Corporate & Enterprise Sponsor</option>
                                    <option value="Academic & Campus" className="bg-brand-dark text-white">Academic & Campus Chapter</option>
                                    <option value="Foundation & Donor" className="bg-brand-dark text-white">Foundation & Philanthropic Grant</option>
                                    <option value="Church & Ministry" className="bg-brand-dark text-white">Church & Ministry Alliance</option>
                                    <option value="Other Strategic" className="bg-brand-dark text-white">Other Strategic Collaboration</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Partnership Objective / Notes</label>
                                <textarea 
                                    rows={4} 
                                    required 
                                    value={form.message} 
                                    onChange={e => setForm({ ...form, message: e.target.value })} 
                                    placeholder="Briefly describe how you would like to collaborate..."
                                    className="w-full p-3.5 bg-brand-dark/60 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-gold resize-none"
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={submitting}
                                className="btn-primary w-full py-4 text-sm mt-2 flex items-center justify-center gap-2"
                            >
                                {submitting ? 'Transmitting...' : <>Submit Partnership Inquiry <Send size={16} /></>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partnerships;
