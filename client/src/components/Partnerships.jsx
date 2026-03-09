import { motion } from 'framer-motion';

const Partnerships = () => {
    const variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

    return (
        <section
            id="partnerships"
            className="section-padding"
            style={{ background: 'linear-gradient(rgba(10,10,10,0.8), rgba(10,10,10,0.9)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&w=1920&q=80") center/cover' }}
        >
            <motion.div
                className="max-w-screen-xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
            >
                <h2>Strategic Partnerships &amp; Opportunities</h2>
                <div className="grid-3" style={{ marginTop: '30px' }}>
                    <div className="card">
                        <h3 style={{ color: 'var(--accent-col)' }}>Partners</h3>
                        <p>Faith groups, universities, corporates, and NGOs aligning with our vision.</p>
                    </div>
                    <div className="card">
                        <h3 style={{ color: 'var(--accent-col)' }}>Why Partner?</h3>
                        <p>Access ambitious youth, develop talent, and build brand presence effectively.</p>
                    </div>
                    <div className="card">
                        <h3 style={{ color: 'var(--accent-col)' }}>We Seek</h3>
                        <p>Strategic allies, mentors, speakers, sponsors, and donors.</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Partnerships;
