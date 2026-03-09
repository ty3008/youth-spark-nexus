import { useState } from 'react';
import { motion } from 'framer-motion';
import './JoinUs.css';

const JoinUs = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('LOADING');

        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setStatus('SUCCESS');
                form.reset();
            } else {
                setStatus('ERROR');
            }
        } catch (error) {
            console.error('Submission failed', error);
            setStatus('ERROR');
        }
    };

    const variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

    return (
        <section id="join-us" className="section-padding">
            <motion.div
                className="max-w-screen-xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
            >
                <h2>Join Us in Sparking the Future</h2>
                <div className="grid-2">
                    <div>
                        <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&w=800&q=80" alt="Hands joined in unity under the sun" loading="lazy" style={{ marginBottom: '20px' }} />
                        <p>Partner to shape Africa&apos;s next generation of Kingdom leaders.</p>
                        <br />
                        <div style={{ backgroundColor: 'var(--card-bg)', padding: '20px', borderRadius: '10px' }}>
                            <p style={{ marginBottom: '10px' }}><strong>Email:</strong> <a href="mailto:youthsparksummit@gmail.com" style={{ color: 'var(--accent-col)' }}>youthsparksummit@gmail.com</a></p>
                            <p><strong>Phone:</strong> <a href="tel:+254711425593" style={{ color: 'var(--accent-col)' }}>+254 711 425 593</a></p>
                        </div>

                        <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
                            <h3>Subscribe to Our Newsletter</h3>
                            <form style={{ display: 'flex', gap: '10px', marginTop: '10px' }} onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
                                <input type="email" placeholder="Email Address" required style={{ flexGrow: 1, padding: '10px', border: 'none', borderRadius: '5px', background: 'var(--card-bg)', color: 'white' }} />
                                <button type="submit" className="btn" style={{ padding: '10px 15px' }}>Subscribe</button>
                            </form>
                        </div>
                    </div>

                    <div>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <label htmlFor="nameInput">Name</label>
                            <input type="text" id="nameInput" name="name" placeholder="John Doe" required />

                            <label htmlFor="emailInput">Email</label>
                            <input type="email" id="emailInput" name="email" placeholder="john@example.com" required />

                            <label htmlFor="messageInput">Message</label>
                            <textarea id="messageInput" name="message" rows="6" placeholder="How would you like to partner or engage with us?" required></textarea>

                            {status === 'SUCCESS' && <p style={{ color: 'var(--success-col)', marginTop: '10px' }}>We have received your message.</p>}
                            {status === 'ERROR' && <p style={{ color: 'var(--error-col)', marginTop: '10px' }}>There was an error sending your message.</p>}

                            <button type="submit" className="btn" style={{ marginTop: '10px' }} disabled={status === 'LOADING'}>
                                {status === 'LOADING' ? 'Sending...' : 'Send Inquiry'}
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default JoinUs;
