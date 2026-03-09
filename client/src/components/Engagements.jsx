import { motion } from 'framer-motion';

const Engagements = () => {
    const variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

    return (
        <section id="engagements" className="section-padding">
            <motion.div
                className="max-w-screen-xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
            >
                <h2>Flagship & Ongoing Engagements</h2>
                <div className="grid-4">
                    <div className="card">
                        <img src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&w=400&q=80" alt="Summit crowd" style={{ marginBottom: '15px' }} loading="lazy" />
                        <h3 style={{ color: 'var(--accent-col)' }}>Youth Spark Summit</h3>
                        <ul className="custom-bullet-list">
                            <li>Flagship Annual Event</li>
                            <li>1500+ Attendees</li>
                            <li>Focus: Kingdom Leadership</li>
                        </ul>
                    </div>
                    <div className="card">
                        <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&w=400&q=80" alt="Nexus discussion" style={{ marginBottom: '15px' }} loading="lazy" />
                        <h3 style={{ color: 'var(--accent-col)' }}>Youth Spark Nexus</h3>
                        <ul className="custom-bullet-list">
                            <li>Monthly Sessions</li>
                            <li>Nairobi CBD base, 100+ youth</li>
                            <li>Word & Worship</li>
                        </ul>
                    </div>
                    <div className="card">
                        <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&w=400&q=80" alt="Campus learning" style={{ marginBottom: '15px' }} loading="lazy" />
                        <h3 style={{ color: 'var(--accent-col)' }}>Campus Tours</h3>
                        <ul className="custom-bullet-list">
                            <li>University Engagement</li>
                            <li>Leadership & Faith Focus</li>
                        </ul>
                    </div>
                    <div className="card">
                        <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&w=400&q=80" alt="Business Forum" style={{ marginBottom: '15px' }} loading="lazy" />
                        <h3 style={{ color: 'var(--accent-col)' }}>NXT Africa Forum</h3>
                        <ul className="custom-bullet-list">
                            <li>Intimate gatherings</li>
                            <li>Keynotes & Masterclasses</li>
                            <li>Systems-level solutions</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Engagements;
